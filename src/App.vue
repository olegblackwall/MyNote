<template>
	<main class="note-app">
		<Header 
            :is_loading="is_loading"
        />
		<div class="note-app__container">
            <router-view></router-view>
		</div>
        <modalCmp v-if="storeModal.currentComponent"/>
	</main>
</template>

<script lang="ts" setup>
import Header from '@/components/base/header-cmp.vue'
import modalCmp from '@/components/base/modal-cmp.vue'
import { useStoreModal } from '@/stores/modal'
import { useStoreAuth } from '@/stores/auth'
import { onMounted, ref } from 'vue'
import { checkServerStatus } from '@/api'
import { getUserInfo } from '@/api'
import { useCookies } from 'vue3-cookies'

const { cookies } = useCookies()
const storeModal = useStoreModal()
const storeAuth = useStoreAuth()

const is_loading = ref<boolean>(true)

const checkAuthStatus = async () => {
    try {
        const token = cookies.get('accessToken')

        if (!token) {
            storeAuth.logOut()
            return
        }

        const user_info = await getUserInfo()
        storeAuth.logIn(user_info.email)

    } catch (error) {
        console.error('Ошибка при проверке авторизации:', error)
        storeAuth.logOut()
    } finally {
        is_loading.value = false
    }
}


async function pingServer() {
    try {
        await checkServerStatus()
        console.log('Сервер доступен')
    } catch (error) {
        console.error('Сервер недоступен:', error)
    }
}

onMounted(() => {
    checkAuthStatus()
    pingServer()
})
</script>

<style lang="sass">
@use '@/assets/main.sass' as *

.note-app
    margin: 0 auto
    font-weight: normal
    padding: rem(0) rem(160)

    @media (max-width: $breakpoint-lg-max) and (min-width: $breakpoint-lg-min)
        padding: rem(0) rem(80)

    @media (max-width: $breakpoint-md-max) and (min-width: $breakpoint-md-min)
        padding: rem(0) rem(40)

    @media (max-width: $breakpoint-sm-max)
        padding: rem(0) rem(20)

    &__container
        display: flex
        flex-direction: column
        gap: rem(24)
        box-sizing: border-box
</style>
