<template>
    <header>
        <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-dark bg-dark border-bottom box-shadow mb-3">
            <div class="container">
                <RouterLink to="/" class="navbar-brand text-bold">App |</RouterLink>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">

                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                    <ul v-if="identityStore.JWTResponse" class="navbar-nav flex-grow-1">
                        <li class="nav-item">
                            <RouterLink to="/items" class="nav-link text-white">Items</RouterLink>
                        </li>

                        <li class="nav-item">
                            <RouterLink to="/jobs" class="nav-link text-white">Jobs</RouterLink>
                        </li>

                        <li class="nav-item">
                            <RouterLink to="/repairs" class="nav-link text-white">Repairs</RouterLink>
                        </li>
                    </ul>
                </div>

                <ul class="navbar-nav">
                    <IdentityHeader />
                </ul>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { useIdentityStore } from '@/stores/identity'
import IdentityHeader from '@/components/IdentityHeader.vue'

const identityStore = useIdentityStore();
</script>