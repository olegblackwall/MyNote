<template>
    <form class="modal-note" @submit.prevent="handleSubmit" novalidate>
        <inputCmp 
            :input_id="input.id"
            :input_value="input.value"
            :input_required="input.required"
            :input_type="input.type"
            :placeholder="input.placeholder"
            :input_title="input.input_title"
            :input_error="input.error"
            :maxlength="input.maxlength"
            @set_input="setInput"
        />
        <textareaCmp 
            :placeholder="textarea.placeholder"
            :textarea_title="textarea.textarea_title"
            :textarea_error="textarea.textarea_error"
            @set_textarea="setTextarea"
        />
        <btnCmp 
            class="modal-note__btn"
            :text="'Добавить'"
            type="submit"
        />
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import inputCmp from '@/components/ui-components/input-cmp.vue'
import textareaCmp from '@/components/ui-components/textarea-cmp.vue'
import btnCmp from '@/components/ui-components/btn-cmp.vue'
import { useStoreModal } from '@/stores/modal'
import { useNotesStore } from '@/stores/notes'
import { createNote } from '@/api'

// Управление модальным окном
const storeModal = useStoreModal()
const storeNotes = useNotesStore()

// Поля ввода для заголовка
const input = ref({
    id: 'title',
    type: 'text',
    value: '',
    required: true,
    placeholder: 'Введите название',
    valid: false,
    input_title: 'Название заметки',
    error: '',
    maxlength: 100,
})

// Поля ввода для текста заметки
const textarea = ref({
    id: 'text',
    type: 'text',
    value: '',
    required: true,
    placeholder: 'Введите текст',
    valid: false,
    textarea_title: 'Текст заметки',
    textarea_error: '',
})

// Функция обновления значения заголовка
const setInput = (payload: { value: string, id: string }) => {
    input.value.value = payload.value.trim()
}

// Функция обновления значения текста
const setTextarea = (value: string) => {
    textarea.value.value = value.trim()
}

// Обработка отправки формы
const handleSubmit = async () => {
    let isValid = true

    if (!input.value.value.trim()) {
        input.value.error = 'Введите название заметки'
        isValid = false
    } else {
        input.value.error = '' 
    }

    if (!textarea.value.value.trim()) {
        textarea.value.textarea_error = 'Введите текст заметки'
        isValid = false
    } else {
        textarea.value.textarea_error = ''
    }

    if (!isValid) return

    try {
        const new_note = await createNote(input.value.value, textarea.value.value)
        storeNotes.addNote(new_note)
        storeModal.closeModal()
        input.value.value = ''
        textarea.value.value = ''
    } catch (error) {
        console.error('Ошибка при создании заметки:', error)
    }
}
</script>


<style lang="sass" scoped>
@use '@/assets/main.sass' as *

.modal-note
    display: flex
    flex-direction: column
    gap: rem(24)

    @media (max-width: $breakpoint-sm-max)
        gap: rem(16)

    &__btn
        margin: rem(16) 0 0 auto

        @media (max-width: $breakpoint-sm-max)
            margin-top: rem(12)
            width: 100%
</style>