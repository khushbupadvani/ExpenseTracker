import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import AddExpensepages from "./pages/AddExpensepages";
import ExpenseDetails from "./components/ExpenseDetails";
import Layout from "./Layout/Layout";
import LoginPage from "./pages/LoginPage";

function App(){
  const router=createBrowserRouter([
    {path:"/",element:<Layout/>,children:[{path:'/',element:<Homepage/>},
    {path:'/add-expense',element:<AddExpensepages/>},
    {path:'/expenseDetails/:id',element:<ExpenseDetails/>}
  ],
},
  {path: "/Login",element: <LoginPage /> },
  ]);

  return(
    <>
    <RouterProvider router={router}/>
    </>
  );
}

export default App;