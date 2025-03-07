"use client";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// ვქმნით ტიპებს
type Product = {
  _id: string;
  name: string;
  price: number;
};

type Reservation = {
  productId: string;
  date: string;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [reservations, setReservations] = useState<{ [key: string]: string[] }>(
    {}
  );

  // 📌 ვქმნით fetchReservations() ფუნქციას useEffect()-ის გარეთ
  async function fetchReservations() {
    const res = await fetch("/api/reservations");
    const data: Reservation[] = await res.json();
    const reservedDates: { [key: string]: string[] } = {};

    data.forEach(({ productId, date }) => {
      if (!reservedDates[productId]) reservedDates[productId] = [];
      reservedDates[productId].push(date);
    });

    setReservations(reservedDates);
  }

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/products");
      const data: Product[] = await res.json();
      setProducts(data);
    }

    fetchProducts();
    fetchReservations(); // ✅ სერვერიდან დაჯავშნილი თარიღების წამოღება
  }, []);

  async function reserveProduct(productId: string) {
    if (!selectedDate) return alert("გთხოვთ აირჩიოთ თარიღი!");

    const formattedDate = selectedDate.toISOString().split("T")[0];

    const res = await fetch("/api/reservations", {
      method: "POST",
      body: JSON.stringify({
        productId,
        date: formattedDate,
        user: "user@example.com",
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      alert("წარმატებით დაიჯავშნა!");
      setSelectedDate(null);
      await fetchReservations(); // ✅ დაჯავშნის შემდეგ სერვერიდან ისევ წამოვიღოთ მონაცემები
    } else {
      alert("ეს თარიღი უკვე დაჯავშნილია!");
    }
  }

  return (
    <main>
      <h1>პროდუქტები</h1>
      <ul>
        {products.map((product) => {
          const reservedDates =
            reservations[product._id]?.map((d) => new Date(d)) || [];

          return (
            <li key={product._id}>
              {product.name} - {product.price}₾
              <DatePicker
                selected={selectedDate}
                onChange={(date: Date | null) => setSelectedDate(date)}
                excludeDates={reservedDates} // 📌 აქ ვაძლევთ უკვე დაკავებულ თარიღებს
                dateFormat="yyyy-MM-dd"
                placeholderText="აირჩიე თარიღი"
              />
              <button
                onClick={() => reserveProduct(product._id)}
                disabled={!selectedDate || reservedDates.includes(selectedDate)}
                style={{
                  backgroundColor:
                    !selectedDate || reservedDates.includes(selectedDate)
                      ? "red"
                      : "green",
                  color: "white",
                  cursor:
                    !selectedDate || reservedDates.includes(selectedDate)
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {!selectedDate
                  ? "აირჩიე თარიღი"
                  : reservedDates.includes(selectedDate)
                  ? "დაკავებულია"
                  : "დაჯავშნა"}
              </button>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
