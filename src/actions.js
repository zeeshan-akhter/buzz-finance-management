import axios from "axios";
import { useLocation } from "react-router-dom";
import { financialConstants } from "./financial-constants";

const {
  BASE_URL,
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
  ADD_ENTRY_FAILURE
} = financialConstants;

const fetchIncome = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_DATA_LOADING });
    const {
      status,
      data: { incomes }
    } = await axios.get(`${BASE_URL}/income`);
    if (status === 201) {
      dispatch({ type: FETCH_INCOME_SUCCESS, payload: incomes });
      dispatch({ type: SORT_FILTER_INCOME });
    }
  } catch (error) {
    dispatch({ type: FETCH_INCOME_FAILURE });
    console.log("Error fetching income data!");
  }
};

const sortIncomesByAmount = (isSort) => async (dispatch) => {
  dispatch({ type: SET_SORT_INCOME, payload: isSort });
};

const filterIncomesByCategory = (category) => async (dispatch) => {
  dispatch({ type: SET_FILTER_INCOME, payload: category });
};

const applyIncomeFilters = () => async (dispatch) => {
  dispatch({ type: SORT_FILTER_INCOME });
};

const fetchExpenses = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_DATA_LOADING });
    const {
      status,
      data: { expenses }
    } = await axios.get(`${BASE_URL}/expense`);
    if (status === 201) {
      dispatch({ type: FETCH_EXPENSE_SUCCESS, payload: expenses });
      dispatch({ type: SORT_FILTER_EXPENSE });
    }
  } catch (error) {
    dispatch({ type: FETCH_EXPENSE_FAILURE });
    console.log("Error fetching expense data!");
  }
};

const sortExpensesByAmount = (isSort) => async (dispatch) => {
  dispatch({ type: SET_SORT_EXPENSE, payload: isSort });
};

const filterExpensesByCategory = (category) => async (dispatch) => {
  dispatch({ type: SET_FILTER_EXPENSE, payload: category });
};

const applyExpenseFilters = () => async (dispatch) => {
  dispatch({ type: SORT_FILTER_EXPENSE });
};

const fetchSavings = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_DATA_LOADING });
    const {
      status,
      data: { savings }
    } = await axios.get(`${BASE_URL}/saving`);
    if (status === 201) {
      dispatch({ type: FETCH_SAVING_SUCCESS, payload: savings });
      dispatch({ type: SORT_FILTER_SAVING });
    }
  } catch (error) {
    dispatch({ type: FETCH_SAVING_FAILURE });
    console.log("Error fetching saving data!");
  }
};

const sortSavingsByAmount = (isSort) => async (dispatch) => {
  dispatch({ type: SET_SORT_SAVING, payload: isSort });
};

const filterSavingsByCategory = (category) => async (dispatch) => {
  dispatch({ type: SET_FILTER_SAVING, payload: category });
};

const applySavingFilters = () => async (dispatch) => {
  dispatch({ type: SORT_FILTER_SAVING });
};

const addEntry = (entry) => async (dispatch) => {
  const { category, description, amount, date, type } = entry;
  try {
    const { status, data } = await axios({
      method: "POST",
      url: `${BASE_URL}/${type}`,
      data: { category, description, amount, date }
    });
    if (status === 201) {
      if (type === "income") {
        dispatch({ type: ADD_INCOME_SUCCESS, payload: data.income });
        dispatch({ type: SORT_FILTER_INCOME });
      }
      if (type === "expense") {
        dispatch({ type: ADD_EXPENSE_SUCCESS, payload: data.expense });
        dispatch({ type: SORT_FILTER_EXPENSE });
      }
      if (type === "saving") {
        dispatch({ type: ADD_SAVING_SUCCESS, payload: data.saving });
        dispatch({ type: SORT_FILTER_SAVING });
      }
    }
  } catch (error) {
    dispatch({ type: ADD_ENTRY_FAILURE });
    console.log(`Error adding ${entry.type}!`);
  }
};

export {
  fetchIncome,
  sortIncomesByAmount,
  filterIncomesByCategory,
  applyIncomeFilters,
  fetchExpenses,
  sortExpensesByAmount,
  filterExpensesByCategory,
  applyExpenseFilters,
  fetchSavings,
  sortSavingsByAmount,
  filterSavingsByCategory,
  applySavingFilters,
  addEntry
};