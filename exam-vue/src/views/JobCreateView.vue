<template>
    <JobCreate :items="items" @fetch-data="fetchItems" />
</template>
    
<script setup lang="ts">
import { ref } from "vue"
import { ItemService } from "@/services/ItemService"
import { type IItem } from "@/domain/IItem"
import JobCreate from "@/components/job/JobCreate.vue"

const items = ref<IItem[]>([]);

const itemService = new ItemService();

const fetchItems = () =>
{
    itemService.allAsync().then(response =>
    {
        if (response)
            items.value = response;
    });
}

fetchItems();
</script>