"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { publicApi } from "./../../lib/publicApi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../auth.css";

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

      if (!accessToken) throw new Error("Token missing from server");

      // ----------------------------
      // ROLE-WISE TOKEN STORAGE
      // ----------------------------
      if (role === "admin") {
        sessionStorage.setItem("adminToken", accessToken);
      } else if (role === "merchant") {
        sessionStorage.setItem("merchantToken", accessToken);
      } else if (role === "reseller") {
        sessionStorage.setItem("resellerToken", accessToken);
      } else {
        localStorage.setItem("accessToken", accessToken);
      }

      // Save refresh token (common)
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }

      localStorage.setItem("role", role);

      // ----------------------------
      // ROLE-WISE REDIRECT
      // ----------------------------
      if (role === "admin") {
        router.push("/admin/dashboards");
      } else if (role === "merchant") {
        router.push("/merchant/dashboard");
      } else if (role === "reseller") {
        router.push("/reseller/dashboard");
      } else {
        router.push("/");
      }

    } catch (err) {
      console.log(err);
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <label style={{ color: "black" }}>Email</label>
        <input type="email" {...register("email")} required />

        <label style={{ color: "black" }}>Password</label>
        <input type="password" {...register("password")} required />

        <button type="submit">Login</button>

        <p className="footer-text">
          Don’t have an account? <Link href="/auth/regiter">Register</Link>
        </p>
      </form>
    </div>
  );
}
