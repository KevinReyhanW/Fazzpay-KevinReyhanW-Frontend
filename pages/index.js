import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function LandingPage() {
  const token = true;
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push("/home");
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <div>
      <h1>LandingPage</h1>
    </div>
  );
}
