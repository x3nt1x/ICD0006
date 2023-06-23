<template>
    <div class="modal fade" id="commentModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Comment</h1>
                    
                    <button @click="onRevert()" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <form method="post">
                        <div class="form-group">
                            <textarea v-model="comment.content" class="form-control" id="comment" type="text"
                                aria-required="true" placeholder="Comment here..." rows="5" maxlength=512></textarea>
                        </div>
                    </form>
                </div>

                <div class="modal-footer">
                    <template v-if="currentComment">
                        <button @click="onDelete()" class="btn btn-danger me-auto" data-bs-dismiss="modal">Delete</button>
                    </template>

                    <button @click="onRevert()" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                    <template v-if="currentComment">
                        <button @click="onEdit()" type="button" class="btn btn-dark" data-bs-dismiss="modal">Edit</button>
                    </template>

                    <template v-else>
                        <button @click="onComment()" type="button" class="btn btn-dark" data-bs-dismiss="modal">Comment</button>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useIdentityStore } from '@/stores/identity'
import { CommentService } from '@/services/CommentService'
import { type IComment } from '@/domain/IComment'

const props = defineProps<{
    assignmentId: string;
    currentComment?: IComment;
    emit(event: string): void;
}>();

const comment = ref({} as IComment);

const commentService = new CommentService();

watch(() => props.currentComment, (newComment) =>
{
    if (newComment)
        comment.value = { ...newComment };
    else
        comment.value = {} as IComment;
});

const onComment = async (): Promise<void> =>
{
    const jwtResponse = useIdentityStore().JWTResponse;

    if (jwtResponse)
    {
        comment.value.assignmentId = props.assignmentId;

        const response = await commentService.post(jwtResponse, comment.value);

        if (response)
            props.emit('fetch-data');
    }

    comment.value = {} as IComment;
}

const onEdit = async (): Promise<void> =>
{
    if (!props.currentComment)
        return;

    const jwtResponse = useIdentityStore().JWTResponse;

    if (jwtResponse)
    {
        comment.value.assignmentId = props.assignmentId;

        const response = await commentService.put(jwtResponse, comment.value);

        if (response)
            props.emit('fetch-data');
    }

    comment.value = {} as IComment;
}

const onDelete = async (): Promise<void> =>
{
    if (!props.currentComment)
        return;

    const jwtResponse = useIdentityStore().JWTResponse;

    if (jwtResponse)
    {
        const response = await commentService.delete(jwtResponse, props.currentComment.id);

        if (response)
            props.emit('fetch-data');
    }

    comment.value = {} as IComment;
}

const onRevert = (): void =>
{
    if (props.currentComment)
        comment.value = { ...props.currentComment };
    else
        comment.value = {} as IComment;
}
</script>