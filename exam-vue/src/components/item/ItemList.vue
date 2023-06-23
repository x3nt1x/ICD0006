<template>
    <div class="input-inline">
        <div class="input-group w-auto float-start">
            <RouterLink to="/items/create" class="btn btn-dark">New item</RouterLink>
        </div>

        <div class="input-group w-auto float-end mb-3">
            <div class="form-outline">
                <input v-model="search" type="search" id="search" class="form-control" placeholder="search" />
            </div>

            <button type="button" class="btn btn-primary">
                <i class="fa fa-search"></i>
            </button>
        </div>

        <div class="input-group w-25 float-none m-auto">
            <Multiselect v-model="selected" :options="options" mode="multiple" placeholder="Filter" :searchable="true" :close-on-select="false" :hideSelected="false" />
        </div>
    </div>

    <table class="table text-center">
        <thead>
            <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Location</th>
                <th>Unit price</th>
                <th>Stock</th>
                <th>Manage</th>
            </tr>
        </thead>

        <tbody>
            <template v-for="item in filteredItems">
                <tr class="align-middle">
                    <td>{{ item.name }}</td>
                    <td>{{ ECategory[item.category] }}</td>
                    <td>{{ ELocation[item.location] }}</td>
                    <td>{{ item.price }} €</td>
                    <td>{{ item.stock }}/{{ item.defaultStock }}</td>

                    <td>
                        <button @click="onDelete(item.id)" type="button" class="btn btn-danger btn-circle ms-2">
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
import { getAllEnumEntries } from 'enum-for'
import { ItemService } from '@/services/ItemService'
import { type IItem, ECategory, ELocation } from '@/domain/IItem'
import Multiselect from '@vueform/multiselect'

const props = defineProps<{
    items: IItem[];
}>();

const search = ref<string>("");
const selected = ref<ECategory[]>();

const options = ref(getAllEnumEntries(ECategory).map(category =>
({
    value: category[1],
    label: category[0]
})));

const emit = defineEmits(['fetch-data']);

const itemService = new ItemService();

let filteredItems = computed<IItem[]>(() =>
{
    return props.items.filter(item =>
        (item.name.toLowerCase().includes(search.value.toLowerCase())) &&
        (selected.value && selected.value.length > 0 ? selected.value.includes(item.category) : true));
});

const onDelete = async (itemId: string): Promise<void> =>
{
    const response = await itemService.deleteAsync(itemId);

    if (response)
        emit('fetch-data');
}
</script>