import UserModel from "../models/user.model.js";

export const addExpenses = async (req, res) => {
  const { _id } = await req.user;
  console.log(_id, req.body);
  try {
    const userData = await UserModel.findByIdAndUpdate(
      _id,
      { $push: { expenses: req.body } },
      { new: true } // For Returning the updated documents
    );
    res.status(200).json({
      message: "Expense added successfully",
      success: true,
      data: userData?.expenses,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err,
      success: false,
    });
  }
};

export const getExpenses = async (req, res) => {
  const { _id } = await req.user;
  console.log(_id, req.body);
  try {
    const userData = await UserModel.findById(_id).select("expenses");
    res.status(200).json({
      message: "Fetched Expenses successfully",
      success: true,
      data: userData?.expenses,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err,
      success: false,
    });
  }
};

export const updateExpenses = (req, res) => {
  res.send("Update expenses");
};

export const deleteExpenses = async (req, res) => {
  const { _id } = req.user;
  const { expenseId } = req.params;
  try {
    const userData = await UserModel.findByIdAndUpdate(
      _id,
      { $pull: { expenses: { _id: expenseId } } },
      { new: true } // For Returning the updated documents
    );
    res.status(200).json({
      message: "Expense Deleted successfully",
      success: true,
      data: userData?.expenses,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err,
      success: false,
    });
  }
};
