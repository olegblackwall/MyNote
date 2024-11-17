// store/auth.ts
import { defineStore } from 'pinia'

export const useStoreAuth = defineStore('auth', {
    state: () => ({
        isAuth: false,
        email: '',
    }),
    actions: {
        logIn(email: string) {
            this.isAuth = true
            this.email = email
        },
        logOut() {
            this.isAuth = false
            this.email = ''
        },
    },
})
