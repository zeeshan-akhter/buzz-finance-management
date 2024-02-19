const ExpenseCard = ({ expense }) => {
  const { _id, description, amount, category, date } = expense;

  return (
    <tr key={_id}>
      <td>{new Date(date).toDateString()}</td>
      <td>{category}</td>
      <td>{description}</td>
      <td>{amount}/-</td>
    </tr>
  );
};

export { ExpenseCard };
