<template>
	  <button class="btn" :class="btn_type" :disabled="disabled">
        <img v-if="btn_type === '_auth'" src="@/assets/img/auth.svg" alt="arrow">
        <img v-if="btn_type === '_cross' || btn_type === '_delete'" src="@/assets/img/cross.svg" alt="cross">
        <img v-if="btn_type === '_plus'" src="@/assets/img/plus.svg" alt="plus">
		<span v-if="btn_type === '_primary' || btn_type === '_delete' || btn_type === '_auth'" class="btn__text">{{ text }}</span>
	</button>
</template>

<script lang="ts" setup>
import { defineProps } from "vue"

	defineProps({
		text: {
			type: String,
			default: "Button",
		},
		btn_type: {
			type: String,
			default: "_primary", // _primary // _cross // _plus // _delete //_auth
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	})
</script>

<style lang="sass">
@use '@/assets/main.sass' as *

.btn
    padding: rem(12) rem(24)
    cursor: pointer
    transition: all .2s
    user-select: none
    height: rem(56)
    border-radius: rem(32)
    display: flex 
    align-items: center
    justify-content: center
    gap: rem(12)
    background-color: $green-light
    &__text
        color: $white
    
    &._cross, &._plus
        padding: rem(0)
        width: rem(56)

    &._plus
        box-shadow: 0 0 rem(26) rgba(0, 0, 0, 0.6)

    &:hover 
        background-color: $green-middle

    &:active 
        background-color: $green-dark

    &._delete
        &:hover, &:active 
            background-color: $green-light
            .btn__text
                transition: all .2s
                opacity: .7
            
            img
                transition: all .2s
                opacity: .7

            

    &:disabled
        pointer-events: none
        background-color: $gray
        transition: all .2s
</style>
