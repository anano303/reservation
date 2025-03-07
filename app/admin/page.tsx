"use client";
import { useState, useEffect } from "react";

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
    <main>
      <h1>ადმინ პანელი</h1>
      <form onSubmit={addProduct}>
        <input
          type="text"
          placeholder="პროდუქტის სახელი"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="ფასი"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">დამატება</button>
      </form>

      <h2>პროდუქტების სია</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - {product.price}₾
          </li>
        ))}
      </ul>
    </main>
  );
}
