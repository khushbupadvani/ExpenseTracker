import { useEffect, useState } from 'react';
import '../styles/ExpenseList.css'
import ConformationModel from './ConformationModel';
import EditModel from './EditModel';
import { useNavigate } from 'react-router-dom';

export default function ExpenseList() {
    const [expenses, setExpenses] = useState([]);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteExpense, setDeleteExpense] = useState(null);
    const [openModel, setOpenModel] = useState(false);
    const [editId, setEditId] = useState(null);
    const navigate = useNavigate();

    const loadExpenses = () => {
        const savedExpenses = JSON.parse(localStorage.getItem("expenses") || "[]");
        setExpenses(savedExpenses);
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadExpenses();
    }, []);
    const totalAmount = expenses.reduce(
        (sum, item) => sum + Number(item.amount),
        0
    );

    // Delete expense
    const handleDelete = (id) => {
        const updateExpenses = expenses.filter(
            (item) => item.id !== id
        );

        localStorage.setItem(
            "expenses",
            JSON.stringify(updateExpenses)
        );

        setExpenses(updateExpenses);
        setDeleteExpense(null);
    };

    const editHandler = (id) => {
        setEditId(id);
        setOpenModel(true);
    };
    // Read more handler
    const handleReadMore = (id) => {
        navigate(`/expenseDetails/${id}`);
    };
    // Filtered expenses
    const FilteredExpenses = expenses.filter((item) => {
        const matchesCategory = filter === 'all' || item.category === filter;
        const matchesSearch = item.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Handlers
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            <div className='ExpenseList'>
                <div className='list-search'>
                    <div>
                        <h1>Your expenses</h1>
                        <p className="list-help">
                            Search,edit, or remove an expense below.
                        </p>
                    </div>

                    <div>
                        <select value={filter} onChange={handleFilterChange}>
                            <option value="all">All categories</option>
                            <option value="food">Food</option>
                            <option value="shopping">Shopping</option>
                            <option value="Transportation">Transportation</option>
                            <option value="education">Education</option>
                            <option value="phoneBill">Phone Bill</option>
                            <option value="entertainment">Entertainment</option>
                        </select>

                        <input
                            type="search"
                            placeholder="Search expenses..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {FilteredExpenses.length > 0 ? (FilteredExpenses.map((expense) => (
                            <tr key={expense.id}>
                                <td>{expense.amount}</td>
                                <td>{expense.description}</td>
                                <td>{expense.date}</td>
                                <td>{expense.category}</td>
                                <td className="table-actions">
                                    <button className="btn-delete"
                                        onClick={() => setDeleteExpense(expense)}>Delete</button>
                                    <button className="btn-edit"
                                        onClick={() => editHandler(expense.id)}>Edit</button>
                                    <button className="btn-readmore"
                                     onClick={() => handleReadMore(expense.id)}
                                     >
                                        Read More
                                    </button>
                                </td>
                            </tr>
                        ))) : (
                            <>
                                <tr>
                                    <td colspan="7" className="no-data">No Expenses Found</td>
                                </tr>
                            </>
                        )}

                        <tr className="expense-total">
                            <td colspan="7">TOtal: {totalAmount}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* Delete Confirmation Model */}
            {deleteExpense !== null && (
                <ConformationModel
                    title="Delete Expense"
                    message={"Are you sure you want to delete this expense "}
                    confirmText="Delete"
                    confirmText="Cancel"
                    onCancel={() => setDeleteExpense(null)}
                    onConfirm={() => handleDelete(deleteExpense.id)}
                />
            )}
            {openModel && editId !== null && (
                <EditModel
                   editId={editId}
                   onClose={() => setOpenModel(false)}
                   onUpdate={loadExpenses}
                />
            )}
        </>
    );
}