<template>
    <AssignmentList :assignments="assignments" />
</template>
    
<script setup lang="ts">
import { ref } from "vue"
import { AssignmentService } from "@/services/AssignmentService"
import { useIdentityStore } from "@/stores/identity"
import { type IAssignment } from "@/domain/IAssignment"
import AssignmentList from "@/components/assignment/AssignmentList.vue"

const assignments = ref<IAssignment[]>([]);

const assignmentService = new AssignmentService();

const jwtResponse = useIdentityStore().JWTResponse;

if (jwtResponse)
{
    assignmentService.getAll(jwtResponse).then(response =>
    {
        if (response)
            assignments.value = response;
    });
}
</script>