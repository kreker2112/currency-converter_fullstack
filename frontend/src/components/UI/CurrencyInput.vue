<template>
    <div class="currency-input__container">
        <input
            v-focus
            :value="props.modelValue"
            class="input"
            type="number"
            placeholder="Input amount"
            @input="updateInput"
        />
        <ButtonComponent
            button-style="currency-input_cleanup"
            @click="clearInput"
        >
            Clear
        </ButtonComponent>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

const props = defineProps({
    modelValue: {
        type: [String, Number] as PropType<string | number>,
        required: true,
    },
});
const emit = defineEmits(['update:modelValue']);

const updateInput = (input: Event): void => {
    const inputValue = (input.target as HTMLInputElement).value;
    emit('update:modelValue', inputValue);
};

const clearInput = (): void => {
    emit('update:modelValue', '');
};
</script>

<style scoped lang="scss">
.currency-input__container {
    display: flex;
    flex-direction: row;
    gap: 0;
}

.input {
    @extend .currency-input__input;
}

.currency-input__input {
    position: relative;
    width: 100%;
    color: var(--input-color);
    background-color: var(--input-background-color);
    border: 2px solid var(--input-borders-color);
    padding: 10px 15px;
    border-radius: 10px 0 0 10px;
    font-size: 1rem;
    outline: none;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &[type='number'] {
        appearance: textfield;
    }
}
</style>
