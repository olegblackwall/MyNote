<template>
    <section class="noteboard">
        <div class="noteboard__notes">
            <noteCmp 
                v-for="(note, index) in notes" 
                :key="index" 
                :title="note.title" 
                :text="note.content" 
                :id="note.id"
            />
        </div>
        <btnCmp 
            class="noteboard__add-btn"
            :btn_type="'_plus'"
            @click="openAddNoteModal"
        />
    </section>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useStoreModal } from '@/stores/modal'
import { useNotesStore } from '@/stores/notes'
import noteCmp from '@/components/ui-components/note-cmp.vue'
import btnCmp from '@/components/ui-components/btn-cmp.vue'
import { getNotes } from '@/api'

const storeModal = useStoreModal()
const storeNotes = useNotesStore()

const notes = computed(() => storeNotes.notes)

// Метод загрузки заметок
const loadNotes = async () => {
    try {
        const notes_data = await getNotes()
        storeNotes.setNotes(notes_data)
    } catch (error) {
        console.error('Ошибка загрузки заметок:', error)
    }
}

const openAddNoteModal = () => {
    storeModal.openModal({
        activeModal:'modalNoteCmp',
        modalTitle: 'Добавление заметки',
    })
}

onMounted(() => {
    loadNotes()
})
</script>

<style lang="sass" scoped>
@use '@/assets/main.sass' as *

.noteboard
    position: relative
    &__notes
        display: grid
        grid-template-columns: repeat(3, minmax(rem(320), 1fr))
        gap: rem(40)
        @media (max-width: $breakpoint-lg-max)
            gap: rem(28)

        @media (max-width: $breakpoint-md-max)
            grid-template-columns: 1fr
            gap: rem(20)

    &__add-btn
        position: fixed
        bottom: rem(40)
        right: rem(40)

        @media (max-width: $breakpoint-lg-max)
            right: rem(12)

        @media (max-width: $breakpoint-md-max)
            right: rem(8)


</style>