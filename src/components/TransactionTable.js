import React, { useState, useEffect } from 'react';
import "./TransactionTable.css"

// API endpoint where db.json is served
const API_URL = 'http://localhost:3000/transactions'; 

function TransactionTable() {
  const [transactions, setTransactions] = useState([]);
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch transactions from db.json when the component mounts
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchTransactions();
  }, []);

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (description && amount) {
      const newTransaction = {
        id: transactions.length + 1,
        date,
        description,
        category,
        amount: parseFloat(amount),
      };
      setTransactions([...transactions, newTransaction]);
      setDate('');
      setDescription('');
      setCategory('');
      setAmount('');
    }
  };

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Bank of Flatiron</h1>
      <h2>Transactions</h2>
      <div>
        <input
          type="text"
          placeholder="Search by description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>{transaction.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleAddTransaction}>
        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
}

export default TransactionTable;
