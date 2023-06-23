<template>
    <JobList :jobs="jobs" @fetch-data="fetchJobs" />
</template>
    
<script setup lang="ts">
import { ref } from "vue"
import { JobService } from "@/services/JobService"
import { type IJob } from "@/domain/IJob"
import JobList from "@/components/job/JobList.vue"

const jobs = ref<IJob[]>([]);

const jobService = new JobService();

const fetchJobs = () =>
{
    jobService.allAsync().then(response =>
    {
        if (response)
            jobs.value = response;
    });
}

fetchJobs();
</script>