import ExpenseList from "../components/ExpenseList";
import Navbar from "../components/Navbar";

export default function Homepage(){
    const expenses = [
{
  amount:"₹2,000",
  shopping:"Grocery Shopping",
  date:"17 Nov 2026",
  category:"Food"
},
{
    amount: "₹1,500",
    shopping: "Clothes shopping",
    date: "16 Nov 2026",
    category: "Shopping"
  },
  {
    amount: "₹800",
    shopping: "Vegetable shopping",
    date: "15 Nov 2026",
    category: "Food"
  },

];

return(
   <>
   <Navbar/>
   <ExpenseList expenses={expenses} />
   </>
);
}

