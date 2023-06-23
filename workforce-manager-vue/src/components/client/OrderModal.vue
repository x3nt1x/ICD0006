<template>
    <div class="modal fade" id="orderModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">New order</h1>

                    <button @click="() => order.name = ''" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <form method="post">
                        <div class="form-group">
                            <input v-model="order.name" class="form-control" id="name" type="text" placeholder="Order name here..." maxlength=32 required />
                        </div>
                    </form>
                </div>

                <div class="modal-footer">
                    <button @click="() => order.name = ''" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button @click="onSubmit(false)" type="button" class="btn btn-success" data-bs-dismiss="modal">Add</button>
                    <button @click="onSubmit()" type="button" class="btn btn-dark" data-bs-dismiss="modal">Add order & new assignment</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { useIdentityStore } from '@/stores/identity'
import { OrderService } from '@/services/OrderService'
import { type IOrder } from '@/domain/IOrder'

const props = defineProps<{
    clientId: string;
    emit(event: string): void;
}>();

const order = ref<IOrder>({} as IOrder);

const router = useRouter();
const orderService = new OrderService();

const onSubmit = async (redirect: boolean = true): Promise<void> =>
{
    const jwtResponse = useIdentityStore().JWTResponse;

    if (jwtResponse)
    {
        order.value.clientId = props.clientId;

        const response = await orderService.post(jwtResponse, order.value);
        
        if (response)
        {
            if(redirect)
                router.push({ path: '/assignments/create' })
            else
                props.emit('fetch-data');
        }
    }

    order.value = {} as IOrder;
}
</script>