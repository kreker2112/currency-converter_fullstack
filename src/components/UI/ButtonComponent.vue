<template>
    <button :class="['button', props.buttonStyle]">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
const props = defineProps({
    buttonStyle: {
        type: String,
        default: 'button',
    },
});
</script>

<style scoped lang="scss">
.button {
    font-size: 1.5rem;
    width: 100%;
    height: 65px;
    border: 2px solid var(--button-color);
    background-color: var(--button-color);
    box-shadow: 2px 2px 2px var(--box-shadow-color);
    padding: 15px;
    color: #fff;
    cursor: pointer;
    border-radius: 10px 5px 10px 5px;

    &:hover {
        background-color: var(--button-hover-color);
        box-shadow: 2px 2px 2px var(--button-hover-color);
        transform: scale(1.01);
        transition: all 0.9s;
    }

    &.nav-button {
        width: fit-content;
        height: fit-content;
        font-size: 1rem;
        border: 2px solid var(--button-color);
        background-color: var(--button-color);
        border-radius: 5px;
        padding: 10px 15px;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
            'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        box-shadow: 2px 2px 2px var(--box-shadow-color);
        transition: all 0.9s;

        &:hover {
            background-color: var(--button-hover-color);
            color: var(--nav-button-hover-text-color);
            box-shadow: 2px 2px 2px #a79e84bd;
        }
    }

    &.currency-input_cleanup {
        width: fit-content;
        height: fit-content;
        font-size: 1rem;
        border: none;
        padding: 10px 15px;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
            'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        transition: all 0.9s;
        border-radius: 0 10px 10px 0;
        box-shadow: none;

        &:hover {
            background-color: var(--button-hover-color);
        }
    }

    &.cleanup-history {
        margin-bottom: 15px;
        width: 150px;
        height: 30px;
        font-size: 12px;
        padding: 5px;

        &:hover {
            background-color: var(--button-hover-color);
            box-shadow: 2px 2px 2px var(--button-hover-color);
            transform: scale(1.01);
            transition: all 0.9s;
        }
    }

    &.currencies-list {
        margin-top: 20px;
        border-radius: 10px;
        width: 15em;
    }

    &.cancel-result {
        font-size: 25px;
        margin-top: 20px;
        border-radius: 10px;
        width: 13em;
    }
}
</style>
