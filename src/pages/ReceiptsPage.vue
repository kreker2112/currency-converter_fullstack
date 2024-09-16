<template>
    <div class="entering-funds__container">
        <header class="entering-funds__header">
            <h1 class="entering-funds__title">Income data</h1>
            <div class="entering-funds__controls">
                <select
                    v-model="selectedUser"
                    class="entering-funds__select"
                    @change="setUser"
                >
                    <option disabled value="">User</option>
                    <option v-for="user in users" :key="user" :value="user">
                        {{ user }}
                    </option>
                </select>

                <select
                    v-model="selectedYear"
                    class="entering-funds__select"
                    :disabled="availableYears.length === 0"
                    @change="filterByYear"
                >
                    <option disabled value="">Year</option>
                    <option
                        v-for="year in availableYears"
                        :key="year"
                        :value="year"
                    >
                        {{ year }}
                    </option>
                </select>
            </div>
        </header>

        <div class="entering-funds__quarters">
            <div
                v-for="(quarter, index) in receiptsData"
                :key="index"
                class="entering-funds__quarter"
            >
                <h2 class="entering-funds__quarter-title">
                    {{ quarter.QuarterName }}
                </h2>
                <ul class="entering-funds__list">
                    <li
                        v-for="receipt in quarter.Receipts"
                        :key="receipt"
                        class="entering-funds__list-item"
                    >
                        {{ receipt }}
                    </li>
                </ul>

                <div class="entering-funds__quarter-total">
                    Total for {{ quarter.QuarterName }}:
                    {{ getQuarterTotal(quarter.Receipts) }} UAH
                </div>
            </div>
        </div>

        <ModalReceipt
            v-if="showModal"
            @close="closeModal"
            @receiptAdded="onReceiptAdded"
        />

        <ButtonComponent
            button-style="add-funds-button"
            v-if="selectedUser"
            @click="openModal"
            class="floating-button"
        >
            Add receipt
        </ButtonComponent>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import ModalReceipt from '@/components/ModalReceipt.vue';
import ButtonComponent from '@/components/UI/ButtonComponent.vue';

const store = useStore();
const showModal = ref(false);
const selectedUser = ref('');
const selectedYear = ref('');
const availableYears = ref<number[]>([]);
const users = ref<string[]>([]);
const receiptsData = ref<any[]>([]);

onMounted(async () => {
    try {
        const response = await axios.get(process.env.VUE_APP_GETALLUSERS_URL);
        users.value = response.data;
    } catch (error) {
        console.error('Error loading users:', error);
    }
});

const setUser = () => {
    store.commit('receipts/setSelectedUser', selectedUser.value);
    filterByUser();
};

const filterByUser = async () => {
    selectedYear.value = '';
    receiptsData.value = [];
    if (selectedUser.value) {
        try {
            const url = `${process.env.VUE_APP_GETUSERDATA_URL}${selectedUser.value}/years`;
            const response = await axios.get(url);
            availableYears.value = response.data;
        } catch (error) {
            console.error('Error loading years:', error);
        }
    }
};

const sortReceiptsByDate = (receipts: string[]): string[] => {
    return receipts.sort((a, b) => {
        const dateA = new Date(
            a.split(':')[0].trim().split('.').reverse().join('-'),
        );
        const dateB = new Date(
            b.split(':')[0].trim().split('.').reverse().join('-'),
        );
        return dateA.getTime() - dateB.getTime();
    });
};

const groupReceiptsByQuarter = (receipts: string[]): any[] => {
    const quarters: string[][] = [[], [], [], []];

    receipts.forEach((receipt) => {
        const receiptDate = new Date(
            receipt.split(':')[0].trim().split('.').reverse().join('-'),
        );
        const month = receiptDate.getMonth();
        const quarter = Math.floor(month / 3);

        quarters[quarter].push(receipt);
    });

    return quarters.map((quarterReceipts, index) => ({
        QuarterName: `Q${index + 1}`,
        Receipts: quarterReceipts,
    }));
};

const filterByYear = async () => {
    if (selectedUser.value && selectedYear.value) {
        try {
            const url = `${process.env.VUE_APP_GETUSERDATA_URL}${selectedUser.value}/receipts?year=${selectedYear.value}`;
            const response = await axios.get(url);

            const sortedReceipts = response.data.map((quarter: any) => ({
                ...quarter,
                Receipts: sortReceiptsByDate(quarter.Receipts),
            }));

            receiptsData.value = groupReceiptsByQuarter(
                sortedReceipts.flatMap((quarter: any) => quarter.Receipts),
            );
        } catch (error) {
            console.error('Error loading receipts data:', error);
        }
    }
};

const getQuarterTotal = (receipts: string[]): string => {
    const total = receipts.reduce((sum, receipt) => {
        const uahAmountMatch = receipt.match(/(\d+(\.\d+)?)\sUAH/);
        if (uahAmountMatch) {
            const uahAmount = parseFloat(uahAmountMatch[1]);
            return sum + uahAmount;
        }
        return sum;
    }, 0);

    return total.toFixed(2);
};

const openModal = () => {
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
};

const onReceiptAdded = () => {
    showModal.value = false;
    filterByYear();
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

    .entering-funds__controls {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;

        .entering-funds__select {
            color: var(--input-color);
            background-color: var(--input-background-color);
            width: 150px;
            padding: 10px;
            font-size: 1.2rem;
            border: 2px solid var(--input-borders-color);
            border-radius: 5px;
            outline: none;
            cursor: pointer;

            option {
                cursor: pointer;
            }
        }
    }
}

.entering-funds__quarters {
    position: absolute;
    top: 20vh;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    width: 100%;
    padding: 20px;

    .entering-funds__quarter {
        width: calc(25% - 20px);
        background-color: var(--background-color);
        border-radius: 10px;
        padding: 10px;

        .entering-funds__quarter-title {
            font-family: 'Montserrat';
            font-size: 1.5rem;
            color: var(--primary-color);
            margin-bottom: 10px;
            text-align: center;
        }

        .entering-funds__list {
            list-style: none;
            padding: 0;
            text-align: center;

            .entering-funds__list-item {
                font-family: 'Montserrat';
                display: inline-block;
                padding: 10px;
                margin-bottom: 10px;
                border: 1px solid var(--primary-color);
                border-radius: 5px;
                background-color: var(--input-background-color);
                box-shadow: 2px 2px 5px var(--box-shadow-color);
            }
        }

        .entering-funds__quarter-total {
            font-family: 'Montserrat';
            font-weight: bold;
            font-size: 1.4rem;
            margin-top: 20px;
            padding: 10px;
            text-align: center;
            color: #ffffff;
            background-color: var(--primary-color);
            border-radius: 8px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        }
    }
}

.floating-button {
    position: absolute;
    width: 200px;
    bottom: 40px;
    right: 40px;
    background-color: var(--primary-color);
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1.3rem;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    &:hover {
        background-color: var(--secondary-color);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    }
}
</style>
