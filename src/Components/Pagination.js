import { useEffect, useState } from "react";
import "./style.css";

const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await res.json();
    setProducts(data.products);
    setTotalPages(data.total / 10);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleClick = (number) => {
    if (number >= 1 && number <= totalPages) setPage(number);
  };

  return (
    <>
      <div className="all__products">
        {products.map((prod) => {
          return (
            <div key={prod.id} className="products">
              <img className="images" src={prod.thumbnail} alt={prod.title} />
              <span>{prod.title}</span>
              <h4>RS {prod.price}</h4>
            </div>
          );
        })}
      </div>
      {products.length > 0 ? (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "Disabled"}
            onClick={() => handleClick(page - 1)}
          >
            ◀️
          </span>
          {[...Array(totalPages)].map((num, i) => {
            return (
              <span
                className={page === i + 1 ? "selected" : ""}
                onClick={() => handleClick(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            className={page < totalPages ? "" : "Disabled"}
            onClick={() => handleClick(page + 1)}
          >
            ▶️
          </span>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Pagination;
