<template>
    <div class="w-50 m-auto">
        <h1>Edit</h1>

        <h4>Assignment</h4>
        <hr />

        <form method="post">
            <div class="form-group">
                <label htmlFor="title">Title</label>
                <input v-model="assignment.title" class="form-control" id="title" type="text" aria-required="true" maxlength=32 />
            </div>

            <div class="form-group">
                <label htmlFor="priority">Priority</label>

                <select v-model="assignment.priority" class="form-control" id="priority">
                    <template v-for="(key, value) in getAllEnumKeys(ETaskPriority)">
                        <option :value="value">{{ key }}</option>
                    </template>
                </select>
            </div>

            <div class="form-group">
                <label htmlFor="status">Status</label>

                <select v-model="assignment.status" class="form-control" id="status">
                    <template v-for="(key, value) in getAllEnumKeys(ETaskStatus)">
                        <option :value="value">{{ key }}</option>
                    </template>
                </select>
            </div>

            <div class="form-group mb-2">
                <label htmlFor="date">Due Date</label>
                <Datepicker v-model="date" className="form-control" id="date" />
            </div>

            <div class="input-inline">
                <button @click="onSubmit()" type="button" class="btn btn-dark">
                    Edit
                </button>

                <RouterLink :to="`/assignments/${assignment.id}`" class="float-end">Back</RouterLink>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getAllEnumKeys } from 'enum-for'
import { useIdentityStore } from '@/stores/identity'
import { AssignmentService } from '@/services/AssignmentService'
import { ETaskPriority, ETaskStatus, type IAssignment } from '@/domain/IAssignment'
import Datepicker from 'vue3-datepicker'

const props = defineProps<{
    assignment: IAssignment;
}>();

const date = ref(new Date());

const router = useRouter()
const identityStore = useIdentityStore();
const assignmentService = new AssignmentService();

watch(() => props.assignment, (newAssignment) =>
{
    if (newAssignment)
        date.value = new Date(newAssignment.dueDate);
});

const onSubmit = async (): Promise<void> =>
{
    const jwtResponse = identityStore.JWTResponse;
    if (!jwtResponse)
        return;

    props.assignment.dueDate = date.value.toLocaleDateString("en-CA");

    const response = await assignmentService.put(jwtResponse, props.assignment);

    if (response)
        router.push({ path: `/assignments/${props.assignment.id}` });
}
</script>