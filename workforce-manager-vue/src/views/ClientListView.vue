<template>
    <ClientList :clients="clients" />
</template>
    
<script setup lang="ts">
import { ref } from "vue"
import { ClientService } from "@/services/ClientService"
import { useIdentityStore } from "@/stores/identity"
import { type IClient } from "@/domain/IClient"
import ClientList from "@/components/client/ClientList.vue"

const clients = ref<IClient[]>([]);

const clientService = new ClientService();

const jwtResponse = useIdentityStore().JWTResponse;

if (jwtResponse)
{
    clientService.getAll(jwtResponse).then(response =>
    {
        if (response)
            clients.value = response;
    });
}
</script>