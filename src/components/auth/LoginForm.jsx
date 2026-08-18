"use client";

import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SocialButton from "./SocialButton";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const callBackUrl = params.get("callbackUrl") || "/";

  const handleLogin = async (e) => {

    e.preventDefault();

    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: params.get("callbackUrl") || "/",
    });

    console.log(result);
    if (!result.ok) {
      Swal.fire("error", "Email password not matched. Try Google Login / Register", "error");
    } else {
      Swal.fire("success", "Welcome to Kidz hub", "success");
      router.push(callBackUrl)

    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-200">
        <div className="card-body">

          {/* Heading */}
          <h1 className="text-3xl font-bold text-center">
            Login
          </h1>

          <p className="text-center text-base-content/70">
            Welcome back to Hero Kidz
          </p>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5 mt-4">

            {/* Email */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Email
                </span>
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Password
                </span>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full pr-12"
                  required
                />

                {/* Show / Hide Password */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-gray-500 hover:text-primary"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-outline w-full hover:bg-primary hover:border-primary hover:text-white"
            >
              Login
            </button>

            {/* Divider */}
            <div className="divider">
              OR
            </div>

            {/* Social Login */}
            <SocialButton />

          </form>

          {/* Register Link */}
          <p className="text-center mt-5 text-sm">
            Don't have an account?{" "}

            <Link
              href={`/register?callbackUrl=${encodeURIComponent(callBackUrl)}`}
              className="text-primary font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default LoginForm;