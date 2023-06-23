<template>
    <form class="w-50 m-auto" method="post">
        <h2>Login</h2>
        <hr />

        <div class="form-floating mb-3">
            <input v-model="email" class="form-control" id="email" type="email" autoComplete="username" aria-required="true" placeholder="name@example.com" />
            <label htmlFor="email">Email</label>
        </div>

        <div class="form-floating mb-3">
            <input v-model="password" class="form-control" id="password" type="password" autoComplete="password" aria-required="true" placeholder="password" maxlength=100 />
            <label htmlFor="password">Password</label>
        </div>

        <button @click="event => onSubmit(event)" id="loginSubmit" class="w-100 btn btn-lg btn-primary">
            Login
        </button>
    </form>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { IdentityService } from '@/services/IdentityService'

let email: string = "";
let password: string = "";

const router = useRouter();
const identityService = new IdentityService();

const onSubmit = async (event: MouseEvent): Promise<void> =>
{
    event.preventDefault();

    const response = await identityService.login(email, password);

    if (response)
        router.push({ path: '/' })
}
</script>