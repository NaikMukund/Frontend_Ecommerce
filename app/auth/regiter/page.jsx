"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { publicApi } from "../../lib/publicApi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./register.css";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
const { register, handleSubmit } = useForm({
  defaultValues: {
    role: "customer",
  },
});


  const onSubmit = async (data) => {
    try {
      setError("");

      const res = await publicApi.register(data);

      const accessToken = res?.tokens?.accessToken;
      const refreshToken = res?.tokens?.refreshToken;
      const role = res?.user?.role;

      if (!accessToken) throw new Error("Token missing from server");

      // Role-wise token storage
      if (role === "admin") {
        localStorage.setItem("adminToken", accessToken);
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
    <div className="auth-wrapper">
      <div className="overlay"></div>

      <form className="auth-card" onSubmit={handleSubmit(onSubmit)}>
        <h2>User Sign Up</h2>

        {error && <p className="error">{error}</p>}

        <label>Name</label>
        <input
          type="text"
          placeholder="type here"
          {...register("name")}
          required
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="type here"
          {...register("email")}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="type here"
          {...register("password")}
          required
        />

    

        <p className="link-text">
          Already have account? <Link href="/auth/login">click here</Link>
        </p>

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}
