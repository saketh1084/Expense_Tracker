import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 22px;
  font-size: 18px;
  width: 100%;
  gap: 10px;
  font-weight: bold;

  & input {
    padding: 10px 12px;
    border-radius: 12px;
    background: #e6e8e9;
    border: 1px solid #e6e8e9;
    outline: none;
    width: 25%;
  }
`;

const Cell = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 2px;
  align-items: center;
  width: 25%;
  font-weight: normal;
  justify-content: space-between;
  border: 1px solid #e6e8e9;
  border-right: 4px solid ${(props) => (props.isExpense ? "red" : "green")};
`;

// Define the TransactionCell component
const TransactionCell = ({ payload }) => {
  const isExpense = payload.type === 'EXPENSE';

  return (
    <Cell isExpense={isExpense}>
      <span>{payload.desc}</span>
      <span>₹{payload.amount}</span>
    </Cell>
  );
};

const TransactionComponent = ({ transactions }) => {
  const [searchText, updateSearchText] = useState("");
  const [filterTransaction, updateTxn] = useState(transactions);

  const filterData = (searchText) => {
    if (!searchText || !searchText.trim().length) {
      updateTxn(transactions);
      return;
    }
    const filteredTransactions = transactions.filter((payload) =>
      payload.desc.toLowerCase().includes(searchText.toLowerCase().trim())
    );
    updateTxn(filteredTransactions);
  };

  useEffect(() => {
    filterData(searchText);
  }, [searchText, transactions]);

  return (
    <Container>
      Transaction
      <input
        placeholder="Search"
        value={searchText}
        onChange={(e) => {
          const value = e.target.value;
          updateSearchText(value);
        }}
      />
      {filterTransaction.length ? (
        filterTransaction.map((payload) => (
          <TransactionCell key={payload.id} payload={payload} />
        ))
      ) : (
        <span>No Transactions Available</span>
      )}
    </Container>
  );
};

export default TransactionComponent;
