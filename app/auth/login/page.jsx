"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { publicApi } from "../../lib/publicApi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./auth.css";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      setError("");

      const res = await publicApi.login(data);

      const accessToken = res?.tokens?.accessToken;
      const refreshToken = res?.tokens?.refreshToken;
      const role = res?.user?.role;

      if (!accessToken) throw new Error("Token missing");

      // role-based storage
      if (role === "admin") {
        sessionStorage.setItem("adminToken", accessToken);
      } else if (role === "merchant") {
        sessionStorage.setItem("merchantToken", accessToken);
      } else {
        localStorage.setItem("accessToken", accessToken);
      }

      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }

      localStorage.setItem("role", role);

      await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ token: accessToken }),
      });

      router.push(role === "admin" ? "/admin/dashboards" : "/");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="overlay"></div>

      <form className="auth-card" onSubmit={handleSubmit(onSubmit)}>
        <h2>User Login</h2>

        {error && <p className="error">{error}</p>}

        <label>Email</label>
        <input type="email" placeholder="type here" {...register("email")} required />

        <label>Password</label>
        <input type="password" placeholder="type here" {...register("password")} required />

        <p className="link-text">
          Don’t have an account? <Link href="/auth/regiter">click here</Link>
        </p>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
