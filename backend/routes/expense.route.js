import express from "express";
import {
  addExpenses,
  getExpenses,
  updateExpenses,
  deleteExpenses,
} from "../controllers/expense.controller.js";

const router = express.Router();

// fetch all the expenses
router.get("/", getExpenses);
// add expenses
router.post("/", addExpenses);
// update expenses
router.put("/:expenseId", updateExpenses);
// delete expenses
router.delete("/:expenseId", deleteExpenses);

export default router;
