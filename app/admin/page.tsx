"use client";
import { useState, useEffect } from "react";
import "./admin.css"; // Import the CSS file

// ვქმნით პროდუქტის ტიპს
type Product = {
  _id: string;
  name: string;
  price: number;
};

export default function Admin() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState<Product[]>([]); // აქ ვუთითებთ, რომ products არის Product[] (მასივია)

  async function addProduct(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({ name, price }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      setName("");
      setPrice("");
      fetchProducts();
      alert("პროდუქტი დამატებულია!");
    }
  }

  async function fetchProducts() {
    const res = await fetch("/api/products");
    const data: Product[] = await res.json(); // API-ს პასუხის ტიპი ვუთითებთ
    setProducts(data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="admin-main">
      <h1 className="admin-title">ადმინ პანელი</h1>
      <form onSubmit={addProduct} className="admin-form">
        <input
          type="text"
          placeholder="პროდუქტის სახელი"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="admin-input"
        />
        <input
          type="number"
          placeholder="ფასი"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="admin-input"
        />
        <button type="submit" className="admin-button">დამატება</button>
      </form>

      <h2 className="admin-subtitle">პროდუქტების სია</h2>
      <ul className="admin-products-list">
        {products.map((product) => (
          <li key={product._id} className="admin-product-item">
            {product.name} - {product.price}₾
          </li>
        ))}
      </ul>
    </main>
  );
}
