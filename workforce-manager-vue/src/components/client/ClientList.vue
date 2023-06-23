<template>
    <div class="input-inline">
        <div class="input-group w-auto float-start">
            <RouterLink to="/clients/create" class="btn btn-dark">New client</RouterLink>
        </div>

        <div class="input-group w-auto float-end mb-3">
            <div class="form-outline">
                <input v-model="search" type="search" id="search" class="form-control" placeholder="search" />
            </div>

            <button type="button" class="btn btn-primary">
                <i class="fa fa-search"></i>
            </button>
        </div>
    </div>

    <table class="table text-center">
        <thead>
            <tr>
                <th>Name</th>
                <th>Total orders</th>
                <th>Total tasks</th>
                <th>Manage</th>
            </tr>
        </thead>

        <tbody>
            <template v-for="client in filteredClients">
                <tr class="align-middle">
                    <td>
                        <RouterLink :to="`/clients/${client.id}`">{{ client.name }}</RouterLink>
                    </td>

                    <td>{{ client.totalOrders }}</td>
                    <td>{{ client.totalTasks }}</td>

                    <td>
                        <RouterLink :to="`/clients/${client.id}`" class="btn btn-dark">Manage</RouterLink>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { type IClient } from '@/domain/IClient';

const props = defineProps<{
    clients: IClient[];
}>();

const search = ref<string>("");

let filteredClients = computed<IClient[]>(() =>
{
    return props.clients.filter(e => e.name.toLowerCase().includes(search.value.toLowerCase()));
});
</script>