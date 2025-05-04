const USERS_API_BASE_URL = `${process.env.VUE_APP_API_URL}/Users/`;
const TRANSACTIONS_API_BASE_URL = `${process.env.VUE_APP_API_URL}/Transactions`;
const CURRENCY_API_BASE_URL = process.env.VUE_APP_NBU_BY_DATE_URL;

export const apiEndpoints = {
    getAllUsers: () => `${USERS_API_BASE_URL}all`,
    getUserData: (userId: string) => `${USERS_API_BASE_URL}${userId}/years`,
    getUserReceipts: (userId: string, year: string) =>
        `${USERS_API_BASE_URL}${userId}/receipts?year=${year}`,
    getUserYears: (user: string) => `${USERS_API_BASE_URL}${user}/years`,
    getQuartersByYear: (user: string, year: number) =>
        `${USERS_API_BASE_URL}${user}/quarters?year=${year}`,
    getQuarterReceipts: (user: string, year: number, quarter: string) =>
        `${USERS_API_BASE_URL}${user}/receipts/quarters/${quarter}?year=${year}`,
    getSpecificQuarterData: (user: string, year: number, quarter: string) =>
        `${USERS_API_BASE_URL}${user}/receipts/specific?year=${year}&quarter=${quarter}`,
    getTaxDetails: (user: string) => `${USERS_API_BASE_URL}${user}/tax/details`,
    sendUserReceipt: (userId: string, year: string, quarter: string) =>
        `${USERS_API_BASE_URL}${userId}/receipts?year=${year}&quarter=${quarter}`,
    getCurrencyRateByDate: (date: string) =>
        `${CURRENCY_API_BASE_URL}${date}&json`,
    getReceiptsBeforeQuarter: (user: string, year: number, quarter: string) =>
        `${USERS_API_BASE_URL}${user}/receipts/before-quarter?year=${year}&quarter=${quarter}`,
};

export const transactionApi = {
    getList: () => `${TRANSACTIONS_API_BASE_URL}`,
    postList: () => `${TRANSACTIONS_API_BASE_URL}?TransactionsDetail=`,
    deleteList: () => `${TRANSACTIONS_API_BASE_URL}`,
};
