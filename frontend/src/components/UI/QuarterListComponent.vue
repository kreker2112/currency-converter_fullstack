<template>
    <div v-if="hasReceipts" class="entering-funds__quarters">
        <div
            v-for="(quarter, index) in groupedReceipts"
            :key="index"
            class="entering-funds__quarter"
        >
            <h2 class="entering-funds__quarter-title">
                {{ quarter.QuarterName }}
            </h2>
            <ul class="entering-funds__list">
                <li
                    v-for="receipt in quarter.Receipts"
                    :key="receipt.date"
                    class="entering-funds__list-item"
                >
                    {{ formatDate(receipt.date) }}: {{ receipt.amount }}
                    {{ receipt.currency }} - {{ receipt.uahAmount }} UAH
                </li>
            </ul>
            <div class="entering-funds__quarter-total">
                Total for {{ quarter.QuarterName }}:
                {{ getQuarterTotal(quarter.Receipts) }} UAH
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { Receipt, Quarter } from '@/interfaces/receipts';

const store = useStore();

const groupedReceipts = computed(() => {
    return store.getters['receipts/receiptsByQuarter']();
});

const hasReceipts = computed(() => {
    return groupedReceipts.value.some(
        (quarter: Quarter) => quarter.Receipts && quarter.Receipts.length > 0,
    );
});

const getQuarterTotal = (receipts: Receipt[]): string => {
    const total = receipts.reduce((sum, receipt) => {
        if (receipt && !isNaN(receipt.uahAmount)) {
            return sum + receipt.uahAmount;
        }
        return sum;
    }, 0);
    return total.toFixed(2);
};

const formatDate = (isoDate: string): string => {
    const dateParts = isoDate.split('-');
    return `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;
};
</script>

<style scoped>
.entering-funds__quarters {
    display: flex;
    justify-content: flex-start;
    gap: 20px;
    width: 100%;
    padding: 20px;
    .entering-funds__quarter {
        width: calc(25% - 20px);
        background-color: var(--background-color);
        border-radius: 10px;
        padding: 10px;
        .entering-funds__quarter-title {
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
                padding: 10px;
                margin-bottom: 10px;
                border: 1px solid var(--primary-color);
                border-radius: 5px;
                background-color: var(--input-background-color);
                box-shadow: 2px 2px 5px var(--box-shadow-color);
            }
        }
        .entering-funds__quarter-total {
            font-weight: bold;
            font-size: 1.4rem;
            margin-top: 20px;
            text-align: center;
            color: #fff;
            background-color: var(--primary-color);
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
    }
}
</style>
