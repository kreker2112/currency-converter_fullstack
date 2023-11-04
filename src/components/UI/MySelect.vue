<template>
    <select class="select__list" :value="modelValue" @change="changeOption">
        <option disabled value="">Выберите из списка</option>
        <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
        >
            {{ option.name }}
        </option>
    </select>
</template>

<script>
export default {
    name: 'my-select',

    props: {
        modelValue: {
            type: String,
            default: '',
        },
        options: {
            type: Array,
            default: () => [],
        },
    },
    emits: ['update:modelValue'],
    methods: {
        changeOption(event) {
            this.$emit('update:modelValue', event.target.value)
        },
    },
}
</script>

<style scoped>
.select__list {
    margin: 0 auto;
    width: 200px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #24e25d;
    font-size: 1rem;
    cursor: pointer;
}
</style>
