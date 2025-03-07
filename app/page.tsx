import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>მთავარი გვერდი</h1>
      <li>
        <Link href="/register">რეგისტრაცია</Link>
      </li>
      <li>
        <Link href="/login">ავტორიზაცია</Link>
      </li>
      <li>
        <Link href="/admin">ადმინი</Link>
      </li>
    </main>
  );
}
