<template>
    <RepairList :repairs="repairs" @fetch-data="fetchRepairs" />
</template>
    
<script setup lang="ts">
import { ref } from "vue"
import { RepairService } from "@/services/RepairService"
import { type IRepair } from "@/domain/IRepair"
import RepairList from "@/components/repair/RepairList.vue"

const repairs = ref<IRepair[]>([]);

const repairService = new RepairService();

const fetchRepairs = () =>
{
    repairService.allAsync().then(response =>
    {
        if (response)
            repairs.value = response;
    });
}

fetchRepairs();
</script>