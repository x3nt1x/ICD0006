<template>
    <div class="modal fade" id="clientNameModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Client name</h1>

                    <button @click="() => name = client.name" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <form method="post">
                        <div class="form-group">
                            <input v-model="name" class="form-control" id="name" type="text" placeholder="Client name here..." maxlength=32 required />
                        </div>
                    </form>
                </div>

                <div class="modal-footer">
                    <button @click="() => name = client.name" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button @click="onSubmit()" type="button" class="btn btn-dark" data-bs-dismiss="modal">Edit</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useIdentityStore } from '@/stores/identity'
import { ClientService } from '@/services/ClientService';
import { type IClient } from '@/domain/IClient'

const props = defineProps<{ client: IClient; }>();

const name = ref("");

const identityStore = useIdentityStore();
const clientService = new ClientService();

watch(() => props.client, (newClient) =>
{
    if (newClient)
        name.value = newClient.name;
});

const onSubmit = async (): Promise<void> =>
{
    const jwtResponse = identityStore.JWTResponse;
    if (!jwtResponse)
        return;

    props.client.name = name.value;

    await clientService.put(jwtResponse, props.client);
}
</script>