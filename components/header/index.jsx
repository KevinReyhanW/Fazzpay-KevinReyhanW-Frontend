import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div>
      <Link href="/home">Home</Link> |
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
