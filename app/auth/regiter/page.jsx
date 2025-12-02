"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { publicApi } from "../.././lib/publicApi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./register.css";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      setError("");

      const res = await publicApi.register(data);

      const accessToken = res?.tokens?.accessToken;
      const refreshToken = res?.tokens?.refreshToken;
      const role = res?.user?.role;

      if (!accessToken) throw new Error("Token missing from server");

      // ROLE WISE TOKEN SAVE
      if (role === "admin") {
        sessionStorage.setItem("adminToken", accessToken);
      } else if (role === "merchant") {
        sessionStorage.setItem("merchantToken", accessToken);
      } else if (role === "reseller") {
        sessionStorage.setItem("resellerToken", accessToken);
      } else {
        localStorage.setItem("accessToken", accessToken);
      }

      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }

      localStorage.setItem("role", role);

      router.push(role === "admin" ? "/admin/dashboard" : "/");

    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Create Account</h2>

        {error && <p className="error-text">{error}</p>}

        <label>Name</label>
        <input type="text" {...register("name")} placeholder="Your full name" required />

        <label>Email</label>
        <input type="email" {...register("email")} placeholder="your@example.com" required />

        <label>Password</label>
        <input type="password" {...register("password")} placeholder="Enter password" required />

        <label>Select Role</label>
        <select {...register("role")} required>
          <option value="customer">Customer</option>
          <option value="merchant">Merchant</option>
          <option value="reseller">Reseller</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" className="btn-register">Register</button>

        <p className="footer-text">
          Already have an account? <Link href="/auth/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
