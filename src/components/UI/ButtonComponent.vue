<template>
    <button :class="['button', buttonStyle]">
        <slot></slot>
    </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
export default defineComponent({
    name: 'ButtonComponent',
    props: {
        buttonStyle: {
            type: String as PropType<
                | ''
                | 'nav'
                | 'currency-input_cleanup'
                | 'cleanup-history'
                | 'currencies-list'
                | 'cancel-result'
            >,
            default: '',
        },
    },
});
</script>

<style scoped lang="scss">
.button {
    font-size: 1.5rem;
    width: 100%;
    height: 65px;
    border: 2px solid #18aa66;
    background-color: #18aa66;
    box-shadow: 2px 2px 2px #6ac054;
    padding: 15px;
    color: #fff;
    cursor: pointer;
    border-radius: 10px 5px 10px 5px;

    &:hover {
        background-color: #6ac054;
        box-shadow: 2px 2px 2px #18aa66;
        transform: scale(1.01);
        transition: all 0.9s;
    }

    &.nav-button {
        width: fit-content;
        height: fit-content;
        font-size: 1rem;
        border: none;
        background-color: #06998d;
        border-radius: 5px;
        padding: 10px 15px;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
            'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        box-shadow: 2px 2px 2px #a79e84bd;
        transition: all 0.9s;

        &:hover {
            background-color: #fff;
            color: #12c0b2;
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
            background-color: #6ac054;
        }
    }

    &.cleanup-history {
        margin-bottom: 15px;
        width: 150px;
        height: 30px;
        font-size: 12px;
        padding: 5px;

        &:hover {
            background-color: #6ac054;
            box-shadow: 2px 2px 2px #18aa66;
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
