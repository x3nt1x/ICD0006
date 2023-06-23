<template>
    <Header />

    <div class="container pb-5">
        <main role="main" class="pb-4">
            <RouterView />
        </main>
    </div>

    <Footer />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
</script>