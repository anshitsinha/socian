"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/register");
      return;
    }
    if (token) {
      router.push("/dashboard");
      return;
    }
  }, [router]);

  return <div>Loading...</div>;
}
