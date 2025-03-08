import React, { useState } from "react";
import { handleError } from "../utils/ApiUrl";

const ExpenseTrackerForm = ({ addExpenses }) => {
  const [expenseInfo, setExpenseInfo] = useState({ text: "", amount: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    const copyLoginInfo = { ...expenseInfo };
    copyLoginInfo[name] = value;
    setExpenseInfo(copyLoginInfo);
  };

  const handleExpense = (e) => {
    e.preventDefault();
    console.log(expenseInfo);
    const { text, amount } = expenseInfo;
    if (!text.trim() || !amount.trim()) {
      handleError("All fields are required");
      return;
    }
    setTimeout(() => {
      setExpenseInfo({ text: "", amount: "" });
    }, 1000);
    addExpenses(expenseInfo);
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md mx-auto my-20">
        <h1 className="text-2xl font-bold mb-6 text-center">Expense Form</h1>
        <form onSubmit={handleExpense}>
          <div className="mb-4">
            <label htmlFor="text" className="block text-gray-700">
              Expense Description
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="text"
              placeholder="Enter your Expense Description..."
              className="w-full px-3 py-2 border rounded"
              value={expenseInfo.text}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="amount" className="block text-gray-700">
              Amount
            </label>
            <input
              onChange={handleChange}
              type="number"
              name="amount"
              placeholder="Enter your amount, Expense(-ve), Income(+ve)..."
              className="w-full px-3 py-2 border rounded"
              value={expenseInfo.amount}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseTrackerForm;
