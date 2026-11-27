import { useEffect, useState } from "react";
import "../styles/ExpenseItemPage.css";

const API_URL = "https://dummyjson.com/products";
const ITEMS_PER_PAGE = 6;

function ExpenseItemPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

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

    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
    console.log(totalPages);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    console.log(startIndex);

    const visibleProducts = products.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    return (
        <main className="expense-item">
            <header className="iteams-header">
                <h1>expense-items</h1>
                <span>Browser item and their prices from the API.</span>
            </header>

            {loading && <p className="items-message">Login items...</p>}

            {!loading && (
                <section className="iteams-grid">
                    {visibleProducts.map((product) => (
                        <article className="item-card" key={product.id}>
                            <div className="item-card-top">
                                <span>{product.category}</span>
                                <strong>${product.price}</strong>
                            </div>
                            <h2>{product.title}</h2>
                            <p>{product.description}</p>
                        </article>
                    ))}
                </section>
            )}

    {!loading && totalPages > 1 && (
        <div className="pagination">
            <button 
              type="button"
              onClick={() => setCurrentPage((page) => page - 1 )}
              disabled={currentPage === 1}
            >
                previous
            </button>
            <span>
                page {currentPage} of {totalPages}
            </span>
            <button 
              type="button"
              onClick={() => setCurrentPage((page) => page + 1)}
              disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
        )}
        </main>
    );
}

export default ExpenseItemPage;
