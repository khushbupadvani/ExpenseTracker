import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import AddExpensepages from "./pages/AddExpensepages";
import ExpenseDetails from "./components/ExpenseDetails";

function App(){
  const router=createBrowserRouter([
    {path:'/',element:<Homepage/>},
    {path:'/add-expense',element:<AddExpensepages/>},
    {path:'/expenseDetails/:id',element:<ExpenseDetails/>}
    
  ])

  return(
    <>
    
    <RouterProvider router={router}/>
    </>
  );
}

export default App;