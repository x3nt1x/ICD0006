<template>
    <AssignmentCreate :orders="orders" />
</template>
    
<script setup lang="ts">
import { ref } from "vue"
import { OrderService } from "@/services/OrderService"
import { useIdentityStore } from "@/stores/identity"
import { type IOrder } from "@/domain/IOrder"
import AssignmentCreate from "@/components/assignment/AssignmentCreate.vue"

const orders = ref<IOrder[]>([]);

const orderService = new OrderService();

const jwtResponse = useIdentityStore().JWTResponse;

if (jwtResponse)
{
    orderService.getAll(jwtResponse).then(response =>
    {
        if (response)
            orders.value = response;
    });
}
</script>