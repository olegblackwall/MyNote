<template>
    <div class="textarea">
        <span class="textarea__title">{{ textarea_title }}</span>
        <textarea
            class="textarea__field"
            :class="{ '_fill-textarea': textarea_field_value.value.length }"
            v-model="textarea_field_value.value"
            @input="setValue"
            v-bind="$attrs"
            :placeholder="placeholder"
            :maxlength="500"
        />
        <div class="textarea__message">
            <span v-if="textarea_error.length" class="textarea__message__error">{{ textarea_error }}</span>
            <span class="textarea__message__counter">{{ counter }}/500</span>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, reactive, watch, computed } from 'vue'

    const props = defineProps({
        textarea_title: {
            type: String,
            default: 'Введите значение'
        },
        textarea_value: {
            type: String,
            default: ''
        },
        textarea_error: {
            type: String,
            default: 'Сообщение об ошибке'
        },
        placeholder: {
            type: String,
            default: 'Введите значение'
        }
    })

    const emit = defineEmits(['set_textarea']) 

    const textarea_field_value = reactive({
        value: props.textarea_value
    })

    const counter = computed(() => textarea_field_value.value.length)

    watch(() => props.textarea_value,
        (value) => {
            textarea_field_value.value = value
        }
    )

    const setValue = () => {
        emit('set_textarea', textarea_field_value.value)
    }
</script>

<style lang="sass" scoped>
@use '@/assets/main.sass' as *

.textarea
    display: flex
    flex-direction: column
    font-size: rem(18)
    font-weight: 400
    gap: rem(8)
    line-height: rem(28)
    width: 100%
    height: rem(316)

    @media (max-width: $breakpoint-lg-max)
        height: rem(240)

    &__title
        color: $gray
        padding: rem(0) rem(24)
    &__field 
        width: 100%
        height: rem(280)
        padding: rem(16) rem(28)
        border-radius: rem(36)
        font-size: rem(18)
        color: $dark
        transition: all .2s
        border: rem(2) solid $white
        resize: none
        overflow: auto
        clip-path: inset(0 round rem(36))

        &._fill-textarea
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