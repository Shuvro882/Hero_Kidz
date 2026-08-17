"use client";

import { postUser } from "@/actions/server/auth";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterForm = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);

  const params = useSearchParams();
  const callBackUrl = params.get("callbackUrl")|| "/";

  const handleRegister = async (e) => {
  e.preventDefault();

  const form = e.target;

  const name = form.name.value;
  const email = form.email.value;
  const password = form.password.value;

  const result = await postUser({
    name,
    email,
    password,
  });


console.log("result:", result);

  if (result?.acknowledged) {
    
    // router.push("/login");
    const result = await signIn("credentials",
      {email,
      password,
      callbackUrl: callBackUrl
    
    });
    alert("Successful. Please login");
  }
};

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-200">
        <div className="card-body">

          {/* Heading */}
          <h1 className="text-3xl font-bold text-center">
            Create Account
          </h1>

          <p className="text-center text-base-content/70">
            Join Hero Kidz today
          </p>

          <form onSubmit={handleRegister} className="space-y-5 mt-4">

            {/* Name */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Name
                </span>
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="input input-bordered w-full"
                required
              />
            </div>

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

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-gray-500 hover:text-primary"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="btn btn-outline w-full hover:bg-primary hover:border-primary hover:text-white"
            >
              Register
            </button>

          </form>

          {/* Login Link */}
          <p className="text-center mt-5 text-sm">
            Already have an account?{" "}

            <Link
              href="/login"
              className="text-primary font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default RegisterForm;