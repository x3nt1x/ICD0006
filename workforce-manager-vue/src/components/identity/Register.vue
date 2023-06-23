<template>
    <form class="w-50 m-auto" method="post"
        oninput="confirmPassword.setCustomValidity(password.value != confirmPassword.value ? 'error' : '')"
        @input="checkValidity">
        <h2>Create a new account.</h2>
        <hr />

        <div class="form-floating mb-3">
            <input v-model="email" class="form-control" id="email" type="email" autoComplete="username" placeholder="name@example.com" required />
            <label htmlFor="email">Email</label>

            <div class="invalid-feedback">
                Please enter a valid email.
            </div>
        </div>

        <div class="form-floating mb-3">
            <input v-model="password" class="form-control" id="password" type="password" autoComplete="password" placeholder="password" maxlength=100 required />
            <label htmlFor="password">Password</label>

            <div class="invalid-feedback">
                Password length must be greater than 8, contain 1 uppercase letter, 1 number and 1 special character.
            </div>
        </div>

        <div class="form-floating mb-3">
            <input v-model="confirmPassword" class="form-control" id="confirmPassword" type="password" autoComplete="password" placeholder="password" maxlength=100 required />
            <label htmlFor="confirmPassword">Confirm Password</label>

            <div class="invalid-feedback">
                Passwords must match.
            </div>
        </div>

        <div class="form-floating mb-3">
            <input v-model="firstName" class="form-control" id="firstName" type="text" autoComplete="firstname" placeholder="first name" maxlength=32 required />
            <label htmlFor="firstName">First name</label>

            <div class="invalid-feedback">
                Please enter a first name.
            </div>
        </div>

        <div class="form-floating mb-3">
            <input v-model="lastName" class="form-control" id="lastName" type="text" autoComplete="lastname" placeholder="last name" maxlength=32 required />
            <label htmlFor="lastName">Last name</label>

            <div class="invalid-feedback">
                Please enter a last name.
            </div>
        </div>

        <button @click="event => onSubmit(event)" id="registerSubmit" class="w-100 btn btn-lg btn-primary">Register
        </button>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { IdentityService } from '@/services/IdentityService'

const email = ref<string>("");
const password = ref<string>("");
const confirmPassword = ref<string>("");
const firstName = ref<string>("");
const lastName = ref<string>("");

// https://stackoverflow.com/a/21456918
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._;:])[A-Za-z\d@$!%*?&._;:]{8,}$/;

const router = useRouter()
const identityService = new IdentityService();

const onSubmit = async (event: MouseEvent): Promise<void> =>
{
    event.preventDefault();

    document.getElementsByTagName("form")[0].classList.add("was-validated");

    if (email.value.length === 0 ||
        firstName.value.length === 0 ||
        lastName.value.length === 0 ||
        password.value.length < 8 ||
        password.value !== confirmPassword.value)
        return;

    const response = await identityService.register(email.value, password.value, firstName.value.trim(), lastName.value.trim());

    if (response)
        router.push({ path: '/' })
}

const checkValidity = (): void =>
{
    const passwordInput = document.getElementById('password') as HTMLInputElement;

    const isValid = passwordRegex.test(passwordInput.value)

    passwordInput.setCustomValidity(!isValid ? 'error' : '');
}
</script>