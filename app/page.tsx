"use client";
import Link from "next/link";
import { useState } from "react";
import ErrorMessage from "./components/ErrorMessage";
import "./home.css";
import "./components/ErrorMessage.css";

export default function Home() {
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    // Simulate an erro
    setError("An error occurred while processing your request.");
  };

  return (
    <main>
      <h1>მთავარი გვერდი</h1>
      {error && <ErrorMessage message={error} />}
      <li>
        <Link href="/register">რეგისტრაცია</Link>
      </li>
      <li>
        <Link href="/login">ავტორიზაცია</Link>
      </li>
      <li>
        <Link href="/admin">ადმინი</Link>
      </li>
      <li>
        <Link href="/products">პროდუქტების დაჯავშნა</Link>
      </li>
      <button onClick={handleClick}>Test Error</button>
    </main>
  );
}
