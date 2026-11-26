import { useEffect, useState } from "react";
import "../styles/ExpenseItemPage.css";

const API_URL = "https://dummyjson.com/products";

function ExpenseItemPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error("Could not load expense items");
            }

            const data = await response.json();
            setProducts(data.products);
        } catch (fetchError) {
            console.log(fetchError.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        //eslint-disable-next-line react-hooks/set-state-in-effect
        fetchProducts();
    }, []);

    return (
        <div>

        </div>
    )
}

export default ExpenseItemPage;
