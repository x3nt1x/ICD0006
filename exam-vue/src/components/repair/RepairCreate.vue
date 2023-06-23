<template>
    <div class="container">
        <h1>Create</h1>

        <h4>Repair</h4>
        <hr />

        <div class="row">
            <div class="col-8 border-end text-center">
                <form method="post">
                    <div class="form-group">
                        <label htmlFor="schedule">Schedule</label>
                        <VueDatePicker v-model="schedule" class="form-control" id="schedule" time-picker></VueDatePicker>
                    </div>

                    <div class="form-group">
                        <label htmlFor="contacts">Jobs</label>

                        <div class="input-group mb-2">
                            <Multiselect v-model="selected" :options="options" mode="tags" id="items" placeholder="Select jobs"
                                :searchable="true" :hideSelected="false" :close-on-select="false" />
                        </div>
                    </div>

                    <div class="input-inline mt-2">
                        <button @click="onSubmit()" type="button" class="btn btn-dark float-start">
                            Create
                        </button>

                        <RouterLink to="/repairs" class="float-end">Back to List</RouterLink>
                    </div>
                </form>
            </div>
            <div class="col-4 border-start">
                <h4 class="text-center">Info</h4>

                <table>
                    <tbody>
                        <tr>
                            <th class="pe-5">Schedule</th>
                            <td>{{ repair.schedule }}</td>
                        </tr>

                        <tr>
                            <th class="pe-5">Estimated time: </th>
                            <td>{{ selected.map(e => e.duration).join(', ') }}</td>
                        </tr>

                        <tr>
                            <th class="pe-5">Total Jobs</th>
                            <td>{{ selected.length }}</td>
                        </tr>

                        <tr>
                            <th class="pe-5">Total Price</th>
                            <td>{{ selected.reduce((total, element) => total + element.totalPrice, 0) }} €</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { RepairService } from '@/services/RepairService'
import { format } from "date-fns"
import { type IJob } from '@/domain/IJob'
import { type IRepair } from '@/domain/IRepair'
import { type IRepairJob } from '@/domain/IRepairJob'
import VueDatePicker from '@vuepic/vue-datepicker'
import Multiselect from '@vueform/multiselect'

const props = defineProps<{
    jobs: IJob[];
}>();

const repair = ref<IRepair>({
    repairJobs: [] as IRepairJob[]
} as IRepair);

const selected = ref<IJob[]>([]);
const options = ref<{ value: IJob; label: string; }[] | undefined>()

const router = useRouter();
const repairService = new RepairService();

const schedule = ref({
    hours: new Date(0, 0, 0, 0, 0, 0).getHours(),
    minutes: new Date(0, 0, 0, 0, 0, 0).getMinutes()
});

watch(() => props.jobs, (newJobs) =>
{
    if (!newJobs)
        return;

    options.value = (newJobs.map(job =>
    ({
        value: job,
        label: job.name
    })));
});

watch(() => schedule.value, (newTime) =>
{
    if (!newTime)
        return;

    const formattedHours = format(new Date().setHours(schedule.value.hours), 'HH');
    const formattedMinutes = format(new Date().setMinutes(schedule.value.minutes), 'mm');

    repair.value.schedule = `${formattedHours}:${formattedMinutes}:00`;
});

const onSubmit = async (): Promise<void> =>
{
    if (!selected.value)
        return;

    selected.value.forEach(element => repair.value.repairJobs.push({ jobId: element.id } as IRepairJob));

    const response = await repairService.postAsync(repair.value);

    if (response)
        router.push({ path: '/repairs' });
}
</script>