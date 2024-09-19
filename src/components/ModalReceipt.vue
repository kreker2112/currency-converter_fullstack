<template>
    <div class="modal-overlay" v-if="showModal">
        <div class="modal-content">
            <h2 class="modal-title">Add receipt</h2>
            <ModalInput @submit="acceptReceipt" @cancel="closeModal" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const emit = defineEmits(['close', 'receiptAdded']);
const showModal = ref(true);

const acceptReceipt = async (formData: {
    amount: string;
    currency: string;
    date: string;
    quarter: number;
}) => {
    try {
        await store.dispatch('receipts/sendReceipt', {
            selectedUser: store.getters['receipts/getSelectedUser'],
            amount: formData.amount,
            currency: formData.currency,
            date: formData.date,
            quarter: formData.quarter,
        });
        emit('receiptAdded');
        closeModal();
    } catch (error) {
        console.error('Error sending receipt:', error);
    }
};

const closeModal = () => {
    emit('close');
};
</script>

<style scoped lang="scss">
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: var(--primary-color);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 400px;
    text-align: center;
    border: 2px solid var(--primary-color);

    .modal-title {
        font-size: 1.8rem;
        margin-bottom: 20px;
        color: var(--text-color);
        font-family: 'Lucida Sans', sans-serif;
    }
}
</style>
