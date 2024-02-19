import { financialConstants } from "./financial-constants";

const {
  FETCH_DATA_LOADING,
  FETCH_INCOME_SUCCESS,
  FETCH_EXPENSE_SUCCESS,
  FETCH_SAVING_SUCCESS,
  FETCH_INCOME_FAILURE,
  FETCH_EXPENSE_FAILURE,
  FETCH_SAVING_FAILURE,
  SET_SORT_INCOME,
  SET_SORT_EXPENSE,
  SET_SORT_SAVING,
  SET_FILTER_INCOME,
  SET_FILTER_EXPENSE,
  SET_FILTER_SAVING,
  SORT_FILTER_INCOME,
  SORT_FILTER_EXPENSE,
  SORT_FILTER_SAVING,
  ADD_INCOME_SUCCESS,
  ADD_EXPENSE_SUCCESS,
  ADD_SAVING_SUCCESS,
  SORT_FILTER_FAILURE,
  ADD_ENTRY_FAILURE,
} = financialConstants;

const initialFinacial = {
  income: [],
  incomeFilters: { sort: false, category: "Select" },
  filteredIncome: [],
  expense: [],
  expenseFilters: { sort: false, category: "Select" },
  filteredExpense: [],
  saving: [],
  savingFilters: { sort: false, category: "Select" },
  filteredSaving: [],
  loading: false,
  error: null,
};

const financialReducer = (state = initialFinacial, { type, payload }) => {
  switch (type) {
    case FETCH_DATA_LOADING:
      return { ...state, loading: true };
    case FETCH_INCOME_SUCCESS:
      return {
        ...state,
        income: payload,
        filteredIncome: payload,
        loading: false,
        error: null,
      };
    case FETCH_EXPENSE_SUCCESS:
      return {
        ...state,
        expense: payload,
        filteredExpense: payload,
        loading: false,
        error: null,
      };
    case FETCH_SAVING_SUCCESS:
      return {
        ...state,
        saving: payload,
        filteredSaving: payload,
        loading: false,
        error: null,
      };
    case FETCH_INCOME_FAILURE:
      return { ...state, loading: false, error: "Error fetching income data!" };
    case FETCH_EXPENSE_FAILURE:
      return {
        ...state,
        loading: false,
        error: "Error fetching expense data!",
      };
    case FETCH_SAVING_FAILURE:
      return {
        ...state,
        loading: false,
        error: "Error fetching saving data!",
      };
    case SET_SORT_INCOME:
      return {
        ...state,
        incomeFilters: { ...state.incomeFilters, sort: payload },
      };
    case SET_SORT_EXPENSE:
      return {
        ...state,
        expenseFilters: { ...state.expenseFilters, sort: payload },
      };
    case SET_SORT_SAVING:
      return {
        ...state,
        savingFilters: { ...state.savingFilters, sort: payload },
      };
    case SET_FILTER_INCOME:
      return {
        ...state,
        incomeFilters: { ...state.incomeFilters, category: payload },
      };
    case SET_FILTER_EXPENSE:
      return {
        ...state,
        expenseFilters: { ...state.expenseFilters, category: payload },
      };
    case SET_FILTER_SAVING:
      return {
        ...state,
        savingFilters: { ...state.savingFilters, category: payload },
      };
    case SORT_FILTER_INCOME: {
      const { sort, category } = state.incomeFilters;
      let filteredIncomes;
      if (sort && category !== "Select") {
        filteredIncomes = [...state.income]
          .sort((a, b) => a.amount - b.amount)
          .filter((data) => data.category === category);
      } else if (!sort && category !== "Select") {
        filteredIncomes = [...state.income].filter(
          (data) => data.category === category
        );
      } else if (sort && category === "Select") {
        filteredIncomes = [...state.income].sort((a, b) => a.amount - b.amount);
      } else {
        filteredIncomes = state.income;
      }
      return { ...state, filteredIncome: filteredIncomes };
    }
    case SORT_FILTER_EXPENSE: {
      const { sort, category } = state.expenseFilters;
      let filteredExpenses;
      if (sort && category !== "Select") {
        filteredExpenses = [...state.expense]
          .sort((a, b) => a.amount - b.amount)
          .filter((data) => data.category === category);
      } else if (!sort && category !== "Select") {
        filteredExpenses = [...state.expense].filter(
          (data) => data.category === category
        );
      } else if (sort && category === "Select") {
        filteredExpenses = [...state.expense].sort(
          (a, b) => a.amount - b.amount
        );
      } else {
        filteredExpenses = state.expense;
      }
      return { ...state, filteredExpense: filteredExpenses };
    }
    case SORT_FILTER_SAVING: {
      const { sort, category } = state.savingFilters;
      let filteredSavings;
      if (sort && category !== "Select") {
        filteredSavings = [...state.saving]
          .sort((a, b) => a.amount - b.amount)
          .filter((data) => data.category === category);
      } else if (!sort && category !== "Select") {
        filteredSavings = [...state.saving].filter(
          (data) => data.category === category
        );
      } else if (sort && category === "Select") {
        filteredSavings = [...state.saving].sort((a, b) => a.amount - b.amount);
      } else {
        filteredSavings = state.saving;
      }
      return { ...state, filteredSaving: filteredSavings };
    }
    case ADD_INCOME_SUCCESS:
      return {
        ...state,
        income: [...state.income, payload],
        filteredIncome: [...state.income, payload],
        loading: false,
        error: null,
      };
    case ADD_EXPENSE_SUCCESS:
      return {
        ...state,
        expense: [...state.expense, payload],
        filteredExpense: [...state.expense, payload],
        loading: false,
        error: null,
      };
    case ADD_SAVING_SUCCESS:
      return {
        ...state,
        saving: [...state.saving, payload],
        filteredSaving: [...state.saving, payload],
        loading: false,
        error: null,
      };
    case SORT_FILTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: "Error while sorting and filtering data!",
      };
    case ADD_ENTRY_FAILURE:
      return { ...state, loading: false, error: "Error while adding data!" };
    default:
      return state;
  }
};

export { financialReducer };
