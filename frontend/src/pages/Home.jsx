import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIUrl, handleError, handleSuccess } from "../utils/ApiUrl";
import ExpensesTable from "./ExpensesTable";
import ExpenseTrackerForm from "./ExpenseTrackerForm";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const [loggedInUser, setLoggedinUser] = useState("");
  const [expenses, setExpenses] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    setLoggedinUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged Out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found, user not authenticated");
        navigate("/login");
        return;
      }

      const url = `${APIUrl}/expenses`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        console.error("Unauthorized: Invalid or missing token");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Expenses fetched:", result);
      setExpenses(result.data);
    } catch (err) {
      console.error("Error fetching expenses:", err.message);
      handleError(err);
    }
  };

  const addExpenses = async (data) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found, user not authenticated");
        navigate("/login");
        return;
      }

      const url = `${APIUrl}/expenses`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.status === 401) {
        console.error("Unauthorized: Invalid or missing token");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Expenses fetched:", result);
      setExpenses(result.data);
      handleSuccess(result.message);
    } catch (err) {
      console.error("Error fetching expenses:", err.message);
      handleError(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDeleteExpense = async (expenseId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found, user not authenticated");
        navigate("/login");
        return;
      }

      const url = `${APIUrl}/expenses/${expenseId}`;

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        console.error("Unauthorized: Invalid or missing token");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Expenses fetched:", result);
      setExpenses(result.data);
      handleSuccess(result.message);
    } catch (err) {
      console.error("Error fetching expenses:", err.message);
      handleError(err);
    }
  };

  return (
    <div className="p-10">
      <div className="flex justify-between">
        <h1 className="text-3xl uppercase">Welcome {loggedInUser}</h1>
        <button
          type="submit"
          className="w-20 bg-green-600 text-white py-2 rounded hover:bg-green-700"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <ExpenseTrackerForm addExpenses={addExpenses} />
      <ExpensesTable
        expenses={expenses}
        handleDeleteExpense={handleDeleteExpense}
      />
      <ToastContainer />
    </div>
  );
};

export default Home;
