<template>
    <div class="universal-select__controls">
        <select
            v-model="internalSelectedUser"
            class="universal-select__select"
            @change="onUserChange"
        >
            <option disabled value="">User</option>
            <option v-for="user in users" :key="user" :value="user">
                {{ user }}
            </option>
        </select>

        <select
            v-model="internalSelectedYear"
            class="universal-select__select"
            :disabled="availableYears.length === 0"
            @change="onYearChange"
        >
            <option disabled value="">Year</option>
            <option v-for="year in availableYears" :key="year" :value="year">
                {{ year }}
            </option>
        </select>

        <select
            v-if="showQuarter"
            v-model="internalSelectedQuarter"
            class="universal-select__select"
            :disabled="availableQuarters.length === 0"
            @change="onQuarterChange"
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
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
    showQuarter: {
        type: Boolean,
        default: true,
    },
    modelValue: {
        type: String,
        default: '',
    },
});

const emit = defineEmits([
    'update:modelValue',
    'yearSelected',
    'quarterSelected',
    'userSelected',
]);

const store = useStore();

const internalSelectedUser = ref(props.modelValue);
const internalSelectedYear = ref('');
const internalSelectedQuarter = ref('');

const users = computed(() => store.getters['receipts/getUsers']);
const availableYears = computed(
    () => store.getters['receipts/getAvailableYears'],
);
const availableQuarters = computed(
    () => store.getters['receipts/getAvailableQuarters'],
);

onMounted(async () => {
    if (!users.value || users.value.length === 0) {
        await store.dispatch('receipts/fetchAllUsers');
    }
});

const onUserChange = async () => {
    store.commit('receipts/setSelectedUser', internalSelectedUser.value);
    await store.dispatch('receipts/fetchUserYears', internalSelectedUser.value);
    internalSelectedYear.value = '';
    internalSelectedQuarter.value = '';
    emit('update:modelValue', internalSelectedUser.value);
};

const onYearChange = async () => {
    store.commit('receipts/setSelectedYear', internalSelectedYear.value);
    await store.dispatch('receipts/fetchQuarters', {
        userId: internalSelectedUser.value,
        year: internalSelectedYear.value,
    });
    await store.dispatch('receipts/fetchReceiptsByYear', {
        userId: internalSelectedUser.value,
        year: internalSelectedYear.value,
    });
    internalSelectedQuarter.value = '';
    emit('yearSelected', internalSelectedYear.value);
};

const onQuarterChange = () => {
    store.commit('receipts/setSelectedQuarter', internalSelectedQuarter.value);
    emit('quarterSelected', internalSelectedQuarter.value);
};

watch(internalSelectedUser, (newValue: string) => {
    emit('update:modelValue', newValue);
});
</script>

<style scoped>
.universal-select__controls {
    display: flex;
    gap: 10px;
}

.universal-select__select {
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
</style>
