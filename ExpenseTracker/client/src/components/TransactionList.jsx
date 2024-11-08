import React, { useContext, useEffect } from "react";
import Transaction from "./Transaction";
import { GlobalContext } from "../context/GlobalState";

export default function TransactionList() {
  const { transactions, getTransaction } = useContext(GlobalContext);

  useEffect(() => {
    getTransaction(); // Match the correct function name
  }, []);

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map((transaction) => (
          <Transaction key={transaction._id} transaction={transaction} />
        ))}
      </ul>
    </>
  );
}
