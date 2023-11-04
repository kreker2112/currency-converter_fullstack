<template>
    <input
        :value="modelValue"
        class="input"
        type="number"
        @input="updateInput"
    />
</template>

<script>
export default {
    name: 'CurrencyInput',
    props: {
        modelValue: {
            type: [String, Number],
            default: null,
            required: true,
        },
    },
    emits: ['update:modelValue'],

    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value)
        },
    },
}
</script>

<style scoped>
.input {
    width: 100%;
    border: 2px solid #18aa66;
    padding: 10px 15px;
    margin: 15px 0 0 0;
    border-radius: 10px;
    font-size: 16px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type='number'] {
    appearance: textfield; /* Firefox */
}
</style>
