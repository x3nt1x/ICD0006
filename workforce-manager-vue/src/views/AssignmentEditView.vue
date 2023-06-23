<template>
    <AssignmentEdit :assignment="assignment" />
</template>
    
<script setup lang="ts">
import { ref } from "vue"
import { AssignmentService } from "@/services/AssignmentService"
import { useIdentityStore } from "@/stores/identity"
import { type IAssignment } from "@/domain/IAssignment"
import AssignmentEdit from "@/components/assignment/AssignmentEdit.vue"

const props = defineProps(['id']);

const assignment = ref<IAssignment>({} as IAssignment);

const assignmentService = new AssignmentService();

const jwtResponse = useIdentityStore().JWTResponse;

if (jwtResponse)
{
    assignmentService.find(jwtResponse, props.id).then(response =>
    {
        if (response)
            assignment.value = response;
    });
}
</script>