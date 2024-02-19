import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chart } from "react-google-charts";
import { fetchExpenses, fetchIncome, fetchSavings } from "../actions";

const Report = () => {
  const dispatch = useDispatch();
  const { income, expense, saving } = useSelector(
    ({ income, expense, saving }) => ({
      income,
      expense,
      saving,
    })
  );
  const [selectedReport, setSelectedReport] = useState("");
  const [input, setInput] = useState("Income vs. Expenses");

  const totalIncome = income.reduce((sum, { amount }) => sum + amount, 0);
  const totalExpense = expense.reduce((sum, { amount }) => sum + amount, 0);
  const totalSaving = saving.reduce((sum, { amount }) => sum + amount, 0);

  const expenseByCategory = expense.reduce(
    (fin, { category, amount }) => ({
      ...fin,
      [category]: (fin[category] ?? 0) + amount,
    }),
    {}
  );

  const incomeExpensesData = [
    ["Type", "Amount"],
    ["Income", totalIncome],
    ["Expense", totalExpense],
    ["Saving", totalSaving],
  ];

  const expenseBreakdownData = [
    ["Category", "Amount"],
    ...Object.entries(expenseByCategory),
  ];

  const incomeExpensesOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    title: "Income vs. Expenses Report",
  };

  const expenseBreakdownOptions = {
    ...incomeExpensesOptions,
    title: "Expense Breakdown Report",
  };

  useEffect(() => {
    dispatch(fetchIncome());
    dispatch(fetchExpenses());
    dispatch(fetchSavings());
  }, []);

  return (
    <div className="page">
      <h2>Report</h2>
      <div>
        <select onChange={(e) => setInput(e.target.value)}>
          <option value="Income vs. Expenses">Income vs Expenses</option>
          <option value="Expense Breakdown">Expense Breakdown</option>
        </select>
        <button onClick={() => setSelectedReport(input)}>
          Generate Report
        </button>
      </div>
      {selectedReport === "Income vs. Expenses" && (
        <Chart
          chartType="PieChart"
          data={incomeExpensesData}
          options={incomeExpensesOptions}
        />
      )}
      {selectedReport === "Expense Breakdown" && (
        <Chart
          chartType="PieChart"
          data={expenseBreakdownData}
          options={expenseBreakdownOptions}
        />
      )}
    </div>
  );
};

export { Report };
