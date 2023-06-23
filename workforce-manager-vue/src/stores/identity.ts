import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type IJWTResponse } from '@/domain/identity/IJWTResponse'

export const useIdentityStore = defineStore('identity', () =>
{
    const JWTResponse = ref<IJWTResponse | undefined>(undefined)

    const setJwtResponse = (val: IJWTResponse | undefined) => JWTResponse.value = val;

    return { JWTResponse, setJwtResponse }
})