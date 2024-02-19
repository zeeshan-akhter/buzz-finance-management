const SavingCard = ({ saving }) => {
  const { _id, description, amount, category, date } = saving;

  return (
    <tr key={_id}>
      <td>{new Date(date).toDateString()}</td>
      <td>{category}</td>
      <td>{description}</td>
      <td>{amount}/-</td>
    </tr>
  );
};

export { SavingCard };
