<template>
    <div class="w-50 m-auto">
        <h1>Create</h1>

        <h4>Job</h4>
        <hr />

        <form method="post">
            <div class="form-group">
                <label htmlFor="name">Name</label>
                <input v-model="job.name" class="form-control" id="name" type="text" aria-required="true" maxlength=32 required />
            </div>

            <div class="form-group">
                <label htmlFor="duration">Duration</label>
                <VueDatePicker v-model="time" class="form-control" id="duration" time-picker></VueDatePicker>
            </div>

            <div class="form-group">
                <label htmlFor="contacts">Items</label>

                <div v-for="(item, index) in job.jobItems" :key="index">
                    <div class="input-group mb-2">
                        <input v-model="item.quantity" class="form-control" id="stock" type="number" aria-required="true" placeholder="Quantity" required />

                        <Multiselect v-model="item.itemId" :options="options" class="w-75" id="items"
                            placeholder="Item required to perform job" :searchable="true" :hideSelected="false" />

                        <template v-if="index === 0">
                            <button @click="addMore()" type="button" class="btn btn-primary">
                                <i class="fa fa-plus"></i>
                            </button>
                        </template>

                        <template v-else>
                            <button @click="remove(index)" type="button" class="btn btn-danger">
                                <i class="fa fa-minus"></i>
                            </button>
                        </template>
                    </div>
                </div>
            </div>

            <div class="input-inline mt-2">
                <button @click="onSubmit()" type="button" class="btn btn-dark">
                    Create
                </button>

                <RouterLink to="/jobs" class="float-end">Back to List</RouterLink>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { format } from "date-fns"
import { JobService } from '@/services/JobService'
import { type IJob } from '@/domain/IJob'
import { type IItem } from '@/domain/IItem'
import { type IJobItem } from '@/domain/IJobItem'
import Multiselect from '@vueform/multiselect'
import VueDatePicker from '@vuepic/vue-datepicker'

const props = defineProps<{
    items: IItem[];
}>();

const job = ref<IJob>({
    jobItems: [{} as IJobItem]
} as IJob);

const router = useRouter();
const jobService = new JobService();

const time = ref({
    hours: new Date(0, 0, 0, 0, 0, 0).getHours(),
    minutes: new Date(0, 0, 0, 0, 0, 0).getMinutes()
});

const options = ref<{ value: string; label: string; }[] | undefined>()

watch(() => props.items, (newItems) =>
{
    if (!newItems)
        return;

    options.value = (newItems.map(item =>
    ({
        value: item.id,
        label: item.name
    })));
});

const onSubmit = async (): Promise<void> =>
{
    var formattedHours = format(new Date().setHours(time.value.hours), 'HH');
    var formattedMinutes = format(new Date().setMinutes(time.value.minutes), 'mm');

    job.value.duration = `${formattedHours}:${formattedMinutes}:00`;

    const response = await jobService.postAsync(job.value);

    if (response)
        router.push({ path: '/jobs' });
}

const addMore = (): void =>
{
    job.value.jobItems.push({} as IJobItem);
}

const remove = (index: number): void =>
{
    job.value.jobItems.splice(index, 1);
}
</script>