<template>
    <div class="modal fade" id="descriptionModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Description</h1>

                    <button @click="() => description = assignment.description" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <form method="post">
                        <div class="form-group">
                            <textarea v-model="description" class="form-control" id="description" type="text"
                                aria-required="true" placeholder="Description here..." rows="5" maxlength=1024></textarea>
                        </div>
                    </form>
                </div>

                <div class="modal-footer">
                    <button @click="() => description = assignment.description" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button @click="onSubmit()" type="button" class="btn btn-dark" data-bs-dismiss="modal">Edit</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useIdentityStore } from '@/stores/identity'
import { AssignmentService } from '@/services/AssignmentService';
import { type IAssignment } from '@/domain/IAssignment'

const props = defineProps<{ assignment: IAssignment; }>();

const description = ref("");

const identityStore = useIdentityStore();
const assignmentService = new AssignmentService();

watch(() => props.assignment, (newAssignment) =>
{
    if (newAssignment)
        description.value = newAssignment.description;
});

const onSubmit = async (): Promise<void> =>
{
    const jwtResponse = identityStore.JWTResponse;
    if (!jwtResponse)
        return;

    props.assignment.description = description.value;

    await assignmentService.put(jwtResponse, props.assignment);
}
</script>