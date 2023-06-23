<template>
    <div class="w-50 m-auto">
        <h1>Create</h1>

        <h4>Assignment</h4>
        <hr />

        <form method="post">
            <div class="form-group">
                <label htmlFor="title">Title</label>
                <input v-model="assignment.title" class="form-control" id="title" type="text" aria-required="true" maxlength=32 />
            </div>

            <div class="form-group">
                <label htmlFor="description">Description</label>
                <textarea v-model="assignment.description" class="form-control" id="description" type="text" aria-required="true" rows="5" maxlength=1024></textarea>
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
                <label htmlFor="date">Due Date</label>
                <Datepicker v-model="date" className="form-control" id="date" />
            </div>

            <div class="form-group">
                <label htmlFor="order">Order</label>

                <select v-model="assignment.orderId" class="form-select" id="order">
                    <template v-for="order in orders">
                        <option :value="order.id">{{ order.name }}</option>
                    </template>
                </select>
            </div>

            <div class="input-inline mt-2">
                <button @click="onSubmit()" type="button" class="btn btn-dark">
                    Create
                </button>

                <RouterLink to="/assignments" class="float-end">Back to List</RouterLink>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAllEnumKeys } from 'enum-for'
import { useIdentityStore } from '@/stores/identity'
import { AssignmentService } from '@/services/AssignmentService'
import { type IOrder } from '@/domain/IOrder'
import { type IAssignment, ETaskPriority, ETaskStatus } from '@/domain/IAssignment'
import Datepicker from 'vue3-datepicker'

const assignment = {
    title: "",
    description: "",
    priority: ETaskPriority.Low,
    status: ETaskStatus.Pending,
    dueDate: "",
    orderId: ""
} as IAssignment;

defineProps<{
    orders: IOrder[];
}>();

const date = ref(new Date());

const router = useRouter()
const identityStore = useIdentityStore();
const assignmentService = new AssignmentService();

const onSubmit = async (): Promise<void> =>
{
    const jwtResponse = identityStore.JWTResponse;
    if (!jwtResponse)
        return;

    assignment.dueDate = date.value.toLocaleDateString('en-CA');

    const response = await assignmentService.post(jwtResponse, assignment);

    if (response)
        router.push({ path: '/assignments' });
}
</script>