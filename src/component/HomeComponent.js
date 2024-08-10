import React, { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import OverviewComponent from './OverviewComponent';
import TransactionComponent from './TransactionComponent';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0 10px;
  font-family: Montserrat;
`;

const HomeComponent = () => {
  const [transaction, updateTransaction] = useState([]);
  const [expense, updateExpense] = useState(0);
  const [income, updateIncome] = useState(0);
  const addTransaction = (payload) => {
    updateTransaction(prevTransactions => [...prevTransactions, payload]);
  };

  const calculateBalance =()=>{
    let exp =0;
    let inc =0;
    transaction.map((payload)=>{
      payload.type==="EXPENSE" 
      ? (exp=exp+payload.amount)
     :(inc = inc + payload.amount);
     
    })
    updateExpense(exp);
    updateExpense(inc);
  }  

  useEffect(()=> calculateBalance(), [transaction]);
  return (
    <Container>
      <OverviewComponent addTransaction={addTransaction}
      expense={expense}
      income={income} />
      <TransactionComponent transaction={transaction} />
    </Container>
  );
}

export default HomeComponent;
