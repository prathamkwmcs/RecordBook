import React from "react";

const ExpensesTable = ({ expenses, handleDeleteExpense }) => {
  console.log("ExpensesTable-->", expenses);
  const totalAmount = expenses?.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  return (
    <div className="p-10 w-full max-w-4xl mx-auto font-sans">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b-2 border-gray-300 text-left leading-4 text-gray-600">
              Description
            </th>
            <th className="py-2 px-4 border-b-2 border-gray-300 text-left leading-4 text-gray-600">
              Amount
            </th>
            <th className="py-2 px-4 border-b-2 border-gray-300 text-left leading-4 text-gray-600">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {expenses?.map((expense, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b border-gray-300 font-bold">
                {expense.text}
              </td>
              <td
                className="py-2 px-4 border-b font-bold border-gray-300"
                style={{ color: expense.amount > 0 ? "#27ae60" : "#e74c3c" }}
              >
                {expense.amount}
              </td>
              <td className="py-2 px-4 border-b border-gray-300">
                <button
                  onClick={() => handleDeleteExpense(expense._id)}
                  className="bg-amber-600 text-white px-3 py-2 rounded-md cursor-pointer"
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="font-bold p-5">Total Amount:</td>
            <td
              className="font-bold p-5"
              style={{ color: totalAmount > 0 ? "#27ae60" : "#e74c3c" }}
            >
              {totalAmount}
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ExpensesTable;
