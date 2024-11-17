// notesStore.ts
import { defineStore } from 'pinia'

export const useNotesStore = defineStore('notes', {
    state: () => ({
        notes: [] as { id: number; title: string; content: string }[],
    }),
    actions: {
        setNotes(newNotes: { id: number; title: string; content: string }[]) {
            this.notes = newNotes;
        },
        addNote(newNote: { id: number; title: string; content: string }) {
            this.notes.push(newNote);
        },
        removeNote(noteId: number) {
            this.notes = this.notes.filter((note) => note.id !== noteId);
        },
    },
    getters: {
        allNotes: (state) => state.notes,
    },
});
