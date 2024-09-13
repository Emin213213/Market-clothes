import { useState, useEffect } from "react";
import "../../scss/styles.scss";

export default function ProductFilter() {
  const [filterPrice, setFilterPrice] = useState(0); // Инициализируем как число
  const [dates, setResultDates] = useState([]);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [delivery] = useState(0);
  const [products] = useState([
    { name: "Product 1", price: 100 },
    { name: "Product 2", price: 200 },
    { name: "Product 3", price: 150 },
    { name: "Product 4", price: 300 },
    { name: "Product 5", price: 400 },
    { name: "Product 6", price: 250 },
    { name: "Product 7", price: 350 },
    { name: "Product 8", price: 180 },
    { name: "Product 9", price: 500 },
    { name: "Product 10", price: 150 },
    { name: "Product 11", price: 280 },
    { name: "Product 12", price: 450 },
    { name: "Product 13", price: 600 },
    { name: "Product 14", price: 230 },
    { name: "Product 15", price: 120 },
    { name: "Product 16", price: 90 },
    { name: "Product 17", price: 75 },
    { name: "Product 18", price: 640 },
    { name: "Product 19", price: 310 },
    { name: "Product 20", price: 260 },
  ]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((res) => res.json())
      .then((data) => {
        setResultDates(data.slice(0, 30)); 
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredProducts = products.filter(
    (product) => product.price >= filterPrice
  );

  const handleClick = (price) => {
    
    setTotal((prevTotal) => {
      const newTotal = prevTotal + price;
  
      setDiscount(newTotal > 1000 ? newTotal * 0.1 : 0);
      return newTotal;
    });
  };

  const totalToPay = total - discount + delivery;

  return (
    <div className="product-filter">
      <form>
        <div></div>
        <input
          type="number"
          className="price-input"
          placeholder="price"
          value={filterPrice}
          onChange={(e) => setFilterPrice(Number(e.target.value))}
        />
      </form>

      <ul className="product-list">
        {filteredProducts.map((product, index) => (
          <li key={index} className="product-item">
            <form>
              {dates[index] && (
                <img src={dates[index].thumbnailUrl} alt={product.name} />
              )}
              <h3>{product.name}</h3>
              <p>{product.price} $</p>
              <button
                type="submit"
                className="button-item"
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(product.price);
                }}
              >
                Buy
              </button>
            </form>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        <h3>Итого</h3>
        <p className="summary-item">
          Сумма товаров: <span>{total} грн</span>
        </p>
        <p className="summary-item">
          Сумма скидки: <span>{discount.toFixed(2)} грн</span>
        </p>
        <p className="summary-item">
          Доставка: <span>{delivery} грн</span>
        </p>
        <p className="total-to-pay">
          <strong>К оплате:</strong> <span>{totalToPay.toFixed(2)} грн</span>
        </p>
        <form>
          <button
            type="submit"
            onClick={() => alert(totalToPay)}
            className="button-purchase"
          >
            Купить
          </button>
        </form>
      </div>
    </div>
  );
}
