"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const AuthButtons = () => {
  const sessions = useSession();

  return (
    <div>
      {sessions.status === "authenticated" ? (
        <button
          onClick={() => signOut()}
          className="btn btn-primary"
        >
          Logout
        </button>
      ) : (
        <Link
          href="/login"
          className="btn btn-primary btn-outline"
        >
          Log in
        </Link>
      )}
    </div>
  );
};

export default AuthButtons;