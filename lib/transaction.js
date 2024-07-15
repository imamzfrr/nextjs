// lib/transactions.js
let transactions = {};

export const saveTransaction = (transaction) => {
  transactions[transaction.order_id] = transaction;
};

export const getTransaction = (order_id) => {
  return transactions[order_id];
};
