//import React from 'react'
import { useEffect, useState } from "react";
import "../styles/EditModel.css";

function EditModel({ editId, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    id: editId,
    amount: null,
    description: "",
    date: "",
    category: "",
  });

  useEffect(() => {
    const expenses = JSON.parse(localStorage.getItem("expenses") || "[]")
    const expense = expenses.find((item) => String(item.id) === String(editId));

    //eslint-disable-next-line react-hooks/set-state-in-effect
    if (expense) setFormData(expense);
  }, [editId]);

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  // Update expense
  const handleUpdate = (e) => {
    e.preventDefault();

    const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    const updateExpenses = expenses.map((item) =>
      String(item.id) === String(editId) ? formData : item
  );

    localStorage.setItem("expenses", JSON.stringify(updateExpenses));
    onUpdate();
    onClose();
  };
  return (
    <>
      <div className="model">
        <div className="form-box">
          <form onSubmit={handleUpdate}>
            <h1>Edit Expense</h1>

            <input
              type="number"
              name="amount"
              Value={formData.amount || ''}
              onChange={handleChange}
              placeholder="Amount"
            />

            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
            />

            <input type="date" name="date" value={formData.date}
              onChange={handleChange} />

            <label htmlFor="category">Category:</label>


            <select id="category" name="category" name="category"
              value={formData.category}
              onChange={handleChange}>
              <option value="">Select Category</option>
              <option value="food">Food</option>
              <option value="shopping">Shopping</option>
              <option value="Transportation">Transportation</option>
              <option value="education">Education</option>
              <option value="phoneBill">phone Bill</option>
              <option value="entertainment">Entertainment</option>
            </select>

            <div className="model-btn">
              <button className="edit">
                Update
              </button>
              <button className="cancle">
                Cancle
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditModel;
