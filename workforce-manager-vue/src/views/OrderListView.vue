<template>
    <OrderList :orders="orders" @fetch-data="fetchOrderData" />
</template>
    
<script setup lang="ts">
import { ref } from "vue"
import { OrderService } from "@/services/OrderService"
import { useIdentityStore } from "@/stores/identity"
import { type IOrder } from "@/domain/IOrder"
import OrderList from "@/components/order/OrderList.vue"

const orders = ref<IOrder[]>([]);

const orderService = new OrderService();

const fetchOrderData = () =>
{
    const jwtResponse = useIdentityStore().JWTResponse;
    if (!jwtResponse)
        return;

    orderService.getAll(jwtResponse).then(response =>
    {
        if (response)
            orders.value = response;
    });
}

fetchOrderData();
</script>