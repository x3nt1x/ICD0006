<template>
    <CommentModal :assignmentId="assignment.id" :currentComment="currentComment" :emit="emit" />
    <WorkerModal :workers="workers" :assignmentId="assignment.id" :emit="emit" />
    <DescriptionModal :assignment="assignment" />

    <div class="row row-cols-2">
        <div class="col border-end mb-3">
            <div class="text-center mb-3">
                <h3 class="d-inline">Details</h3>

                <RouterLink :to="`/assignments/${assignment.id}/edit`" class="btn btn-dark float-end position-relative">
                    Edit
                </RouterLink>
            </div>

            <table>
                <tbody>
                    <tr>
                        <th class="pe-5">UID</th>
                        <td>{{ assignment.id }}</td>
                    </tr>

                    <tr>
                        <th class="pe-5">Title</th>
                        <td>{{ assignment.title }}</td>
                    </tr>

                    <tr>
                        <th class="pe-5">Priority</th>
                        <td>
                            <div class="round pe-3 ps-3" :class="priorityColor(assignment.priority)">
                                {{ ETaskPriority[assignment.priority] }}
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <th class="pe-5">Status</th>
                        <td>
                            <div class="round pe-3 ps-3" :class="statusColor(assignment.status)">
                                {{ ETaskStatus[assignment.status] }}
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <th class="pe-5">Due Date</th>
                        <td>{{ new Date(assignment.dueDate).toLocaleDateString("ru-RU") }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="col border-start mb-3 text-center">
            <div class="mb-3">
                <h3 class="d-inline">Description</h3>

                <button type="button" class="btn btn-dark float-end position-relative" data-bs-toggle="modal" data-bs-target="#descriptionModal">
                    Edit
                </button>
            </div>

            <div>
                <p>{{ assignment.description }}</p>
            </div>
        </div>

        <hr />
        <hr />

        <div class="col border-end mb-3">
            <div class="text-center mb-3">
                <h3 class="d-inline">Comments</h3>

                <button @click="() => currentComment = undefined" class="btn btn-dark float-end position-relative" data-bs-toggle="modal" data-bs-target="#commentModal">
                    Add
                </button>
            </div>

            <template v-for="comment in comments">
                <div @mouseover="hoveredComment = comment" @mouseleave="hoveredComment = undefined">
                    <div class="input-inline mb-3">
                        <div class="input-group w-auto float-start">
                            <p class="m-0"><b>{{ comment.firstName }} {{ comment.lastName }}</b></p>
                        </div>

                        <div class="input-group w-auto float-end">
                            <p class="mt-3 mb-0 fw-lighter">
                                {{ new Date(comment.date).toLocaleTimeString("it-IT") }} |
                                {{ new Date(comment.date).toLocaleDateString("ru-RU") }}
                            </p>
                        </div>
                    </div>

                    <span v-if="hoveredComment === comment" type="button" class="position-absolute mt-3 mb-0 ps-3 float-start" aria-label="Edit"
                                data-bs-toggle="modal" data-bs-target="#commentModal">

                        <i @click="() => currentComment = comment" class="fa fa-pencil-square-o"></i>
                    </span>

                    <br>
                    
                    <p class="m-0">{{ comment.content }}</p>
                </div>
            </template>
        </div>

        <div class="col border-start mb-3 text-center">
            <div class="mb-3">
                <h3 class="d-inline">Workers</h3>

                <button class="btn btn-dark float-end position-relative" data-bs-toggle="modal" data-bs-target="#workerModal">
                    Add
                </button>
            </div>

            <div class="row">
                <template v-for="worker in workers">
                    <div class="col-sm-4 mx-auto" @mouseover="hoveredWorker = worker" @mouseleave="hoveredWorker = undefined">
                        <div class="card">
                            <button v-if="hoveredWorker === worker" @click="onRemoveWorker(worker.id)" class="btn-close" aria-label="Close"></button>

                            <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" class="card-img-top">

                            <div class="card-body">
                                <h5 class="card-title">{{ worker.firstName }} {{ worker.lastName }}</h5>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>

        <hr />
        <hr />
    </div>

    <div class="input-inline">
        <div class="input-group w-auto float-start">
            <button @click="onDelete()" type="button" class="btn btn-danger">
                Delete
            </button>
        </div>

        <div class="input-group w-auto float-end">
            <div class="input-group w-auto float-start">
                <button @click="onHold()" type="button" class="btn btn-warning">
                    On hold
                </button>
            </div>

            <div class="input-group w-auto float-start">
                <button @click="onArchive()" type="button" class="btn btn-secondary ms-2">
                    Archive
                </button>
            </div>

            <div class="input-group w-auto float-start">
                <button @click="onDone()" type="button" class="btn btn-success ms-2">
                    Done
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useIdentityStore } from '@/stores/identity'
import { AssignmentService } from '@/services/AssignmentService'
import { WorkerService } from '@/services/WorkerService'
import { priorityColor, statusColor } from '@/utilities/Utils'
import { type IComment } from '@/domain/IComment'
import { type IWorker } from '@/domain/IWorker'
import { type IAssignment, ETaskPriority, ETaskStatus } from '@/domain/IAssignment'
import CommentModal from '@/components/assignment/CommentModal.vue'
import WorkerModal from '@/components/assignment/WorkerModal.vue'
import DescriptionModal from '@/components/assignment/DescriptionModal.vue'

const props = defineProps<{
    assignment: IAssignment;
    comments: IComment[];
    workers: IWorker[];
}>();

const hoveredWorker = ref<IWorker | undefined>();
const hoveredComment = ref<IComment | undefined>();
const currentComment = ref<IComment | undefined>();

const emit = defineEmits(['fetch-data']);

const router = useRouter();
const identityStore = useIdentityStore();
const assignmentService = new AssignmentService();
const workerService = new WorkerService();

const onDone = (): void =>
{
    props.assignment.status = ETaskStatus.Done;

    saveChanges();
}

const onHold = (): void =>
{
    props.assignment.status = ETaskStatus.OnHold;

    saveChanges();
}

const onArchive = (): void =>
{
    props.assignment.status = ETaskStatus.Archived;

    saveChanges();
}

const saveChanges = async (): Promise<void> =>
{
    const jwtResponse = identityStore.JWTResponse;
    if (!jwtResponse)
        return;

    const response = await assignmentService.put(jwtResponse, props.assignment);

    if (response)
        router.push({ path: '/assignments' })
}

const onDelete = async (): Promise<void> =>
{
    const jwtResponse = identityStore.JWTResponse;
    if (!jwtResponse)
        return;

    const response = await assignmentService.delete(jwtResponse, props.assignment.id);

    if (response)
        router.push({ path: '/assignments' })
}

const onRemoveWorker = async (workerId: string): Promise<void> =>
{
    const jwtResponse = identityStore.JWTResponse;
    if (!jwtResponse)
        return;

    const response = await workerService.delete(jwtResponse, workerId);

    if (response)
        emit('fetch-data');
}
</script>

<style scoped>
.round {
    display: inline-block;
}

.col-sm-4 {
    width: 25%;
}

.card {
    border: 0;
    margin-bottom: 1rem;
}

.btn-close {
    position: absolute;
    left: 85%;
}

.card-img-top {
    margin: auto;
    outline: solid 1px;
    width: 6rem;
    border-radius: 6rem;
}

.card-body {
    padding: 0;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}

.card-title {
    margin: 0;
}
</style>