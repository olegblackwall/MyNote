<template>
    <div class="input">
        <span class="input__title">{{ input_title }}</span>
        <input
            class="input__field"
            :class="{ '_fill-input': input_field_value.value.length }"
            :type="input_type"
            v-model="input_field_value.value"
            @input="setValue"
            v-bind="$attrs"
            :placeholder="placeholder"
            :maxlength="maxlength"
        />
        <div v-if="input_error.length || input_id === 'title'" class="input__message">
            <span v-if="input_error.length" class="input__message__error">{{ input_error }}</span>
            <span v-if="input_id === 'title'" class="input__message__counter">{{ counter }}/100</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, reactive, watch, computed } from 'vue'

const props = defineProps({
    input_id: {
        type: String
    },
    input_type: {
        type: String,
        default: 'text' // password //text
    },
    input_value: {
        type: String,
        default: ''
    },
    input_error: {
        type: String,
        default: 'Сообщение об ошибке'
    },
    placeholder: {
        type: String,
        default: 'Введите значение'
    },
    input_title: {
        type: String,
        default: 'Введите значение'
    },
    maxlength: {
        type: Number,
        default: 255
    },
})

const emit = defineEmits(['set_input']) 

const input_field_value = reactive({
    value: props.input_value
})

const counter = computed(() => input_field_value.value.length)

watch(() => props.input_value,
    (value) => {
        input_field_value.value = value
    }
)

const setValue = () =>  {
    emit('set_input', { value: input_field_value.value, id: props.input_id })
}
</script>

<style lang="sass" scoped>
@use '@/assets/main.sass' as *

.input
    display: flex
    flex-direction: column
    gap: rem(8)
    font-size: rem(18)
    font-weight: 400
    line-height: rem(28)
    width: 100%
    position: relative

    &__title
        color: $gray
        padding: rem(0) rem(24)

    &__field 
        width: 100%
        padding: rem(20) rem(58) rem(20) rem(28)
        border-radius: rem(36)
        font-size: rem(18)
        color: $dark
        transition: all .2s
        border: rem(2) solid $white

        &._fill-input
            color: $dark

        &:hover, &:focus
            border-color: $green-light

    &__message
        display: flex
        justify-content: space-between
        align-items: center
        width: 100%
        padding: rem(0) rem(24)

        @media (max-width: $breakpoint-sm-max)
            font-size: rem(14)

        &__error 
            color: $error

        &__counter
            color: $gray
            margin-left: auto
</style>
