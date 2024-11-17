<template>
    <div class="note">
        <div class="note__header">
            <h4 class="note__header__title">{{ title }}</h4>
        </div>
        <div class="note__content">
            <div class="note__content__text">{{ text }}</div>
            <btnCmp 
                class="note__content__btn"
                :text="'Удалить'"
                :btn_type="'_delete'"
                @click="handleDelete" 
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { deleteNote } from '@/api' 
import btnCmp from './btn-cmp.vue'
import { useNotesStore } from '@/stores/notes'

const props = defineProps({
    id: { 
        type: Number, 
        required: true 
    },
    title: {
        type: String,
        default: 'Заголовок'
    },
    text: {
        type: String,
        default: 'А также явные признаки победы институционализации могут быть объединены в целые кластеры себе подобных.'
    }
})

const storeNotes = useNotesStore()

// Обработчик для удаления заметки
const handleDelete = async () => {
    try {
        await deleteNote(props.id)
        storeNotes.removeNote(props.id)
    } catch (error) {
        console.error('Ошибка при удалении заметки:', error)
    }
}
</script>

<style lang="sass" scoped>
@use '@/assets/main.sass' as *

.note
    width: 100%
    color: $white
    &__header
        border-radius: rem(8) 0 0 0
        background-color: $green-light
        clip-path: polygon(0 0, calc(100% - rem(40)) 0, 100% rem(40), 100% 100%, 0% 100%)
        position: relative
        &::before
            content: ""
            position: absolute
            top: 0
            right: 0
            width: rem(40)
            height: rem(40)
            background-color: $green
            border-bottom-left-radius: rem(8)
            box-shadow: 0 rem(4) rem(6) rgba(0, 0, 0, 0.3)

        &__title
            font-size: rem(24)
            font-weight: 600
            line-height: rem(32)
            padding: rem(20) rem(56) rem(20) rem(28)

            @media (max-width: $breakpoint-sm-max)
                font-size: rem(20)
                line-height: rem(26)


    &__content
        display: flex
        flex-direction: column
        background-color: $green-light
        border-radius: 0 0 rem(8) rem(8)
        box-shadow: rem(0) rem(10) rem(8) rgba(0, 0, 0, 0.9)
        &__text
            padding: rem(20) rem(28) rem(28)
            border-top: rem(1) solid $green-middle
            font-size: rem(20)
            font-weight: 500
            line-height: rem(32)

            @media (max-width: $breakpoint-sm-max)
                font-size: rem(16)
                line-height: rem(24)

        &__btn
            margin: rem(8) rem(8) rem(8) auto
</style>