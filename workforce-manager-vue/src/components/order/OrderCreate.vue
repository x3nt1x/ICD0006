<template>
    <div class="w-50 m-auto">
        <h1>Create</h1>

        <h4>Order</h4>
        <hr />

        <form method="post">
            <div class="form-group">
                <label htmlFor="name">Name</label>
                <input v-model="order.name" class="form-control" id="name" type="text" aria-required="true" maxlength=32 required />
            </div>

            <div class="form-group">
                <label htmlFor="client">Client</label>

                <select v-model="order.clientId" class="form-select" id="client">
                    <template v-for="client in clients">
                        <option :value="client.id">{{ client.name }}</option>
                    </template>
                </select>
            </div>

            <div class="input-inline mt-2">
                <button @click="onSubmit()" type="button" class="btn btn-dark">
                    Create
                </button>

                <RouterLink to="/orders" class="float-end">Back to List</RouterLink>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useIdentityStore } from '@/stores/identity'
import { OrderService } from '@/services/OrderService'
import { type IOrder } from '@/domain/IOrder';
import { type IClient } from '@/domain/IClient';

const order = {} as IOrder;

defineProps<{
    clients: IClient[];
}>();

const router = useRouter()
const identityStore = useIdentityStore();
const orderService = new OrderService();

const onSubmit = async (): Promise<void> =>
{
    const jwtResponse = identityStore.JWTResponse;
    if (!jwtResponse)
        return;

    const response = await orderService.post(jwtResponse, order);

    if (response)
        router.push({ path: '/orders' });
}
</script>