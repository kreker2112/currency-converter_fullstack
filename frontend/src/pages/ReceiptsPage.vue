<template>
    <div class="entering-funds__container">
        <header class="entering-funds__header">
            <h1 class="entering-funds__title">Income data</h1>
            <UniversalSelectComponent
                v-model="selectedUser"
                :showQuarter="false"
            />
        </header>

        <QuarterListComponent />

        <ModalReceipt
            v-if="showModal"
            @close="closeModal"
            @receiptAdded="onReceiptAdded"
        />

        <ButtonComponent
            button-style="add-funds-button"
            v-if="selectedUser"
            @click="openModal"
        >
            Add receipt
        </ButtonComponent>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ModalReceipt from '@/components/ModalReceipt.vue';
import ButtonComponent from '@/components/UI/ButtonComponent.vue';

const showModal = ref(false);
const selectedUser = ref('');

const openModal = () => {
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
};

const onReceiptAdded = () => {
    showModal.value = false;
};
</script>

<style scoped lang="scss">
.entering-funds__container {
    margin: 0 auto;
    max-width: 100vw;
    height: calc(100vh - 156px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 20px;
    position: relative;
}

.entering-funds__header {
    position: absolute;
    top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    width: 100%;
    padding: 10px;

    .entering-funds__title {
        font-size: 2rem;
        color: var(--primary-color);
        font-family: 'Montserrat';
        margin-bottom: 10px;
    }
}
</style>
