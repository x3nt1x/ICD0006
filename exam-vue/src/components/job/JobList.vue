<template>
    <div class="input-inline">
        <div class="input-group w-auto float-start">
            <RouterLink to="/jobs/create" class="btn btn-dark">New job</RouterLink>
        </div>

        <div class="input-group w-auto float-end mb-3">
            <div class="form-outline">
                <input v-model="search" type="search" id="search" class="form-control" placeholder="search" />
            </div>

            <button type="button" class="btn btn-primary">
                <i class="fa fa-search"></i>
            </button>
        </div>
    </div>

    <table class="table text-center">
        <thead>
            <tr>
                <th>Job</th>
                <th>Duration</th>
                <th>Total Price</th>
                <th>Manage</th>
            </tr>
        </thead>

        <tbody>
            <template v-for="job in filteredJobs">
                <tr class="align-middle">
                    <td>{{ job.name }}</td>
                    <td>{{ job.duration }}</td>
                    <td>{{ job.totalPrice }} €</td>

                    <td>
                        <button @click="onDelete(job.id)" type="button" class="btn btn-danger btn-circle ms-2">
                            <i class="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { JobService } from '@/services/JobService'
import { type IJob } from '@/domain/IJob'

const props = defineProps<{
    jobs: IJob[];
}>();

const search = ref<string>("");

const emit = defineEmits(['fetch-data']);

const jobService = new JobService();

let filteredJobs = computed<IJob[]>(() =>
{
    return props.jobs.filter(job => job.name.toLowerCase().includes(search.value.toLowerCase()));
});

const onDelete = async (jobId: string): Promise<void> =>
{
    const response = await jobService.deleteAsync(jobId);

    if (response)
        emit('fetch-data');
}
</script>