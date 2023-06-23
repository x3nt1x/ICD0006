<template>
    <Assignment :assignment="assignment" :comments="comments" :workers="workers" @fetch-data="fetchAssignmentData" />
</template>
    
<script setup lang="ts">
import { ref } from "vue"
import { AssignmentService } from "@/services/AssignmentService"
import { useIdentityStore } from "@/stores/identity"
import { type IAssignment } from "@/domain/IAssignment"
import { type IComment } from "@/domain/IComment"
import { type IWorker } from "@/domain/IWorker"
import Assignment from "@/components/assignment/Assignment.vue"

const props = defineProps(['id']);

const assignment = ref<IAssignment>({} as IAssignment);
const comments = ref<IComment[]>([]);
const workers = ref<IWorker[]>([]);

const assignmentService = new AssignmentService();

const fetchAssignmentData = () =>
{
    const jwtResponse = useIdentityStore().JWTResponse;
    if (!jwtResponse)
        return;

    assignmentService.find(jwtResponse, props.id).then(response =>
    {
        if (response)
            assignment.value = response;
    });

    assignmentService.getAssignmentComments(jwtResponse, props.id).then(response =>
    {
        if (response)
            comments.value = response;
    });

    assignmentService.getAssignmentWorkers(jwtResponse, props.id).then(response =>
    {
        if (response)
            workers.value = response;
    });
}

fetchAssignmentData();
</script>