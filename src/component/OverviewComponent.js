import styled from 'styled-components';
import React, { useState } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  align-items: center;
  font-size: 16px;
`;

const BalanceBox = styled.div`
  font-size: 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-weight: bold;
  & span {
    color: #0d1d2c;
    opacity: 80%;
    font-weight: bold;
    font-size: 20px;
  }
`;

const AddTransaction = styled.button`
  background: black;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 15px; 
`;

const AddTransactionContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e6e8e9;
  gap: 10px;
  width: 100%;
  padding: 15px 20px;
  margin: 20px;

  & input {
    outline: none;
    padding: 10px 12px;
    border-radius: 4px;
    border: 1px solid #e6e8e9;
  }
`;

const RadioBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;

  & input {
    width: unset;
    margin: 0 10px;
  }
`;

const ExpenseContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin: 20px;
`;

const ExpenseBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: 1px solid #e6e8e9;
  padding: 15px 20px;
  width: 135px;
  font-size: 14px;
  
  & span{
  font-weight: bold;
  font-size: 20px;
  color: ${(props)=>(props.isIncome ? "green" : "red")};
  }
`;

const AddTransactionView = ({ addTransaction, toggleAddTxn }) => {
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState('EXPENSE');

  const handleAddTransaction = () => {
    addTransaction({
      amount: Number(amount),
      desc,
      type,
      id: Date.now(),
    });
    toggleAddTxn();  // Hide the add transaction form after adding the transaction
  };

  return (
    <AddTransactionContainer>
      <input
        placeholder='Amount'
        value={amount}
        type='number'
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        placeholder='Description'
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <RadioBox>
        <input
          type='radio'
          id='expense'
          name='type'
          value='EXPENSE'
          checked={type === 'EXPENSE'}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor='expense'>Expense</label>
        <input
          type='radio'
          id='income'
          name='type'
          value='INCOME'
          checked={type === 'INCOME'}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor='income'>Income</label>
      </RadioBox>
      <AddTransaction onClick={handleAddTransaction}>
        Add Transaction
      </AddTransaction>
    </AddTransactionContainer>
  );
};

const OverviewComponent = ({ addTransaction, expense =0, income=0 }) => {
  const [isAddTxnVisible, toggleAddTxn] = useState(false);

  return (
    <Container>
      <BalanceBox>
        Balance: ₹{income - expense}
        <AddTransaction onClick={() => toggleAddTxn(!isAddTxnVisible)}>
          {isAddTxnVisible ? 'Cancel' : 'ADD'}
        </AddTransaction>
      </BalanceBox>
      {isAddTxnVisible && (
        <AddTransactionView toggleAddTxn={toggleAddTxn} addTransaction={addTransaction} />
      )}

      <ExpenseContainer>
        <ExpenseBox isIncome={false}>
          Expenses<span>₹{expense}</span>
        </ExpenseBox>
        <ExpenseBox isIncome={true}>
          Income<span>₹{income}</span>
        </ExpenseBox>
      </ExpenseContainer>
    </Container>
  );
};

export default OverviewComponent;
