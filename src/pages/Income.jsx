import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { financialConstants } from "../financial-constants";
import {
  fetchIncome,
  sortIncomesByAmount,
  filterIncomesByCategory,
  applyIncomeFilters,
} from "../actions";
import { IncomeCard, IncomeExpenseForm } from "../components";

const Income = () => {
  const dispatch = useDispatch();
  const { incomeFilters, filteredIncome, loading, error } = useSelector(
    ({ incomeFilters, filteredIncome, loading, error }) => ({
      incomeFilters,
      filteredIncome,
      loading,
      error,
    })
  );
  const { INCOME_CATEGORIES } = financialConstants;

  useEffect(() => {
    dispatch(fetchIncome());
  }, []);

  useEffect(() => {
    dispatch(applyIncomeFilters());
  }, [incomeFilters]);

  return (
    <div className="page">
      <h2>Income</h2>
      <div className="filter_body">
        <h3>Filters:</h3>
        <div>
          <input
            type="checkbox"
            defaultChecked={incomeFilters.sort}
            onChange={(e) => dispatch(sortIncomesByAmount(e.target.checked))}
          />
          <label> Sort by amount</label>
        </div>
        <div>
          <label>Category: </label>
          <select
            value={incomeFilters.category}
            onChange={(e) => dispatch(filterIncomesByCategory(e.target.value))}
          >
            {["Select", ...INCOME_CATEGORIES].map((cat) => (
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
      ) : filteredIncome.length ? (
        <table>
          <tbody>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
            {filteredIncome?.map((income) => (
              <IncomeCard income={income} key={income._id} />
            ))}
          </tbody>
        </table>
      ) : (
        <h3>No income to display!</h3>
      )}
      <h3>Add New Income</h3>
      <IncomeExpenseForm />
    </div>
  );
};

export { Income };
