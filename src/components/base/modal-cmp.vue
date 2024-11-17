<template>
    <div class="modal">
        <div @click="closeModal()" class="modal__shadow"></div>
        <div class="modal__container">
            <h2 class="modal__container__title">{{ storeModal.modalTitle }}</h2>
            <btnCmp 
                class="modal__container__close-btn"
                :btn_type="'_cross'"
                @click="closeModal()"
            />
            <div class="modal__container__content">
                <component :is="storeModal.currentComponent"></component>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import btnCmp from '@/components/ui-components/btn-cmp.vue'
import { useStoreModal } from '@/stores/modal'
import { onUnmounted } from 'vue'

    const storeModal = useStoreModal()

    const closeModal = () => {
        storeModal.closeModal()
    }

    onUnmounted(() => {
        storeModal.$reset()
    })
</script>

<style lang="sass" scoped>
@use '@/assets/main.sass' as *

.modal
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    width: 100vw
    display: flex
    align-items: center
    justify-content: center
    &__shadow
        height: 100%
        width: 100%
        position: absolute
        background: rgba($dark, .5)

    &__container        
        display: flex
        flex-direction: column
        gap: rem(40)
        width: rem(780)
        padding: rem(80)
        border-radius: rem(40)
        background-color: $dark-middle
        z-index: 1
        position: relative

        @media (max-width: $breakpoint-lg-max)
            width: rem(594)
            padding: rem(56)

        @media (max-width: $breakpoint-md-max)
            width: rem(688)

        @media (max-width: $breakpoint-sm-max)
            width: rem(352)
            gap: rem(28)
            padding: rem(24) rem(16)
            max-height: calc(100% - rem(8))
            justify-content: center

        &__title
            font-size: rem(48)
            font-weight: 600
            line-height: rem(72)
            color: $white

            @media (max-width: $breakpoint-lg-max) and (min-width: $breakpoint-lg-min)
                width: rem(482)

            @media (max-width: $breakpoint-sm-max)
                font-size: rem(32)
                line-height: rem(36)

        &__close-btn
            position: absolute
            top: rem(20)
            right: rem(20)

            @media (max-width: $breakpoint-sm-max)
                top: rem(12)
                right: rem(12)

</style>