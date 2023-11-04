<template>
    <input :value="modelValue" class="input" type="text" @input="updateInput" />
</template>

<script>
export default {
    name: 'my-input',
    props: {
        modelValue: {
            type: [String, Number],
            default: '',
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
    size: 30;
}
</style>
