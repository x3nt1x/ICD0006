<template>
    <RepairCreate :jobs="jobs" @fetch-data="fetchJobs" />
</template>
    
<script setup lang="ts">
import { ref } from "vue"
import { JobService } from "@/services/JobService"
import { type IJob } from "@/domain/IJob"
import RepairCreate from "@/components/repair/RepairCreate.vue"

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