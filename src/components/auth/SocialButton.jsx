"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const SocialButton = () => {
  return (
    <button
      type="button"
      onClick={() => signIn("google")}
      className="btn btn-outline w-full"
    >
      <FcGoogle className="text-xl" />
      Continue with Google
    </button>
  );
};

export default SocialButton;