import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Login from '@/components/identity/Login.vue'
import Register from '@/components/identity/Register.vue'
import ClientCreate from '@/components/client/ClientCreate.vue'
import AssignmentView from '@/views/AssignmentView.vue'
import AssignmentListView from '@/views/AssignmentListView.vue'
import AssignmentEditView from '@/views/AssignmentEditView.vue'
import AssignmentCreateView from '@/views/AssignmentCreateView.vue'
import ClientView from '@/views/ClientView.vue'
import ClientListView from '@/views/ClientListView.vue'
import OrderView from '@/views/OrderView.vue'
import OrderListView from '@/views/OrderListView.vue'
import OrderCreateView from '@/views/OrderCreateView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
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
            path: '/assignments/:id',
            name: 'assignments/:id',
            props: true,
            component: AssignmentView
        },
        {
            path: '/assignments',
            name: 'assignments',
            component: AssignmentListView
        },
        {
            path: '/assignments/create',
            name: 'assignments/create',
            component: AssignmentCreateView
        },
        {
            path: '/assignments/:id/edit',
            name: 'assignments/:id/create',
            props: true,
            component: AssignmentEditView
        },
        {
            path: '/clients/:id',
            name: 'clients/:id',
            props: true,
            component: ClientView
        },
        {
            path: '/clients',
            name: 'clients',
            component: ClientListView
        },
        {
            path: '/clients/create',
            name: 'clients/create',
            component: ClientCreate
        },
        {
            path: '/orders/:id',
            name: 'orders/:id',
            props: true,
            component: OrderView
        },
        {
            path: '/orders',
            name: 'orders',
            component: OrderListView
        },
        {
            path: '/orders/create',
            name: 'orders/create',
            component: OrderCreateView
        },
    ]
})

export default router