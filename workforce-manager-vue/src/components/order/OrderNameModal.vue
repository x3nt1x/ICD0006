<template>
    <div class="modal fade" id="orderNameModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Order</h1>

                    <button @click="() => name = order.name" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <form method="post">
                        <div class="form-group">
                            <input v-model="name" class="form-control" id="name" type="text"
                                placeholder="Order here..." maxlength=32 required />
                        </div>
                    </form>
                </div>

                <div class="modal-footer">
                    <button @click="() => name = order.name" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button @click="onSubmit()" type="button" class="btn btn-dark" data-bs-dismiss="modal">Edit</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useIdentityStore } from '@/stores/identity'
import { OrderService } from '@/services/OrderService';
import { type IOrder } from '@/domain/IOrder'

const props = defineProps<{ order: IOrder; }>();

const name = ref("");

const identityStore = useIdentityStore();
const orderService = new OrderService();

watch(() => props.order, (newOrder) =>
{
    if (newOrder)
        name.value = newOrder.name;
});

const onSubmit = async (): Promise<void> =>
{
    const jwtResponse = identityStore.JWTResponse;
    if (!jwtResponse)
        return;

    props.order.name = name.value;

    await orderService.put(jwtResponse, props.order);
}
</script>