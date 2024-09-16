<template>
    <div class="tax-obligations__container">
        <header class="tax-obligations__header">
            <h1 class="tax-obligations__title">Tax Obligations</h1>
            <div class="tax-obligations__controls">
                <select
                    v-model="selectedUser"
                    @change="fetchYears"
                    class="tax-obligations__select"
                >
                    <option disabled value="">User</option>
                    <option v-for="user in users" :key="user" :value="user">
                        {{ user }}
                    </option>
                </select>

                <select
                    v-model="selectedYear"
                    @change="fetchQuarters"
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
                    @change="fetchReceipts"
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

        <div v-if="receipts.length > 0" class="tax-obligations__receipts">
            <h2>
                Receipts for Quarter {{ selectedQuarter }} of {{ selectedYear }}
            </h2>
            <ul>
                <li v-for="receipt in receipts" :key="receipt">
                    {{ receipt }}
                </li>
            </ul>
        </div>

        <table v-if="receipts.length > 0" class="tax-obligations__table">
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
                    <td v-else>-</td>
                    <td>{{ row14.toFixed(2) }} UAH</td>
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
const availableQuarters = ref<number[]>([]);
const receipts = ref<string[]>([]);
const totalAmount = ref<number>(0);
const row06 = ref<number>(0);
const row08 = ref<number>(0);
const row11 = ref<number>(0);
const row12 = ref<number>(0);
const row13 = ref<number | null>(0);
const row14 = ref<number>(0);

onMounted(async () => {
    try {
        const response = await axios.get(process.env.VUE_APP_GETALLUSERS_URL);
        users.value = response.data;
    } catch (error) {
        console.error('Error loading users:', error);
    }
});

const fetchYears = async () => {
    selectedYear.value = '';
    selectedQuarter.value = '';
    receipts.value = [];
    totalAmount.value = 0;

    if (selectedUser.value) {
        try {
            const url = `${process.env.VUE_APP_GETUSERDATA_URL}${selectedUser.value}/years`;
            const response = await axios.get(url);
            availableYears.value = response.data;
        } catch (error) {
            console.error('Error fetching years:', error);
        }
    }
};

const fetchQuarters = async () => {
    selectedQuarter.value = '';
    receipts.value = [];
    totalAmount.value = 0;

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

const fetchReceipts = async () => {
    receipts.value = [];
    totalAmount.value = 0;
    row06.value = 0;
    row08.value = 0;
    row11.value = 0;
    row12.value = 0;
    row13.value = null;

    if (selectedUser.value && selectedYear.value && selectedQuarter.value) {
        try {
            const url = `${process.env.VUE_APP_GETQUARTERSDATA_URL.replace('user', selectedUser.value).replace('choose', selectedYear.value).replace('cq', selectedQuarter.value)}`;
            const response = await axios.get(url);
            receipts.value = response.data;

            totalAmount.value = receipts.value.reduce(
                (sum: number, receipt: string) => {
                    const match = receipt.match(/-(\s*\d+(\.\d+)?)\sUAH/);
                    return match ? sum + parseFloat(match[1]) : sum;
                },
                0,
            );

            totalAmount.value = parseFloat(totalAmount.value.toFixed(2));

            row06.value = totalAmount.value;
            row08.value = row06.value;
            row11.value = parseFloat((row06.value * 0.05).toFixed(2));
            row12.value = row11.value;

            const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
            const currentQuarterIndex = quarters.indexOf(selectedQuarter.value);

            if (currentQuarterIndex === 0) {
                row13.value = null;
            } else {
                const previousQuarter = quarters[currentQuarterIndex - 1];
                const previousQuarterUrl = `${process.env.VUE_APP_GETQUARTERSDATA_URL.replace('user', selectedUser.value).replace('choose', selectedYear.value).replace('cq', previousQuarter)}`;

                const previousQuarterResponse =
                    await axios.get(previousQuarterUrl);
                const previousQuarterTotal =
                    previousQuarterResponse.data.reduce(
                        (sum: number, receipt: string) => {
                            const match = receipt.match(
                                /-(\s*\d+(\.\d+)?)\sUAH/,
                            );
                            return match ? sum + parseFloat(match[1]) : sum;
                        },
                        0,
                    );

                row13.value = parseFloat(
                    (previousQuarterTotal * 0.05).toFixed(2),
                );
            }

            row14.value = parseFloat(
                (row12.value - (row13.value ?? 0)).toFixed(2),
            );
        } catch (error) {
            console.error('Error fetching receipts:', error);
        }
    }
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
        width: 100%;
        max-width: 100vw;

        li {
            font-family: 'Montserrat';
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid var(--primary-color);
            border-radius: 5px;
            background-color: var(--input-background-color);
            box-shadow: 2px 2px 5px var(--box-shadow-color);
            text-align: center;
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
