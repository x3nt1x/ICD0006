<template>
    <div class="input-inline">
        <div class="input-group w-auto float-start">
            <RouterLink to="/repairs/create" class="btn btn-dark">New repair</RouterLink>
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
                <th>UID</th>
                <th>Schedule</th>
                <th>Total Jobs</th>
                <th>Total Time</th>
                <th>Total Price</th>
                <th>Manage</th>
            </tr>
        </thead>

        <tbody>
            <template v-for="repair in filteredRepairs">
                <tr class="align-middle">
                    <td>{{ repair.id }}</td>
                    <td>{{ repair.schedule }}</td>
                    <td>{{ repair.totalJobs }}</td>
                    <td>{{ repair.totalTime }}</td>
                    <td>{{ repair.totalPrice }} €</td>

                    <td>
                        <button @click="onDelete(repair.id)" type="button" class="btn btn-danger btn-circle ms-2">
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
import { RepairService } from '@/services/RepairService'
import { type IRepair } from '@/domain/IRepair'

const props = defineProps<{
    repairs: IRepair[];
}>();

const search = ref<string>("");

const emit = defineEmits(['fetch-data']);

const repairService = new RepairService();

let filteredRepairs = computed<IRepair[]>(() =>
{
    return props.repairs.filter(repair => repair.id.includes(search.value.toLowerCase()));
});

const onDelete = async (repairId: string): Promise<void> =>
{
    const response = await repairService.deleteAsync(repairId);

    if (response)
        emit('fetch-data');
}
</script>