import React, { useState } from 'react';
import styled from 'styled-components';
import OverviewComponent from './component/OverviewComponent';
import TransactionComponent from './component/TransactionComponent';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0 10px;
  font-family: Montserrat;
`;

const Header = styled.span`
  color: black;
  font-size: 25px;
  font-weight: bold;
`;

function App() {
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const addTransaction = (payload) => {
    setTransactions([...transactions, payload]);

    if (payload.type === 'INCOME') {
      setIncome(income + payload.amount);
    } else if (payload.type === 'EXPENSE') {
      setExpense(expense + payload.amount);
    }
  };

  return (
    <Container>
      <Header>Expense Tracker</Header>
      <OverviewComponent
        addTransaction={addTransaction}
        income={income}
        expense={expense}
      />
      <TransactionComponent transactions={transactions} />
    </Container>
  );
}

export default App;
