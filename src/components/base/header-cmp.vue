<template>
    <header class="header">
        <img v-if="window_width < 768 && !storeNotes.notes.length && storeAuth.isAuth" src="@/assets/img/logo-small.svg" alt="logo"/>
        <img v-else src="@/assets/img/logo.svg" :class="{ 'header__logo': window_width < 768 && storeNotes.notes.length || window_width < 768&& !storeAuth.isAuth }" alt="logo"/>
        <btnCmp 
            v-if="!is_loading && !storeAuth.$state.isAuth"
            :text="'Вход'"
            :btn_type="'_auth'"
            @click="openAuthModal"
        />
        <div v-if="!is_loading && storeAuth.$state.isAuth" class="header__profile">
            <span v-if="window_width > 767 || (window_width < 768 && !storeNotes.notes.length)" class="header__profile__email">{{ storeAuth.email }}</span>
            <img class="header__profile__avatar" src="@/assets/img/profile.svg" alt="avatar" @click="toggleLogout">
            <div class="header__profile__logout-box" v-if="is_logout_visible">
                <span class="header__profile__logout-box__link" @click="logout">Выйти</span>
            </div>
        </div>

    </header>
</template>

<script lang="ts" setup>
import btnCmp from '@/components/ui-components/btn-cmp.vue'
import { defineProps, ref, onMounted, onBeforeUnmount } from 'vue'
import { useStoreModal } from '@/stores/modal'
import { useStoreAuth } from '@/stores/auth'
import { useNotesStore } from '@/stores/notes'

import { logoutUser } from '@/api'
import { useRouter } from 'vue-router' 

defineProps({
    is_loading: {
        type: Boolean,
        default: true
    }
})

const storeModal = useStoreModal()
const storeAuth = useStoreAuth()
const storeNotes = useNotesStore()

const router = useRouter() 

const is_logout_visible = ref<boolean>(false)
const window_width = ref<number>(window.innerWidth)

const updateWindowWidth = () => {
    window_width.value = window.innerWidth
}


const openAuthModal = () => {
    storeModal.openModal({
        activeModal:'modalAuthCmp',
        modalTitle: 'Вход в ваш аккаунт',
    })
}

const logout = async () => {
    try {
        await logoutUser()
        storeAuth.logOut()
        is_logout_visible.value = false
        router.push('/') 
    } catch (error) {
        console.error('Ошибка при выходе:', error)
    }
}

const toggleLogout = () => {
    is_logout_visible.value = !is_logout_visible.value
}

const handleClickOutside = (event: MouseEvent) => {
    const logout_element = document.querySelector('.header__profile__logout-box')
    const avatar_element = document.querySelector('.header__profile__avatar')
    if (logout_element && !logout_element.contains(event.target as Node) && avatar_element && !avatar_element.contains(event.target as Node)) {
        is_logout_visible.value = false
    }
}

onMounted(() => {
    window.addEventListener('resize', updateWindowWidth)
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateWindowWidth)
    document.removeEventListener('click', handleClickOutside)
})
</script>

<style lang="sass" scoped>
@use '@/assets/main.sass' as *

.header
    display: flex
    align-items: center
    justify-content: space-between
    padding: rem(43) rem(0)

    @media (max-width: $breakpoint-lg-max)
        padding: rem(23) rem(0)

    @media (max-width: $breakpoint-sm-max)
        padding: rem(20) rem(0)

    &__logo
        @media (max-width: $breakpoint-sm-max)
            width: rem(154)
            height: rem(36)


    &__profile
        position: relative
        display: flex
        flex-direction: row
        gap: rem(12)
        align-items: center
        &__email
            color: $white
            font-size: rem(18)
            font-weight: 400
            line-height: rem(28)
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis

        &__avatar
            cursor: pointer

            @media (max-width: $breakpoint-sm-max)
                width: rem(36)
                height: rem(36)

        &__logout-box
            position: absolute
            top: 135%
            right: -4%
            background-color: $dark-middle
            box-shadow: 0 rem(18) rem(40) rgba(0, 0, 0, 0.7)
            border-radius: rem(12)
            padding: rem(40)
            display: flex
            align-items: center
            justify-content: center
            z-index: 999
            &::before 
                content: ''
                position: absolute
                top: rem(-10)
                right: rem(20)
                transform: translateX(-50%)
                width: 0
                height: 0
                border-left: rem(10) solid transparent
                border-right: rem(10) solid transparent
                border-bottom: rem(10) solid $dark-middle
            
            &__link
                font-size: rem(18)
                font-weight: 700
                line-height: rem(28)
                cursor: pointer
                color: $green-light
                transition: all .2s
                &:hover
                    color: $white


</style>