<template>
    <div class="input-inline">
        <div class="input-group w-auto float-start">
            <RouterLink to="/orders/create" class="btn btn-dark">New order</RouterLink>
        </div>

        <div class="input-group w-auto float-end mb-3">
            <div class="form-outline">
                <input v-model="search" type="search" id="search" class="form-control" placeholder="search" />
            </div>

            <button type="button" class="btn btn-primary">
                <i class="fa fa-search"></i>
            </button>
        </div>

        <div class="input-group w-25 float-none m-auto">
            <Multiselect v-model="selected" :options="options" placeholder="Filter" :searchable="true" />
        </div>
    </div>

    <table class="table text-center">
        <thead>
            <tr>
                <th>Order</th>
                <th>Client</th>
                <th>Status</th>
                <th>Order date</th>
                <th>Completed date</th>
                <th>Manage</th>
            </tr>
        </thead>

        <tbody>
            <template v-for="order in filteredOrders">
                <tr class="align-middle">
                    <td>
                        <RouterLink :to="`/orders/${order.id}`">{{ order.name }}</RouterLink>
                    </td>
                    <td>
                        <RouterLink :to="`/clients/${order.clientId}`">{{ order.clientName }}</RouterLink>
                    </td>

                    <td class="round" :class="order.end ? 'statusDone' : 'statusInProgress'">
                        {{ order.end ? 'Done' : 'In work' }}
                    </td>

                    <td>{{ new Date(order.start).toLocaleDateString("ru-RU") }}</td>

                    <td>
                        {{ order.end ? new Date(order.end).toLocaleDateString("ru-RU") : '-' }}
                    </td>

                    <td>
                        <button @click="onDone(order)" type="button" class="btn btn-success btn-circle" :disabled="order.end != undefined">
                            <i class="fa fa-check"></i>
                        </button>

                        <button @click="onDelete(order.id)" type="button" class="btn btn-danger btn-circle ms-2">
                            <i class="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useIdentityStore } from '@/stores/identity'
import { OrderService } from '@/services/OrderService'
import { type IOrder } from '@/domain/IOrder'
import Multiselect from '@vueform/multiselect'

const props = defineProps<{
    orders: IOrder[];
}>();

const search = ref<string>("");
const selected = ref<number>(2);

const options = ref([
    {
        value: 1,
        label: "Done"
    },
    {
        value: 2,
        label: "In Work"
    }
]);

const emit = defineEmits(['fetch-data']);

const identityStore = useIdentityStore();
const orderService = new OrderService();

let filteredOrders = computed<IOrder[]>(() =>
{
    return props.orders.filter(order =>
        (order.name.includes(search.value.toLowerCase()) ||
         order.clientName?.toLowerCase().includes(search.value.toLowerCase())) &&
        (selected.value === 1 ? order.end != undefined : true) &&
        (selected.value === 2 ? order.end == undefined : true));
});

const onDone = async (order: IOrder): Promise<void> =>
{
    const jwtResponse = identityStore.JWTResponse;
    if (!jwtResponse)
        return;

    order.end = new Date().toLocaleDateString('en-CA');

    const response = await orderService.put(jwtResponse, order);

    if (response)
        emit('fetch-data');
}

const onDelete = async (orderId: string): Promise<void> =>
{
    const jwtResponse = identityStore.JWTResponse;
    if (!jwtResponse)
        return;

    const response = await orderService.delete(jwtResponse, orderId);

    if (response)
        emit('fetch-data');
}
</script>