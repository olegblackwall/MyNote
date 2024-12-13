<template>
    <form class="modal-auth" @submit.prevent="authorizationUser" novalidate>
        <div class="modal-auth__form" v-for="(input, input_id) in auth_form" :key="input_id">
            <inputCmp 
                :input_id="input.id"
                :input_value="input.value"
                :input_required="input.required"
                :input_type="input.type"
                :placeholder="input.placeholder"
                :input_title="input.input_title"
                :input_error="input.error"
                @set_input="setUserData"
                @blur="validCheck(input)"
            />
            <div class="modal-auth__form__eye"  @click="togglePassVisibility(input)">
                <img v-if="input.type === 'password'" src="@/assets/img/pass-show.svg" alt="pass-show">
                <img v-if="input.type === 'text'" src="@/assets/img/pass-hide.svg" alt="pass-hide">
            </div>
        </div>
        <div class="modal-auth__info">
            <span class="modal-auth__info__text">У вас нет аккаунта? <span class="modal-auth__info__text__link" @click="openRegistrationModal">Зарегистрируйтесь</span></span>
            <btnCmp 
                class="modal-auth__info__btn"
                :text="'Войти'"
                type="submit"
            />
            <span v-if="error_message.length" class="modal-auth__info__error">{{ error_message }}</span>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import inputCmp from '@/components/ui-components/input-cmp.vue'
import btnCmp from '@/components/ui-components/btn-cmp.vue'
import type { IForm } from '@/ts-interface/IForm'
import { useStoreModal } from '@/stores/modal'
import { authUser, getUserInfo } from '@/api'
import { useStoreAuth } from '@/stores/auth'

const storeModal = useStoreModal()
const storeAuth = useStoreAuth()
const router = useRouter() 

const auth_form = ref([
    {
        id: 'email',
        type: 'email',
        value: '',
        required: true,
        placeholder: 'Введите Email',
        valid: false,
        pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
        input_title: 'Email',
        error: ''
    },
    {
        id: 'password',
        type: 'password',
        value: '',
        required: true,
        placeholder: 'Введите пароль',
        pattern: '',
        valid: false,
        input_title: 'Пароль',
        error: ''
    },
]as Array<IForm>)

const error_message = ref<string>('')

const setUserData = (value: { id: string, value: string }) => {
    for (let i = 0; i < auth_form.value.length; i++) {
        if (auth_form.value[i].id === value.id) {
            auth_form.value[i].value = value.value
        }
    }
}

const validCheck = (input: IForm): boolean => {
    const regExp = new RegExp(input.pattern, 'i')

    if (input.value) {
        if (input.id === 'email' && !regExp.test(input.value)) {
            input.error = 'Введите корректный email'
            return false
        } else if (!regExp.test(input.value)) {
            input.error = 'Поле может содержать только латиницу, цифры и пробел'
            return false
        } else if (input.id === 'password' && (input.value.length < 4 || input.value.length > 12)) {
            input.error = 'Длина пароля от 4 до 12 символов'
            return false
        } else if (input.value.length > 255) {
            input.error = 'Максимальная длина поля 255 символов'
            return false
        } else {
            input.error = ""
            return true
        }
    } else if (!input.value.length && input.required) {
        input.error = 'Поле обязательно к заполнению'
        return false
    }
    return true
}

const authorizationUser = async () => {
    let user_valid = true as boolean
    const user_data: { email: string, password: string } = {
        email: '',
        password: ''
    }

    for (let input of auth_form.value) {
        validCheck(input)
        if (input.error) {
            user_valid = false
        }
    }

    if (!user_valid) {
        console.log('Форма содержит ошибки, исправьте их перед отправкой.')
        return
    }

    for (let item of auth_form.value) {
        user_data[item.id as keyof typeof user_data] = item.value
    }

    try {
        await authUser(user_data)
        const user_info = await getUserInfo()
        storeAuth.logIn(user_info.email)
        storeModal.closeModal()
        router.push('/noteboard')
    } catch (error) {
        if (error instanceof Error) {
            error_message.value = error.message
        }
    }
}

const openRegistrationModal = () => {
    storeModal.openModal({
        activeModal:'modalRegistrationCmp',
        modalTitle: 'Регистрация',
    })
}

const togglePassVisibility = (input: IForm) => {
    input.type === 'password' ? input.type = 'text' : input.type = 'password'
}
</script>

<style lang="sass" scoped>
@use '@/assets/main.sass' as *

.modal-auth
    display: flex
    flex-direction: column
    gap: rem(24)

    @media (max-width: $breakpoint-sm-max)
        gap: rem(16)
        
    &__form
        position: relative
        &__eye
            position: absolute
            top: rem(58)
            right: rem(22)
            width: rem(28)
            height: rem(28)
            display: flex
            justify-content: center
            align-items: center
            cursor: pointer

    &__info
        margin-top: rem(16)
        display: grid
        grid-template-columns: 1fr auto
        grid-template-rows: auto auto
        gap: rem(28)
        align-items: center

        @media (max-width: $breakpoint-sm-max)
            margin-top: rem(12)
            display: flex
            flex-direction: column
            gap: rem(12)

        &__text
            grid-column: 1 / 2
            grid-row: 1 
            font-size: rem(18)
            font-weight: 400
            line-height: rem(28)
            color: $gray

            @media (max-width: $breakpoint-sm-max)
                font-size: rem(14)

            &__link
                font-size: rem(18)
                font-weight: 700
                line-height: rem(28)
                color: $green-light
                cursor: pointer
                transition: all .2s
                &:hover
                    color: $white

                @media (max-width: $breakpoint-sm-max)
                    font-size: rem(14)
        
        &__btn
            grid-column: 2 / 3
            grid-row: 1

            @media (max-width: $breakpoint-sm-max)
                order: -1
                width: 100%

        &__error
            grid-column: 1 / -1
            grid-row: 2
            font-size: rem(18)
            font-weight: 400
            line-height: rem(28)
            color: $error
            border-radius: rem(24)
            background-color: #FF74611A
            padding: rem(8) 0 rem(8) rem(20)
            width: 100%

            @media (max-width: $breakpoint-sm-max)
                font-size: rem(14)
                padding: rem(6) rem(20)
</style>