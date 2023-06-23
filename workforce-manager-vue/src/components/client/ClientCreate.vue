<template>
    <div class="w-50 m-auto">
        <h1>Create</h1>

        <h4>Client</h4>
        <hr />

        <form method="post">
            <div class="form-group">
                <label htmlFor="name">Name</label>
                <input v-model="client.name" class="form-control" id="name" type="text" aria-required="true" maxlength=32 required />
            </div>

            <div class="form-group">
                <label htmlFor="contacts">Contacts</label>

                <div v-for="(contact, index) in client.contacts" :key="index">
                    <div class="input-group mb-2">
                        <select v-model="contact.type" class="form-control" id="contactType" required>
                            <template v-for="(key, value) in getAllEnumKeys(EContactType)">
                                <option :value="value">{{ key }}</option>
                            </template>
                        </select>

                        <template v-if="contact.type === EContactType.Email">
                            <input v-model="contact.content" class="form-control w-50" type="email" id="contacts" placeholder="name@example.com" required />
                        </template>

                        <template v-else>
                            <input v-model="contact.content" class="form-control w-50" type="tel" id="contacts" placeholder="12345678" required />
                        </template>

                        <input v-model="contact.info" class="form-control" type="text" id="info" placeholder="Extra info" />

                        <template v-if="index === 0">
                            <button @click="addMore()" type="button" class="btn btn-primary">
                                <i class="fa fa-plus"></i>
                            </button>
                        </template>

                        <template v-else>
                            <button @click="remove(index)" type="button" class="btn btn-danger">
                                <i class="fa fa-minus"></i>
                            </button>
                        </template>
                    </div>
                </div>
            </div>

            <div class="input-inline">
                <button @click="onSubmit()" type="button" class="btn btn-dark">
                    Create
                </button>

                <RouterLink to="/clients" class="float-end">Back to List</RouterLink>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { getAllEnumKeys } from 'enum-for'
import { useIdentityStore } from '@/stores/identity'
import { ClientService } from '@/services/ClientService'
import { EContactType } from '@/domain/IContact'
import { type IClient } from '@/domain/IClient';

const client = ref<IClient>({
    name: "",
    contacts: [{ content: "", type: EContactType.Email }]
} as IClient);

const router = useRouter()
const identityStore = useIdentityStore();
const clientService = new ClientService();

const onSubmit = async (): Promise<void> =>
{
    const jwtResponse = identityStore.JWTResponse;
    if (!jwtResponse)
        return;

    client.value.contacts.forEach(contact =>
    {
        if (contact.info?.length === 0)
            contact.info = undefined;    
    });

    const response = await clientService.post(jwtResponse, client.value);
    
    if (response)
        router.push({ path: '/clients' });
}

const addMore = (): void =>
{
    client.value.contacts.push({ content: "", type: EContactType.Email });
}

const remove = (index: number): void =>
{
    client.value.contacts.splice(index, 1);
}
</script>