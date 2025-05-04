<template>
    <div class="paying-taxes__container">
        <header class="paying-taxes__header">
            <h1 class="paying-taxes__title">Paying Taxes</h1>
            <div class="paying-taxes__controls">
                <select
                    :value="selectedUser"
                    @change="onUserChange($event)"
                    class="paying-taxes__select"
                >
                    <option disabled value="">User</option>
                    <option v-for="user in users" :key="user" :value="user">
                        {{ user }}
                    </option>
                </select>

                <select
                    :value="selectedYear"
                    @change="onYearChange($event)"
                    class="paying-taxes__select"
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
                    :value="selectedQuarter"
                    @change="onQuarterChange($event)"
                    class="paying-taxes__select"
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

        <div v-if="incomeTaxPayment > 0" class="paying-taxes__summary">
            <h2>
                Total Payment for Quarter {{ selectedQuarter }} of
                {{ selectedYear }}: {{ incomeTaxPayment.toFixed(2) }} UAH
            </h2>
        </div>

        <table v-if="incomeTaxPayment > 0" class="paying-taxes__table">
            <thead>
                <tr>
                    <th>Сума до сплати</th>
                    <th>ЄДРПОУ Отримувача</th>
                    <th>Отримувач</th>
                    <th>Рахунок</th>
                    <th>Назва рахунку</th>
                    <th>Призначення платежу (стандарт ISO 20022)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ incomeTaxPayment.toFixed(2) }}</td>
                    <td>{{ incomeTaxDetails.IncomeTaxEDRPOU }}</td>
                    <td>{{ incomeTaxDetails.IncomeTaxName }}</td>
                    <td>{{ incomeTaxDetails.IncomeTaxAccount }}</td>
                    <td>{{ incomeTaxDetails.IncomeTaxAccountName }}</td>
                    <td>
                        Код: 101 <br />
                        Сума: {{ incomeTaxPayment.toFixed(2) }} UAH <br />
                        Додаткова інформація запису: Єдиний податок за
                        {{ getQuarterNumber(selectedQuarter) }} квартал
                        {{ selectedYear }}
                    </td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th>Сума до сплати</th>
                    <th>ЄДРПОУ Отримувача</th>
                    <th>Отримувач</th>
                    <th>Рахунок</th>
                    <th>Назва рахунку</th>
                    <th>Призначення платежу (стандарт ISO 20022)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ milFeePayment.toFixed(2) }}</td>
                    <td>{{ milFeeDetails.MilFeeEDRPOU }}</td>
                    <td>{{ milFeeDetails.MilFeeName }}</td>
                    <td>{{ milFeeDetails.MilFeeAccount }}</td>
                    <td>{{ milFeeDetails.MilFeeAccountName }}</td>
                    <td>
                        Код: 101 <br />
                        Сума: {{ milFeePayment.toFixed(2) }} UAH <br />
                        Додаткова інформація запису: Військовий збір за
                        {{ getQuarterNumber(selectedQuarter) }} квартал
                        {{ selectedYear }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const selectedUser = computed(() => store.state.receipts.selectedUser);
const selectedYear = computed(() => store.state.receipts.selectedYear);
const selectedQuarter = computed(() => store.state.receipts.selectedQuarter);
const users = computed(() => store.state.receipts.users);
const availableYears = computed(() => store.state.receipts.availableYears);
const availableQuarters = computed(
    () => store.state.receipts.availableQuarters,
);
const incomeTaxPayment = computed(() => store.state.receipts.incomeTaxPayment);
const incomeTaxDetails = computed(() => store.state.receipts.incomeTaxDetails);
const milFeePayment = computed(() => store.state.receipts.milFeePayment);
const milFeeDetails = computed(() => store.state.receipts.milFeeDetails);

const onUserChange = (event: Event) => {
    const target = event.target as HTMLSelectElement | null;
    if (target) {
        store.commit('receipts/setSelectedUser', target.value);
        store.dispatch('receipts/fetchYearsAndTaxDetails', target.value);
    }
};

const onYearChange = (event: Event) => {
    const target = event.target as HTMLSelectElement | null;
    if (target) {
        store.commit('receipts/setSelectedYear', target.value);
        store.dispatch('receipts/fetchQuarters', {
            userId: selectedUser.value,
            year: target.value,
        });
    }
};

const onQuarterChange = (event: Event) => {
    const target = event.target as HTMLSelectElement | null;
    if (target) {
        store.commit('receipts/setSelectedQuarter', target.value);
        store.dispatch('receipts/fetchQuarterData', {
            userId: selectedUser.value,
            year: selectedYear.value,
            quarter: target.value,
        });
    }
};

onMounted(async () => {
    await store.dispatch('receipts/fetchAllUsers');
    if (selectedUser.value && selectedYear.value && selectedQuarter.value) {
        await store.dispatch(
            'receipts/fetchYearsAndTaxDetails',
            selectedUser.value,
        );
        await store.dispatch('receipts/fetchQuarters', {
            userId: selectedUser.value,
            year: selectedYear.value,
        });
        await store.dispatch('receipts/fetchQuarterData', {
            userId: selectedUser.value,
            year: selectedYear.value,
            quarter: selectedQuarter.value,
        });
    }
});

const getQuarterNumber = (quarter: string) => {
    return quarter.replace('Q', '');
};
</script>

<style scoped lang="scss">
.paying-taxes__container {
    margin: 0 auto;
    max-width: 80vw;
    min-height: calc(100vh - 156px);
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
}

.paying-taxes__header {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;

    .paying-taxes__title {
        font-size: 2rem;
        color: var(--primary-color);
        font-family: 'Montserrat';
        margin-bottom: 10px;
    }
}

.paying-taxes__controls {
    display: flex;
    gap: 20px;

    .paying-taxes__select {
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

.paying-taxes__summary {
    margin-top: 20px;
    text-align: center;

    h2 {
        font-size: 2rem;
        color: var(--primary-color);
    }
}

.paying-taxes__table {
    margin-top: 30px;
    width: 100%;

    th,
    td {
        border: 2px solid var(--primary-color);
        padding: 12px;
        font-family: 'Montserrat', sans-serif;
        font-size: 1.1rem;
        text-align: start;
    }

    th {
        background-color: var(--primary-color);
        font-weight: 600;
        text-transform: uppercase;
    }
}
</style>
