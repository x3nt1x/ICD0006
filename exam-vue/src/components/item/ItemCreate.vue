<template>
    <div class="w-50 m-auto">
        <h1>Create</h1>

        <h4>Item</h4>
        <hr />

        <form method="post">
            <div class="form-group">
                <label htmlFor="name">Name</label>
                <input v-model="item.name" class="form-control" id="name" type="text" aria-required="true" maxlength=32 required />
            </div>

            <div class="form-group">
                <label htmlFor="category">Category</label>

                <select v-model="item.category" class="form-control" id="category" required>
                    <template v-for="(key, value) in getAllEnumKeys(ECategory)">
                        <option :value="value">{{ key }}</option>
                    </template>
                </select>
            </div>

            <div class="form-group">
                <label htmlFor="location">Location</label>

                <select v-model="item.location" class="form-control" id="location" required>
                    <template v-for="(key, value) in getAllEnumKeys(ELocation)">
                        <option :value="value">{{ key }}</option>
                    </template>
                </select>
            </div>

            <div class="form-group">
                <label htmlFor="price">Price</label>
                <input v-model="item.price" class="form-control" id="price" type="number" aria-required="true" required />
            </div>

            <div class="form-group">
                <label htmlFor="stock">Stock</label>
                <input v-model="item.stock" class="form-control" id="stock" type="number" aria-required="true" required />
            </div>

            <div class="form-group">
                <label htmlFor="default_stock">Default Stock</label>
                <input v-model="item.defaultStock" class="form-control" id="default_stock" type="number" aria-required="true" required />
            </div>

            <div class="input-inline mt-2">
                <button @click="onSubmit()" type="button" class="btn btn-dark">
                    Create
                </button>

                <RouterLink to="/items" class="float-end">Back to List</RouterLink>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { getAllEnumKeys } from 'enum-for'
import { ItemService } from '@/services/ItemService'
import { type IItem, ECategory, ELocation } from '@/domain/IItem'

const item = ref<IItem>({} as IItem);

const router = useRouter()
const itemService = new ItemService();

const onSubmit = async (): Promise<void> =>
{
    const response = await itemService.postAsync(item.value);

    if (response)
        router.push({ path: '/items' });
}
</script>