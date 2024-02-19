import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { financialConstants } from "../financial-constants";
import {
  fetchSavings,
  sortSavingsByAmount,
  filterSavingsByCategory,
  applySavingFilters,
} from "../actions";
import { IncomeExpenseForm, SavingCard } from "../components";

const Saving = () => {
  const dispatch = useDispatch();
  const { savingFilters, filteredSaving, loading, error } = useSelector(
    ({ savingFilters, filteredSaving, loading, error }) => ({
      savingFilters,
      filteredSaving,
      loading,
      error,
    })
  );
  const { SAVING_CATEGORIES } = financialConstants;

  useEffect(() => {
    dispatch(fetchSavings());
  }, []);

  useEffect(() => {
    dispatch(applySavingFilters());
  }, [savingFilters]);

  return (
    <div className="page">
      <h2>Saving</h2>
      <div className="filter_body">
        <h3>Filters:</h3>
        <div>
          <input
            type="checkbox"
            defaultChecked={savingFilters.sort}
            onChange={(e) => dispatch(sortSavingsByAmount(e.target.checked))}
          />
          <label> Sort by amount</label>
        </div>
        <div>
          <label>Category: </label>
          <select
            value={savingFilters.category}
            onChange={(e) => dispatch(filterSavingsByCategory(e.target.value))}
          >
            {["Select", ...SAVING_CATEGORIES].map((cat) => (
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
      ) : filteredSaving.length ? (
        <table>
          <tbody>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
            {filteredSaving?.map((saving) => (
              <SavingCard saving={saving} key={saving._id} />
            ))}
          </tbody>
        </table>
      ) : (
        <h3>No saving to display!</h3>
      )}
      <h3>Add New Saving</h3>
      <IncomeExpenseForm />
    </div>
  );
};

export { Saving };
