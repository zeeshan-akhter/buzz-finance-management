import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { addEntry } from "../actions";
import { financialConstants } from "../financial-constants";

const IncomeExpenseForm = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { INCOME_CATEGORIES, EXPENSE_CATEGORIES, SAVING_CATEGORIES } =
    financialConstants;
  const page =
    pathname === "/"
      ? "income"
      : pathname === "/expense"
      ? "expense"
      : "saving";
  const initialFormInput = {
    category:
      page === "income"
        ? INCOME_CATEGORIES[0]
        : page === "expense"
        ? EXPENSE_CATEGORIES[0]
        : SAVING_CATEGORIES[0],
    description: "",
    amount: 0,
  };
  const [formInput, setFormInput] = useState(initialFormInput);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(addEntry({ ...formInput, date: new Date(), type: page }));
    setFormInput(initialFormInput);
  };

  useEffect(() => {
    setFormInput(initialFormInput);
  }, []);

  return (
    <form onSubmit={formSubmitHandler} className="form">
      <div>
        <label>
          {page[0].toUpperCase()}
          {page.slice(1)} category:
        </label>
        <select
          value={formInput.category}
          onChange={(e) =>
            setFormInput({
              ...formInput,
              category: e.target.value,
            })
          }
          required
        >
          {(page === "income"
            ? INCOME_CATEGORIES
            : page === "expense"
            ? EXPENSE_CATEGORIES
            : SAVING_CATEGORIES
          ).map((cat) => (
            <option value={cat} key={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>
          {page[0].toUpperCase()}
          {page.slice(1)} description:
        </label>
        <input
          type="text"
          value={formInput.description}
          onChange={(e) =>
            setFormInput({ ...formInput, description: e.target.value })
          }
          required
        />
      </div>
      <div>
        <label>
          {page[0].toUpperCase()}
          {page.slice(1)} amount:
        </label>
        <input
          type="number"
          min="0"
          value={formInput.amount}
          onChange={(e) =>
            setFormInput({
              ...formInput,
              amount: parseInt(e.target.value),
            })
          }
          required
        />
      </div>
      <button type="submit">
        Add {page[0].toUpperCase()}
        {page.slice(1)}
      </button>
    </form>
  );
};

export { IncomeExpenseForm };
