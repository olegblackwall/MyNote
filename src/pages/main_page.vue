<template>
    <section class="main-page">
        <div class="main-page__text">
            <h1 class="main-page__text__title">Мои заметки</h1>
            <h3 class="main-page__text__subtitle">Не забывай о важном, храни его в облаке.</h3>
        </div>
        <img class="main-page__image" src="@/assets/img/main-img.svg" alt="writing-hand">
    </section>
</template>

<style lang="sass">
@use '@/assets/main.sass' as *

.main-page
    display: flex
    justify-content: space-between
    align-items: center
    width: 100%

    @media (max-width: $breakpoint-lg-max)
        justify-content: center

    @media (max-width: $breakpoint-md-max)
        flex-direction: column

    &__text
        display: flex
        flex-direction: column
        gap: rem(40)
        width: rem(642)

        @media (max-width: $breakpoint-md-max)
            justify-items: center
            align-items: center
            text-align: center

        @media (max-width: $breakpoint-sm-max)
            width: rem(320)
            gap: rem(0)


        &__title
            width: rem(488)
            font-size: rem(104)
            font-weight: 900
            line-height: rem(104)
            color: $white

            @media (max-width: $breakpoint-sm-max)
                width: rem(320)
                font-size: rem(60)
                line-height: rem(64)

        &__subtitle
            width: rem(394)
            font-size: rem(32)
            font-weight: 400
            line-height: rem(48)
            color: $gray

            @media (max-width: $breakpoint-md-max)
                width: 100%

            @media (max-width: $breakpoint-sm-max)
                font-size: rem(24)
                line-height: rem(36)

    &__image
        max-height: rem(864)
        min-height: rem(604)
        max-width: calc(100% - rem(642))
        width: auto
        height: auto
        object-fit: contain

        @media (max-width: $breakpoint-lg-max)
            min-height: rem(604)

        @media (max-width: $breakpoint-md-max)
            min-height: rem(540)
            max-width: 100%

        @media (max-width: $breakpoint-sm-max)
            min-height: rem(287)

</style>