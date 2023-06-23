<template>
    <div class="modal fade" id="workerModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Add workers</h1>

                    <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <form method="post">
                        <div class="form-group">
                            <Multiselect @open="fetchAllUsers" v-model="selected" mode="tags" placeholder="Select workers"
                                :searchable="true" :close-on-select="false" :options="options" />
                        </div>
                    </form>
                </div>

                <div class="modal-footer">
                    <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button @click="onSubmit()" type="button" class="btn btn-dark" data-bs-dismiss="modal">Add</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useIdentityStore } from '@/stores/identity'
import { IdentityService } from '@/services/IdentityService'
import { WorkerService } from '@/services/WorkerService'
import { type IWorker } from '@/domain/IWorker'
import Multiselect from '@vueform/multiselect'

const props = defineProps<{
    workers: IWorker[];
    assignmentId: string;
    emit(event: string): void;
}>();

const options = ref();
const selected = ref<string[]>();
const previousWorkers = ref<IWorker[]>();

const identityStore = useIdentityStore();
const identityService = new IdentityService();
const workerService = new WorkerService();

const onSubmit = async (): Promise<void> =>
{
    if (!selected.value)
        return;

    const jwtResponse = identityStore.JWTResponse;
    if (!jwtResponse)
        return;

    const workers = selected.value.map(user => ({
        appUserId: user,
        assignmentId: props.assignmentId
    } as IWorker));

    const response = await workerService.postWorkers(jwtResponse, workers);

    if (response)
        props.emit('fetch-data');
}

const fetchAllUsers = async (): Promise<void> =>
{
    if (props.workers === previousWorkers.value)
        return;

    const response = await identityService.getUsers();

    if (!response)
        return;

    options.value = response
        .filter(user => !props.workers.some(worker => worker.appUserId === user.id))
        .map(user => ({ value: user.id, label: `${user.firstName} ${user.lastName}` }));

    previousWorkers.value = props.workers;
}
</script>