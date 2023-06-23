<template>
    <Order :order="order" :assignments="assignments" @fetch-data="fetchOrderData" />
</template>

<script setup lang="ts">
import { ref } from "vue"
import { OrderService } from "@/services/OrderService"
import { useIdentityStore } from "@/stores/identity"
import { type IOrder } from "@/domain/IOrder"
import { type IAssignment } from "@/domain/IAssignment"
import Order from "@/components/order/Order.vue"

const props = defineProps(['id']);

const order = ref<IOrder>({} as IOrder);
const assignments = ref<IAssignment[]>([]);

const orderService = new OrderService();

const fetchOrderData = () =>
{
    const jwtResponse = useIdentityStore().JWTResponse;
    if (!jwtResponse)
        return;

    orderService.find(jwtResponse, props.id).then(response =>
    {
        if (response)
            order.value = response;
    });

    orderService.getOrderAssignments(jwtResponse, props.id).then(response =>
    {
        if (response)
            assignments.value = response;
    });
}

fetchOrderData();
</script>