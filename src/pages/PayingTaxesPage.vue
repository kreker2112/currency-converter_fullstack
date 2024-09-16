<template>
    <div class="paying-taxes__container">
        <header class="paying-taxes__header">
            <h1 class="paying-taxes__title">Paying Taxes</h1>
            <div class="paying-taxes__controls">
                <select
                    v-model="selectedUser"
                    @change="fetchYearsAndTaxDetails"
                    class="paying-taxes__select"
                >
                    <option disabled value="">User</option>
                    <option v-for="user in users" :key="user" :value="user">
                        {{ user }}
                    </option>
                </select>

                <select
                    v-model="selectedYear"
                    @change="fetchQuarters"
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
                    v-model="selectedQuarter"
                    @change="fetchQuarterData"
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

        <div v-if="totalPayment > 0" class="paying-taxes__summary">
            <h2>
                Total Payment for Quarter {{ selectedQuarter }} of
                {{ selectedYear }}: {{ totalPayment.toFixed(2) }} UAH
            </h2>
        </div>

        <table v-if="totalPayment > 0" class="paying-taxes__table">
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
                    <td>{{ totalPayment.toFixed(2) }}</td>
                    <td>{{ taxDetails.RecipientEDRPOU }}</td>
                    <td>{{ taxDetails.RecipientName }}</td>
                    <td>{{ taxDetails.Account }}</td>
                    <td>{{ taxDetails.AccountName }}</td>
                    <td>
                        Код: 101 <br />
                        Сума: {{ totalPayment.toFixed(2) }} UAH <br />
                        Додаткова інформація запису: Єдиний податок за
                        {{ getQuarterNumber(selectedQuarter) }} квартал
                        {{ selectedYear }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const selectedUser = ref('');
const selectedYear = ref('');
const selectedQuarter = ref('');
const users = ref<string[]>([]);
const availableYears = ref<number[]>([]);
const availableQuarters = ref<string[]>([]);
const totalPayment = ref<number>(0);
const taxDetails = ref({
    RecipientEDRPOU: '',
    RecipientName: '',
    Account: '',
    AccountName: '',
});

onMounted(async () => {
    try {
        const response = await axios.get(process.env.VUE_APP_GETALLUSERS_URL);
        users.value = response.data;
    } catch (error) {
        console.error('Error loading users:', error);
    }
});

const fetchYearsAndTaxDetails = async () => {
    selectedYear.value = '';
    selectedQuarter.value = '';
    totalPayment.value = 0;

    if (selectedUser.value) {
        try {
            const yearsUrl = `${process.env.VUE_APP_GETUSERDATA_URL}${selectedUser.value}/years`;
            const taxDetailsUrl = `${process.env.VUE_APP_GETTAXDETAILS_URL.replace('user', selectedUser.value)}`;

            const [yearsResponse, taxDetailsResponse] = await Promise.all([
                axios.get(yearsUrl),
                axios.get(taxDetailsUrl),
            ]);

            availableYears.value = yearsResponse.data;
            taxDetails.value = taxDetailsResponse.data;
        } catch (error) {
            console.error('Error fetching years and tax details:', error);
        }
    }
};

const fetchQuarters = async () => {
    selectedQuarter.value = '';
    totalPayment.value = 0;

    if (selectedUser.value && selectedYear.value) {
        try {
            const url = process.env.VUE_APP_GETQUARTERS_URL.replace(
                'user',
                selectedUser.value,
            ).replace('choose', selectedYear.value);
            const response = await axios.get(url);
            availableQuarters.value = response.data;
        } catch (error) {
            console.error('Error fetching quarters:', error);
        }
    }
};

const fetchQuarterData = async () => {
    totalPayment.value = 0;

    if (selectedUser.value && selectedYear.value && selectedQuarter.value) {
        try {
            const url = `${process.env.VUE_APP_GETQUARTERDATA_URL.replace('user', selectedUser.value).replace('cy', selectedYear.value).replace('cq', selectedQuarter.value)}`;
            const response = await axios.get(url);

            const receipts = response.data;
            const totalAmount = receipts.reduce(
                (sum: number, receipt: string) => {
                    const match = receipt.match(/-(\s*\d+(\.\d+)?)\sUAH/);
                    return match ? sum + parseFloat(match[1]) : sum;
                },
                0,
            );

            totalPayment.value = parseFloat((totalAmount * 0.05).toFixed(2)); // Сумма * 5%
        } catch (error) {
            console.error('Error fetching quarter data:', error);
        }
    }
};
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
    border-collapse: collapse;

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
