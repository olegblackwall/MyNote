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
        <div class="modal-note__info">
            <btnCmp 
                class="modal-note__info__btn"
                :text="'Добавить'"
                type="submit"
            />
            <span v-if="error_message.length" class="modal-note__info__error">{{ error_message }}</span>
        </div>
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

const storeModal = useStoreModal()
const storeNotes = useNotesStore()

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

const error_message = ref<string>('')

const setInput = (payload: { value: string, id: string }) => {
    input.value.value = payload.value
}

const setTextarea = (value: string) => {
    textarea.value.value = value
}

const handleSubmit = async () => {
    let isValid = true

    if (!input.value.value) {
        input.value.error = 'Введите название заметки'
        isValid = false
    } else {
        input.value.error = '' 
    }

    if (!textarea.value.value) {
        textarea.value.textarea_error = 'Введите текст заметки'
        isValid = false
    } else {
        textarea.value.textarea_error = ''
    }

    if (!isValid) return

    try {
        const new_note = await createNote(input.value.value, textarea.value.value)
        console.log(new_note, 'input.value.value, textarea.value.value');
        storeNotes.addNote(new_note)
        storeModal.closeModal()
        input.value.value = ''
        textarea.value.value = ''
    } catch (error) {
        if (error instanceof Error) {
            error_message.value = error.message
        }
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

    &__info
        margin-top: rem(16)
        display: flex
        flex-direction: column
        gap: rem(20)

        @media (max-width: $breakpoint-sm-max)
            margin-top: rem(12)
            gap: rem(12)

        &__btn
            margin-left: auto
            @media (max-width: $breakpoint-sm-max)
                margin-left: 0
                width: 100%

        &__error
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