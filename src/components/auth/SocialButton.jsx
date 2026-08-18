"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

const SocialButton = () => {
const params = useSearchParams();
console.log(params.get("callbackUrl") || "/");

  const handleSignIn = async()=>{
    const result = await signIn("google",
      {
      //  redirect: 'false',
       callbackUrl: params.get("callbackUrl") || "/",
       });
    console.log(result);
    if(result.ok){
      Swal.fire("success","welcome","success");

    }else{
      Swal.fire("error","sorry","error")
    }
  };
  return (
    <button
      type="button"
      onClick={handleSignIn}
      className="btn btn-outline w-full"
    >
      <FcGoogle className="text-xl" />
      Continue with Google
    </button>
  );
};

export default SocialButton;