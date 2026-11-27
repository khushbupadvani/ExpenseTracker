import ExpenseList from "../components/ExpenseList";
import { useTheme } from "../context/ThemeContext";
import "../styles/Homepage.css";

export default function Homepage(){
   const{ theme } = useTheme();

return(
   <main className={`home-page ${theme}`}>
   <ExpenseList/>
   </main>
);
}

