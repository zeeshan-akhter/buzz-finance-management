import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { financialConstants } from "../financial-constants";
import {
  fetchExpenses,
  sortExpensesByAmount,
  filterExpensesByCategory,
  applyExpenseFilters,
} from "../actions";
import { ExpenseCard, IncomeExpenseForm } from "../components";

const Expense = () => {
  const dispatch = useDispatch();
  const { expenseFilters, filteredExpense, loading, error } = useSelector(
    ({ expenseFilters, filteredExpense, loading, error }) => ({
      expenseFilters,
      filteredExpense,
      loading,
      error,
    })
  );
  const { EXPENSE_CATEGORIES } = financialConstants;

  useEffect(() => {
    dispatch(fetchExpenses());
  }, []);

  useEffect(() => {
    dispatch(applyExpenseFilters());
  }, [expenseFilters]);

  return (
    <div className="page">
      <h2>Expense</h2>
      <div className="filter_body">
        <h3>Filters:</h3>
        <div>
          <input
            type="checkbox"
            defaultChecked={expenseFilters.sort}
            onChange={(e) => dispatch(sortExpensesByAmount(e.target.checked))}
          />
          <label> Sort by amount</label>
        </div>
        <div>
          <label>Category: </label>
          <select
            value={expenseFilters.category}
            onChange={(e) => dispatch(filterExpensesByCategory(e.target.value))}
          >
            {["Select", ...EXPENSE_CATEGORIES].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error ? (
        <h3>{error}</h3>
      ) : loading ? (
        <h3>Loading...</h3>
      ) : filteredExpense.length ? (
        <table>
          <tbody>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
            {filteredExpense?.map((expense) => (
              <ExpenseCard expense={expense} key={expense._id} />
            ))}
          </tbody>
        </table>
      ) : (
        <h3>No expense to display!</h3>
      )}
      <h3>Add New Expense</h3>
      <IncomeExpenseForm />
    </div>
  );
};

export { Expense };
