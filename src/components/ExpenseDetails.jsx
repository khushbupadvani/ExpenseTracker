import { useEffect, useState } from 'react'
import "../styles/ExpenseDetails.css";
import {useParams } from "react-router-dom";
function ExpenseDetails() {
    const {id} = useParams();
    const [expenses, setExpenses] = useState(null);

    useEffect(() => {
        const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
        const savedExpenses = expenses.find((item) => String(item.id) == id);

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setExpenses(savedExpenses || null);
    }, [id]);
  return (
    <>
    <div className='expense-details'>
        <h1>Expense DEtails</h1>

        <div className="details-card">
            <p><strong>Amount:</strong> ₹{expenses?.amount}</p>
            <p><strong>Description:</strong> {expenses?.description}</p>
            <p><strong>Date:</strong> {expenses?.date}</p>
            <p><strong>Category:</strong> {expenses?.category}</p>
        </div>
    </div>
    </>
  )
}

export default ExpenseDetails
