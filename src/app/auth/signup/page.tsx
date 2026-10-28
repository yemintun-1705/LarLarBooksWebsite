"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password length
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);

    try {
      // Register user
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Check if email confirmation is required
      if (data.requiresEmailConfirmation) {
        setError(data.message);
        setIsLoading(false);
        // Don't try to sign in - user needs to confirm email first
        return;
      }

      // Sign in after successful registration (only if no email confirmation required)
      const signInResult = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (signInResult?.error) {
        setError("Registration successful! Please sign in manually.");
        setIsLoading(false);
        return;
      }

      // Redirect to home page
      router.push("/");
    } catch (error) {
      console.error("Sign up error:", error);
      setError(error instanceof Error ? error.message : "Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#181818] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center space-x-2 mb-6">
            <Image
              src="/logo.png"
              alt="LarLar Books logo"
              width={40}
              height={40}
              className="rounded-none"
            />
            <span className="font-bold text-2xl text-white">LarLar Books</span>
          </Link>
          <h1 className="text-white text-3xl font-bold mb-2">Join Us Today</h1>
          <p className="text-gray-400 text-sm">
            Create your account and start exploring thousands of books
          </p>
        </div>

        {/* Sign Up Card */}
        <div className="bg-brown rounded-2xl p-8 shadow-xl border border-[#454545]">
        {/* Error Display */}
        {error && (
          <div
            role="alert"
            className="mb-4 flex items-start gap-3 rounded-lg border border-red-400 bg-error-color p-3"
          >
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M11 7h2v6h-2V7zm0 8h2v2h-2v-2z" />
              <path fill="currentColor" d="M1 21h22L12 2 1 21z" />
            </svg>
            <div className="space-y-1">
              <p className="text-white text-sm font-medium">Sign up failed</p>
              <p className="text-white/90 text-xs">{error}</p>
            </div>
          </div>
        )}

        {/* Email Sign Up Inputs */}
        <form className="space-y-4 mb-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Full name</label>
            <input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              disabled={isLoading}
              className="block w-full px-4 py-3 bg-[#202020] rounded-[10px] leading-5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-p3 focus:border-transparent text-white border border-[#454545] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={isLoading}
              className="block w-full px-4 py-3 bg-[#202020] rounded-[10px] leading-5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-p3 focus:border-transparent text-white border border-[#454545] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              disabled={isLoading}
              className="block w-full px-4 py-3 bg-[#202020] rounded-[10px] leading-5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-p3 focus:border-transparent text-white border border-[#454545] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Confirm password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              disabled={isLoading}
              className="block w-full px-4 py-3 bg-[#202020] rounded-[10px] leading-5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-p3 focus:border-transparent text-white border border-[#454545] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-p2 hover:bg-p1 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

          {/* Additional Info */}
          <p className="text-center text-xs text-gray-400">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="text-p3 hover:text-p2 transition-colors">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-p3 hover:text-p2 transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>

        {/* Sign In Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="text-p3 hover:text-p2 font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-4">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
