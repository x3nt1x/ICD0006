<template>
    <Client :client="client" :orders="orders" :contacts="contacts" :assignments="assignments" @fetch-data="fetchClientData" />
</template>

<script setup lang="ts">
import { ref } from "vue"
import { ClientService } from "@/services/ClientService"
import { useIdentityStore } from "@/stores/identity"
import { type IClient } from "@/domain/IClient"
import { type IOrder } from "@/domain/IOrder"
import { type IContact } from "@/domain/IContact"
import { type IAssignment } from "@/domain/IAssignment"
import Client from "@/components/client/Client.vue"

const props = defineProps(['id']);

const client = ref<IClient>({} as IClient);
const orders = ref<IOrder[]>([]);
const contacts = ref<IContact[]>([]);
const assignments = ref<IAssignment[]>([]);

const clientService = new ClientService();

const fetchClientData = () =>
{
    const jwtResponse = useIdentityStore().JWTResponse;
    if (!jwtResponse)
        return;

    clientService.find(jwtResponse, props.id).then(response =>
    {
        if (response)
            client.value = response;
    });

    clientService.getClientOrders(jwtResponse, props.id).then(response =>
    {
        if (response)
            orders.value = response;
    });

    clientService.getClientContacts(jwtResponse, props.id).then(response =>
    {
        if (response)
            contacts.value = response;
    });

    clientService.getClientAssignments(jwtResponse, props.id).then(response =>
    {
        if (response)
            assignments.value = response;
    });
}

fetchClientData();
</script>