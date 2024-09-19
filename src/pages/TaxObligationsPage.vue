<template>
    <div class="tax-obligations__container">
        <header class="tax-obligations__header">
            <h1 class="tax-obligations__title">Tax Obligations</h1>
            <div class="tax-obligations__controls">
                <select
                    v-model="selectedUser"
                    @change="onUserChange"
                    class="tax-obligations__select"
                >
                    <option disabled value="">User</option>
                    <option v-for="user in users" :key="user" :value="user">
                        {{ user }}
                    </option>
                </select>

                <select
                    v-model="selectedYear"
                    @change="onYearChange"
                    class="tax-obligations__select"
                    :disabled="availableYears.length === 0"
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

                <select
                    v-model="selectedQuarter"
                    @change="onQuarterChange"
                    class="tax-obligations__select"
                    :disabled="availableQuarters.length === 0"
                >
                    <option disabled value="">Quarter</option>
                    <option
                        v-for="quarter in availableQuarters"
                        :key="quarter"
                        :value="quarter"
                    >
                        Quarter {{ quarter }}
                    </option>
                </select>
            </div>
        </header>

        <!-- Добавляем проверку на выбранный квартал -->
        <div
            v-if="receipts.length > 0 && selectedQuarter"
            class="tax-obligations__receipts"
        >
            <h2>
                Receipts for Quarter {{ selectedQuarter }} of {{ selectedYear }}
            </h2>
            <ul>
                <li v-for="receipt in receipts" :key="receipt">
                    {{ receipt }}
                </li>
            </ul>
        </div>

        <!-- Добавляем проверку на выбранный квартал -->
        <table
            v-if="receipts.length > 0 && selectedQuarter"
            class="tax-obligations__table"
        >
            <thead>
                <tr>
                    <th>Line 06</th>
                    <th>Line 08</th>
                    <th>Line 11</th>
                    <th>Line 12</th>
                    <th>Line 13</th>
                    <th>Line 14</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ row06.toFixed(2) }} UAH</td>
                    <td>{{ row08.toFixed(2) }} UAH</td>
                    <td>{{ row11.toFixed(2) }} UAH</td>
                    <td>{{ row12.toFixed(2) }} UAH</td>
                    <td v-if="row13 !== null">{{ row13.toFixed(2) }} UAH</td>
                    <td>{{ row14.toFixed(2) }} UAH</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// Локальные состояния для управления выбором пользователя, года и квартала
const selectedUser = ref(store.getters['receipts/getSelectedUser'] || '');
const selectedYear = ref(store.getters['receipts/getSelectedYear'] || '');
const selectedQuarter = ref(store.getters['receipts/getSelectedQuarter'] || '');
const row06 = ref<number>(0);
const row08 = ref<number>(0);
const row11 = ref<number>(0);
const row12 = ref<number>(0);
const row13 = ref<number | null>(0);
const row14 = ref<number>(0);

const users = computed(() => store.state.receipts.users);
const availableYears = computed(
    () => store.getters['receipts/getAvailableYears'],
);
const availableQuarters = computed(
    () => store.getters['receipts/getAvailableQuarters'],
);
const receipts = computed(() => store.state.receipts.receipts);

onMounted(async () => {
    if (!users.value || users.value.length === 0) {
        await store.dispatch('receipts/fetchAllUsers');
    }

    if (selectedUser.value) {
        if (!availableYears.value || availableYears.value.length === 0) {
            await store.dispatch('receipts/fetchUserYears', selectedUser.value);
        }

        if (selectedYear.value) {
            await store.dispatch('receipts/fetchQuarters', {
                userId: selectedUser.value,
                year: selectedYear.value,
            });
        }

        if (selectedYear.value && selectedQuarter.value) {
            await onQuarterChange();
        }
    }
});

const onUserChange = async () => {
    store.commit('receipts/setSelectedUser', selectedUser.value);
    await store.dispatch('receipts/fetchUserYears', selectedUser.value);
    selectedYear.value = '';
    selectedQuarter.value = '';
    store.commit('receipts/setSelectedYear', selectedYear.value);
    store.commit('receipts/setSelectedQuarter', selectedQuarter.value);
};

const onYearChange = async () => {
    store.commit('receipts/setSelectedYear', selectedYear.value);
    await store.dispatch('receipts/fetchQuarters', {
        userId: selectedUser.value,
        year: selectedYear.value,
    });
    selectedQuarter.value = '';
    store.commit('receipts/setSelectedQuarter', selectedQuarter.value);
};

const onQuarterChange = async () => {
    if (!selectedYear.value || !selectedQuarter.value) {
        return;
    }

    store.commit('receipts/setSelectedQuarter', selectedQuarter.value);

    const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
    const currentQuarterIndex = quarters.indexOf(selectedQuarter.value);

    const previousQuartersReceipts =
        await fetchPreviousQuartersReceipts(currentQuarterIndex);
    const previousQuarterTotal = calculateTotalFromReceipts(
        previousQuartersReceipts,
    );

    row13.value = parseFloat((previousQuarterTotal * 0.05).toFixed(2));

    const currentQuarterReceipts = await fetchCurrentQuarterReceipts();
    const currentQuarterTotal = calculateTotalFromReceipts(
        currentQuarterReceipts,
    );

    setRowValues(currentQuarterTotal);

    row14.value = parseFloat((row12.value - (row13.value ?? 0)).toFixed(2));
};

const fetchPreviousQuartersReceipts = async (currentQuarterIndex: number) => {
    const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
    let previousQuartersReceipts: string[] = [];

    for (let i = 0; i < currentQuarterIndex; i++) {
        const previousQuarter = quarters[i];
        await store.dispatch('receipts/fetchPreviousQuartersReceipts', {
            userId: selectedUser.value,
            year: selectedYear.value,
            quarter: previousQuarter,
        });

        previousQuartersReceipts.push(
            ...store.state.receipts.previousQuartersReceipts.filter(
                (receipt: string) =>
                    !previousQuartersReceipts.includes(receipt),
            ),
        );
    }

    return previousQuartersReceipts;
};

const fetchCurrentQuarterReceipts = async () => {
    await store.dispatch('receipts/fetchReceipts', {
        userId: selectedUser.value,
        year: selectedYear.value,
        quarter: selectedQuarter.value,
    });

    return [...store.state.receipts.receipts];
};

const calculateTotalFromReceipts = (receipts: string[]) => {
    return receipts.reduce((sum: number, receipt: string) => {
        const match = receipt.match(/-(\s*\d+(\.\d+)?)\sUAH/);
        return match ? sum + parseFloat(match[1]) : sum;
    }, 0);
};

const setRowValues = (currentQuarterTotal: number) => {
    row06.value = currentQuarterTotal;
    row08.value = row06.value;
    row11.value = parseFloat((row06.value * 0.05).toFixed(2));
    row12.value = row11.value;
};
</script>

<style scoped lang="scss">
.tax-obligations__container {
    margin: 0 auto;
    max-width: 80vw;
    min-height: calc(100vh - 156px);
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
}

.tax-obligations__header {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;

    .tax-obligations__title {
        font-size: 2rem;
        color: var(--primary-color);
        font-family: 'Montserrat';
        margin-bottom: 10px;
    }
}

.tax-obligations__controls {
    display: flex;
    gap: 20px;

    .tax-obligations__select {
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

.tax-obligations__receipts {
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;

    h2 {
        font-size: 2rem;
        color: var(--primary-color);
        font-family: 'Montserrat';
        margin-bottom: 20px;
        text-align: center;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(35%, 1fr));
        justify-content: center;
        column-gap: 10px;
        text-align: center;
        width: 100%;

        li {
            font-family: 'Montserrat';
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid var(--primary-color);
            border-radius: 5px;
            background-color: var(--input-background-color);
            box-shadow: 2px 2px 5px var(--box-shadow-color);
        }
    }
}

.tax-obligations__table {
    margin-top: 30px;
    width: 100%;
    th,
    td {
        border: 2px solid var(--primary-color);
        padding: 12px;
        font-family: 'Montserrat', sans-serif;
        font-size: 1.1rem;
        text-align: center;
    }

    th {
        background-color: var(--primary-color);
        font-weight: 600;
        text-transform: uppercase;
    }
}
</style>
