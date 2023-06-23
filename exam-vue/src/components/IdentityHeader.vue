<template>
    <template v-if="identityStore.JWTResponse">
        <li class="nav-item">
            <RouterLink to="/" class="nav-link text-white fw-lighter">
                Welcome, {{ firstName }}!
            </RouterLink>
        </li>

        <li class="nav-item">
            <RouterLink to="/" @click="logout()" class="nav-link text-white">
                Logout
            </RouterLink>
        </li>
    </template>

    <template v-else>
        <li class="nav-item">
            <RouterLink to="/register" class="nav-link text-white">Register</RouterLink>
        </li>

        <li class="nav-item">
            <RouterLink to="/login" class="nav-link text-white">Login</RouterLink>
        </li>
    </template>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { IdentityService } from '@/services/IdentityService'
import { useIdentityStore } from '@/stores/identity'
import jwt_decode from "jwt-decode"

const email = ref<string>("email");
const firstName = ref<string>("firstName");
const lastName = ref<string>("lastName");

const router = useRouter();
const identityStore = useIdentityStore();
const identityService = new IdentityService();

watch(() => identityStore.JWTResponse, (newJWTResponse) =>
{
    if (!newJWTResponse)
        return;

    const jwtObject: any = jwt_decode(newJWTResponse.jwt);

    email.value = jwtObject['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    firstName.value = jwtObject['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'];
    lastName.value = jwtObject['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'];
});

const logout = async (): Promise<void> =>
{
    const response = await identityService.logout();

    if (response)
        router.push({ path: '/' });
}
</script>