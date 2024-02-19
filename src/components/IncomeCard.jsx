const IncomeCard = ({ income }) => {
  const { _id, description, amount, category, date } = income;

  return (
    <tr key={_id}>
      <td>{new Date(date).toDateString()}</td>
      <td>{category}</td>
      <td>{description}</td>
      <td>{amount}/-</td>
    </tr>
  );
};

export { IncomeCard };
