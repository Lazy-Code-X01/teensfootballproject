"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 800));

    if (email === "admin@tfp.com" && password === "admin123") {
      document.cookie = "tfp-admin-token=demo-token; path=/; max-age=86400";
      router.push("/admin/dashboard");
    } else {
      setError("Invalid email or password.");
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      {/* Blurred background */}
      <div
        className="absolute inset-0 scale-105"
        style={{
          backgroundImage: "url('/home-test-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(12px)",
        }}
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 w-full max-w-md rounded-2xl bg-[#0d0d0d] p-10">

        {/* Logo */}
        <div className="mb-8 text-center">
          <p className="font-display text-4xl text-primary">TFP</p>
          <p className="mt-1 font-sans text-sm text-gray-400">Admin Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="mb-1 block font-sans text-xs text-gray-400">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@tfp.com"
              required
              className="w-full rounded-xl bg-[#1a1a1a] border border-gray-800 px-3 py-2.5 font-sans text-sm text-white outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="mb-1 block font-sans text-xs text-gray-400">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-xl bg-[#1a1a1a] border border-gray-800 px-3 py-2.5 pr-10 font-sans text-sm text-white outline-none focus:border-primary transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-2 font-sans text-xs text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex w-full items-center justify-center rounded-full bg-primary py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
          >
            {loading ? (
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="mt-6 text-center font-sans text-xs text-gray-600">
          Secured admin access only
        </p>
      </div>
    </div>
  );
}
