import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [result, setResult] = useState([]);
  const [input, setInput] = useState("");

  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/products/search?q=");

    const response = await data.json();
  };
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${input}`
      );

      const data = await response.json();

      setResult(data.products);
    };

    const timer = setTimeout(() => {
      if (input.length > 0) {
        fetchApi();
      } else {
        setResult([]);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <div className="App">
      <h1>AutoComplete Search</h1>

      <input
        type="text"
        placeholder="Search products..."
        className="search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {result.length > 0 && (
        <div className="results">
          {result.map((product) => (
            <div key={product.id} className="result-item">
              {product.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
