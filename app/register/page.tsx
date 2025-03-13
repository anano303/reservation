"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./register.css"; // Import the CSS file

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (res.ok) {
      router.push("/login");
    } else {
      setMessage(data.message || data.error);
    }
  }

  return (
    <main className="register-main">
      <h1 className="register-title">რეგისტრაცია</h1>
      <form onSubmit={handleRegister} className="register-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="register-input"
        />
        <input
          type="password"
          placeholder="პაროლი"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="register-input"
        />
        <button type="submit" className="register-button">
          რეგისტრაცია
        </button>
      </form>
      {message && <p className="register-message">{message}</p>}
    </main>
  );
}
