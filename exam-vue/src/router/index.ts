import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/identity/Login.vue'
import Register from '@/components/identity/Register.vue'
import ItemCreate from '@/components/item/ItemCreate.vue'
import HomeView from '@/views/HomeView.vue'
import ItemListView from '@/views/ItemListView.vue'
import JobListView from '@/views/JobListView.vue'
import JobCreateView from '@/views/JobCreateView.vue'
import RepairListView from '@/views/RepairListView.vue'
import RepairCreateView from '@/views/RepairCreateView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/items',
            name: 'items',
            component: ItemListView
        },
        {
            path: '/items/create',
            name: 'items/create',
            component: ItemCreate
        },
        {
            path: '/jobs',
            name: 'jobs',
            component: JobListView
        },
        {
            path: '/jobs/create',
            name: 'jobs/create',
            props: true,
            component: JobCreateView
        },
        {
            path: '/repairs',
            name: 'repairs',
            component: RepairListView
        },
        {
            path: '/repairs/create',
            name: 'repairs/create',
            props: true,
            component: RepairCreateView
        }
    ]
})

export default router