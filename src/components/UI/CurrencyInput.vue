<template>
    <div class="input__container">
        <input
            v-focus
            :value="modelValue"
            class="input"
            type="number"
            placeholder="Введите сумму"
            @input="updateInput"
        />
        <small-button @click="clearInput"> Очистить </small-button>
    </div>
</template>

<script>
export default {
    name: 'CurrencyInput',
    props: {
        modelValue: {
            type: [String, Number],
            default: '',
            required: true,
        },
    },
    emits: ['update:modelValue', 'clearInput'],

    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value)
        },
        clearInput() {
            this.$emit('update:modelValue', '')
        },
    },
}
</script>

<style scoped>
.input {
    position: relative;
    width: 100%;
    border: 2px solid #18aa66;
    padding: 10px 15px;
    border-radius: 10px 0 0 10px;
    font-size: 16px;
    outline: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type='number'] {
    appearance: textfield; /* Firefox */
}

.input__container {
    display: flex;
    flex-direction: row;
    gap: 0;
}
</style>
