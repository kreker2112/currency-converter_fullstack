export default {
    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['update:show'],
    methods: {
        hideDialog() {
            this.$emit('update:show', false)
        },
    },
}
