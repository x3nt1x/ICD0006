<template>
    <OrderNameModal :order="order" />

    <div class="row row-cols-2">
        <div class="col border-end mb-3 text-center">
            <div class="mb-3">
                <h3 class="d-inline">Order</h3>

                <button type="button" class="btn btn-dark float-end position-relative" data-bs-toggle="modal" data-bs-target="#orderNameModal">
                    Edit
                </button>
            </div>

            <div>
                <h1 class="display-5">{{ order.name }}</h1>
            </div>
        </div>

        <div class="col border-start mb-3">
            <div class="text-center mb-3">
                <h3 class="d-inline">Details</h3>
            </div>

            <table>
                <tbody>
                    <tr>
                        <th class="pe-5">UID</th>
                        <td>{{ order.id }}</td>
                    </tr>

                    <tr>
                        <th class="pe-5">Status</th>
                        <td class="round inline pe-3 ps-3" :class="order.end ? 'statusDone' : 'statusInProgress'">
                            {{ order.end ? 'Done' : 'In work' }}
                        </td>
                    </tr>

                    <tr>
                        <th class="pe-5">Order date</th>
                        <td>{{ new Date(order.start).toLocaleDateString("ru-RU") }}</td>
                    </tr>

                    <tr>
                        <th class="pe-5">Completed date</th>
                        <td>
                            {{ order.end ? new Date(order.end).toLocaleDateString("ru-RU") : '-' }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <hr />
        <hr />
    </div>

    <div>
        <div class="text-center mb-3">
            <h3 class="d-inline">Assignments</h3>

            <RouterLink :to="`/assignments/create`" class="btn btn-dark float-end position-relative">
                Add
            </RouterLink>
        </div>

        <div class="table-container">
            <table class="table text-center mb-0">
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

    <div class="input-inline">
        <button @click="onDelete()" type="button" class="btn btn-danger float-start">
            Delete
        </button>

        <button @click="onDone()" type="button" class="btn btn-success float-end" :disabled="order.end !== null">
            Done
        </button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useIdentityStore } from '@/stores/identity'
import { OrderService } from '@/services/OrderService'
import { priorityColor, statusColor } from '@/utilities/Utils'
import { type IOrder } from '@/domain/IOrder'
import { type IAssignment, ETaskPriority, ETaskStatus } from '@/domain/IAssignment'
import OrderNameModal from '@/components/order/OrderNameModal.vue'

const props = defineProps<{
    order: IOrder;
    assignments: IAssignment[];
}>();

const emit = defineEmits(['fetch-data']);

const router = useRouter();
const identityStore = useIdentityStore();
const orderService = new OrderService();

const onDone = async (): Promise<void> =>
{
    const jwtResponse = identityStore.JWTResponse;
    if (!jwtResponse)
        return;

    props.order.end = new Date().toLocaleDateString('en-CA');

    const response = await orderService.put(jwtResponse, props.order);

    if (response)
        emit('fetch-data');
}

const onDelete = async (): Promise<void> =>
{
    const jwtResponse = identityStore.JWTResponse;
    if (!jwtResponse)
        return;

    const response = await orderService.delete(jwtResponse, props.order.id);

    if (response)
        router.push({ path: '/orders' })
}
</script>

<style scoped>
.inline {
    display: inline-block;
}

.padding>td {
    padding-bottom: 0.45rem !important;
    padding-top: 0.45rem !important;
}
</style>