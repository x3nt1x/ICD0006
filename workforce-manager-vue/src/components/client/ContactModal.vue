<template>
    <div class="modal fade" id="contactModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Contact</h1>

                    <button @click="onRevert()" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <form method="post">
                        <div class="form-group">
                            <div class="input-group mb-2">
                                <select v-model="contact.type" class="form-control" id="contactType" required>
                                    <template v-for="(key, value) in getAllEnumKeys(EContactType)">
                                        <option :value="value">{{ key }}</option>
                                    </template>
                                </select>

                                <template v-if="contact.type === EContactType.Phone">
                                    <input v-model="contact.content" class="form-control w-75" type="tel" id="contacts" placeholder="12345678" required />
                                </template>

                                <template v-else>
                                    <input v-model="contact.content" class="form-control w-75" type="email" id="contacts" placeholder="name@example.com" required />
                                </template>
                            </div>

                            <input v-model="contact.info" class="form-control" type="text" id="info" placeholder="Extra info (optional)" />
                        </div>
                    </form>
                </div>

                <div class="modal-footer">
                    <template v-if="currentContact">
                        <button @click="onDelete()" class="btn btn-danger me-auto" data-bs-dismiss="modal">Delete</button>
                    </template>

                    <button @click="onRevert()" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                    <template v-if="currentContact">
                        <button @click="onEdit()" type="button" class="btn btn-dark" data-bs-dismiss="modal">Edit</button>
                    </template>

                    <template v-else>
                        <button @click="onSubmit()" type="button" class="btn btn-dark" data-bs-dismiss="modal">Add</button>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { getAllEnumKeys } from 'enum-for'
import { useIdentityStore } from '@/stores/identity'
import { ContactService } from '@/services/ContactService'
import { type IContact, EContactType } from '@/domain/IContact'

const props = defineProps<{
    clientId: string;
    currentContact?: IContact;
    emit(event: string): void;
}>();

const contact = ref<IContact>({
    type: EContactType.Email
} as IContact);

const contactService = new ContactService();

watch(() => props.currentContact, (newContact) =>
{
    if (newContact)
        contact.value = { ...newContact };
    else
        contact.value = { type: EContactType.Email } as IContact;
});

const onSubmit = async (): Promise<void> =>
{
    const jwtResponse = useIdentityStore().JWTResponse;

    if (jwtResponse)
    {
        contact.value.clientId = props.clientId;

        const response = await contactService.post(jwtResponse, contact.value);

        if (response)
            props.emit('fetch-data');
    }

    contact.value = { type: EContactType.Email } as IContact;
}

const onEdit = async (): Promise<void> =>
{
    if (!props.currentContact)
        return;

    const jwtResponse = useIdentityStore().JWTResponse;

    if (jwtResponse)
    {
        if (contact.value.info?.length === 0)
            contact.value.info = undefined;

        const response = await contactService.put(jwtResponse, contact.value);

        if (response)
            props.emit('fetch-data');
    }

    contact.value = { type: EContactType.Email } as IContact;
}

const onDelete = async (): Promise<void> =>
{
    if (!props.currentContact)
        return;

    const jwtResponse = useIdentityStore().JWTResponse;

    if (jwtResponse)
    {
        const response = await contactService.delete(jwtResponse, props.currentContact.id!);

        if (response)
            props.emit('fetch-data');
    }

    contact.value = { type: EContactType.Email } as IContact;
}

const onRevert = (): void =>
{
    if (props.currentContact)
        contact.value = { ...props.currentContact };
    else
        contact.value = { type: EContactType.Email } as IContact;
}
</script>