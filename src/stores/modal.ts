import { defineStore } from 'pinia'
import modalAuthCmp from '@/components/base/modal-auth-cmp.vue'
import modalRegistrationCmp from '@/components/base/modal-registraton-cmp.vue'
import modalNoteCmp from '@/components/base/modal-note-cmp.vue'
import type { Component } from 'vue'

const modalComponents = {
    modalAuthCmp,
    modalRegistrationCmp,
    modalNoteCmp
} as const

export const useStoreModal = defineStore('modal', {
    state: () => ({
        activeModal: undefined as keyof typeof modalComponents | undefined,
        modalTitle: null as string | null,
    }),
    getters: {
        currentComponent: (state): Component | null => {
            return state.activeModal ? modalComponents[state.activeModal] : null
        },
        // currentModalTitle: (state): string | null => {
        //     return state.modalTitle
        // },
    },
    actions: {
        openModal(payload: { modalTitle: string, activeModal: keyof typeof modalComponents }) {
            this.modalTitle = payload.modalTitle
            this.activeModal = payload.activeModal
        },
        closeModal() {
            this.modalTitle = null
            this.activeModal = undefined
        }
    }
})
