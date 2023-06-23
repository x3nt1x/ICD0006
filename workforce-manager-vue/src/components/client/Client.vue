<template>
    <ClientNameModal :client="client" />
    <OrderModal :clientId="client.id" :emit="emit" />
    <ContactModal :clientId="client.id" :currentContact="currentContact" :emit="emit" />

    <div class="row row-cols-2">
        <div class="col border-end mb-3 text-center">
            <div class="mb-3">
                <h3 class="d-inline">Client</h3>

                <button type="button" class="btn btn-dark float-end position-relative" data-bs-toggle="modal" data-bs-target="#clientNameModal">
                    Edit
                </button>
            </div>

            <div>
                <h1 class="display-5">{{ client.name }}</h1>
            </div>
        </div>

        <div class="col border-start mb-3">
            <div class="text-center mb-3">
                <h3 class="d-inline">Contacts</h3>

                <button @click="() => currentContact = undefined" type="button" class="btn btn-dark float-end position-relative" data-bs-toggle="modal" data-bs-target="#contactModal">
                    Add
                </button>
            </div>

            <table>
                <tbody v-for="contact in contacts">
                    <tr>
                        <td class="pe-1" type="button" data-bs-toggle="modal" data-bs-target="#contactModal">
                            <i @click="() => currentContact = contact" class="fa fa-pencil-square-o"></i>
                        </td>

                        <template v-if="contact.info">
                            <th class="pe-5">{{ EContactType[contact.type] }} ({{ contact.info }})</th>
                        </template>

                        <template v-else>
                            <th class="pe-5">{{ EContactType[contact.type] }}</th>
                        </template>

                        <td>{{ contact.content }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <hr />
        <hr />

        <div class="col border-end mb-3">
            <div class="text-center mb-3">
                <h3 class="d-inline">Orders ({{ client.totalOrders }})</h3>

                <button class="btn btn-dark float-end position-relative" data-bs-toggle="modal" data-bs-target="#orderModal">
                    Add
                </button>
            </div>

            <div class="table-container">
                <table class="table text-center">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Manage</th>
                        </tr>
                    </thead>

                    <tbody>
                        <template v-for="order in orders">
                            <tr class="align-middle">
                                <td>
                                    <RouterLink :to="`/orders/${order.id}`">{{ order.name }}</RouterLink>
                                </td>

                                <td>{{ new Date(order.start).toLocaleDateString("ru-RU") }}</td>

                                <td class="round" :class="order.end ? 'statusDone' : 'statusInProgress'">
                                    {{ order.end ? 'Done' : 'In work' }}
                                </td>

                                <td>
                                    <button @click="onDoneOrder(order)" type="button" class="btn btn-success btn-circle" :disabled="order.end != undefined">
                                        <i class="fa fa-check"></i>
                                    </button>

                                    <button @click="onDeleteOrder(order.id)" type="button" class="btn btn-danger btn-circle ms-2">
                                        <i class="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="col border-start mb-3 text-center">
            <div class="mb-3">
                <h3 class="d-inline">Assignments ({{ client.totalTasks }})</h3>

                <RouterLink :to="`/assignments/create`" class="btn btn-dark float-end position-relative">
                    Add
                </RouterLink>
            </div>

            <div class="table-container">
                <table class="table text-center">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Due date</th>
                        </tr>
                    </thead>

                    <tbody>
                        <template v-for="assignment in assignments">
                            <tr class="align-middle padding">
                                <td>
                                    <RouterLink :to="`/assignments/${assignment.id}`">{{ assignment.title }}</RouterLink>
                                </td>

                                <td class="round" :class="priorityColor(assignment.priority)">
                                    {{ ETaskPriority[assignment.priority] }}
                                </td>

                                <td class="round" :class="statusColor(assignment.status)">
                                    {{ ETaskStatus[assignment.status] }}
                                </td>

                                <td>{{ new Date(assignment.dueDate).toLocaleDateString("ru-RU") }}</td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>

        <hr />
        <hr />
    </div>

    <div class="input-inline">
        <div class="input-group w-auto float-start">
            <button @click="onDelete()" type="button" class="btn btn-danger">
                Delete
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useIdentityStore } from '@/stores/identity'
import { OrderService } from '@/services/OrderService'
import { ClientService } from '@/services/ClientService'
import { priorityColor, statusColor } from '@/utilities/Utils'
import { type IClient } from '@/domain/IClient';
import { type IOrder } from '@/domain/IOrder';
import { type IContact, EContactType } from '@/domain/IContact';
import { type IAssignment, ETaskPriority, ETaskStatus } from '@/domain/IAssignment';
import OrderModal from '@/components/client/OrderModal.vue'
import ContactModal from '@/components/client/ContactModal.vue'
import ClientNameModal from '@/components/client/ClientNameModal.vue'

const props = defineProps<{
    client: IClient;
    orders: IOrder[];
    contacts: IContact[];
    assignments: IAssignment[];
}>();

const currentContact = ref<IContact | undefined>();

const emit = defineEmits(['fetch-data']);

const router = useRouter();
const identityStore = useIdentityStore();
const orderService = new OrderService();
const clientService = new ClientService();

const onDoneOrder = async (order: IOrder): Promise<void> =>
{
    const jwtResponse = identityStore.JWTResponse;
    if (!jwtResponse)
        return;

    const response = await orderService.put(jwtResponse, order);

    if (response)
        emit('fetch-data');
}

const onDeleteOrder = async (orderId: string): Promise<void> =>
{
    const jwtResponse = identityStore.JWTResponse;
    if (!jwtResponse)
        return;

    const response = await orderService.delete(jwtResponse, orderId);

    if (response)
        emit('fetch-data');
}

const onDelete = async (): Promise<void> =>
{
    const jwtResponse = identityStore.JWTResponse;
    if (!jwtResponse)
        return;

    const response = await clientService.delete(jwtResponse, props.client.id);

    if (response)
        router.push({ path: '/clients' })
}
</script>

<style scoped>
.padding>td {
    padding-bottom: 0.45rem !important;
    padding-top: 0.45rem !important;
}
</style>