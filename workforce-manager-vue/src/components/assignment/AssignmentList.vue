<template>
    <div class="input-inline">
        <div class="input-group w-auto float-start">
            <RouterLink to="/assignments/create" class="btn btn-dark">New assignment</RouterLink>
        </div>

        <div class="input-group w-auto float-end mb-3">
            <div class="form-outline">
                <input v-model="search" type="search" id="search" class="form-control" placeholder="Search" />
            </div>

            <button type="button" class="btn btn-primary">
                <i class="fa fa-search"></i>
            </button>
        </div>

        <div class="input-group w-25 float-start m-auto ms-4">
            <Multiselect v-model="selectedPriority" :options="priorityOptions" mode="multiple" placeholder="Priority filters"
                :searchable="true" :close-on-select="false" :hideSelected="false" />
        </div>

        <div class="input-group w-25 float-end m-auto me-4">
            <Multiselect v-model="selectedStatus" :options="statusOptions" mode="multiple" placeholder="Status filters"
                :searchable="true" :close-on-select="false" :hideSelected="false" />
        </div>
    </div>

    <table class="table text-center">
        <thead>
            <tr>
                <th>UID</th>
                <th>Title</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Due date</th>
                <th>Manage</th>
            </tr>
        </thead>

        <tbody>
            <template v-for="assignment in filteredAssignments">
                <tr class="align-middle">
                    <td>
                        <RouterLink :to="`/assignments/${assignment.id}`">{{ assignment.id }}</RouterLink>
                    </td>

                    <td>{{ assignment.title }}</td>

                    <td class="round" :class="priorityColor(assignment.priority)">
                        {{ ETaskPriority[assignment.priority] }}
                    </td>

                    <td class="round" :class="statusColor(assignment.status)">
                        {{ ETaskStatus[assignment.status] }}
                    </td>

                    <td>{{ new Date(assignment.dueDate).toLocaleDateString("ru-RU") }}</td>

                    <td>
                        <template v-if="assignment.status === ETaskStatus.InProgress">
                            <button @click="onStop(assignment)" type="button" class="btn btn-dark">
                                Stop
                            </button>

                            <button @click="onDone(assignment)" type="button" class="btn btn-success btn-circle ms-2">
                                <i class="fa fa-check"></i>
                            </button>
                        </template>

                        <template v-else>
                            <button @click="onStart(assignment)" type="button" class="btn btn-dark" :disabled="anyInProgress">
                                Start
                            </button>

                            <button type="button" class="btn btn-success btn-circle ms-2" disabled>
                                <i class="fa fa-check"></i>
                            </button>
                        </template>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { getAllEnumEntries } from 'enum-for'
import { useIdentityStore } from '@/stores/identity'
import { AssignmentService } from '@/services/AssignmentService'
import { priorityColor, statusColor } from '@/utilities/Utils'
import { ETaskPriority, ETaskStatus, type IAssignment } from '@/domain/IAssignment'
import Multiselect from '@vueform/multiselect'

const props = defineProps<{
    assignments: IAssignment[];
}>();

const search = ref<string>("");
const selectedPriority = ref<ETaskPriority[]>();
const selectedStatus = ref<ETaskStatus[]>([
    ETaskStatus.OnHold,
    ETaskStatus.Paused,
    ETaskStatus.Pending,
    ETaskStatus.InProgress
]);

const statusOptions = ref(getAllEnumEntries(ETaskStatus).map(status =>
({
    value: status[1],
    label: status[0]
})));

const priorityOptions = ref(getAllEnumEntries(ETaskPriority).map(priority =>
({
    value: priority[1],
    label: priority[0]
})));

const identityStore = useIdentityStore();
const assignmentService = new AssignmentService();

let filteredAssignments = computed<IAssignment[]>(() =>
{
    return props.assignments.filter(assignment =>
        (assignment.id.includes(search.value.toLowerCase()) ||
         assignment.title.toLowerCase().includes(search.value.toLowerCase())) &&
        (selectedStatus.value && selectedStatus.value.length > 0 ? selectedStatus.value.includes(assignment.status) : true) &&
        (selectedPriority.value && selectedPriority.value.length > 0 ? selectedPriority.value.includes(assignment.priority) : true));
});

let anyInProgress = computed<boolean>(() =>
{
    return filteredAssignments.value.some(assignment => assignment.status === ETaskStatus.InProgress);
});

const onStart = (assignment: IAssignment): void =>
{
    assignment.status = ETaskStatus.InProgress;

    saveChanges(assignment);
}

const onStop = (assignment: IAssignment): void =>
{
    assignment.status = ETaskStatus.Paused;

    saveChanges(assignment);
}

const onDone = (assignment: IAssignment): void =>
{
    assignment.status = ETaskStatus.Done;

    saveChanges(assignment);
}

const saveChanges = async (assignment: IAssignment): Promise<void> =>
{
    const jwtResponse = identityStore.JWTResponse;

    if (jwtResponse)
        await assignmentService.put(jwtResponse, assignment);
}
</script>