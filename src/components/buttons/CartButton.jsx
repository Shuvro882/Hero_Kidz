"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { handleCart } from "@/actions/server/cart";
import Swal from "sweetalert2";

const CartButton = ({ product }) => {
  const { data: session, status } = useSession();

  const router = useRouter();
  const path = usePathname();
  const islogin = status == "authenticated";
  const [isLoading,setIsLoading] = useState(false);
  
  
  const add2Cart = async() => {
    setIsLoading(true);
    if (islogin) {
      const result = await handleCart({product, inc: true})
      if(result.success){
        Swal.fire("Added to Cart", product?.title, "success");

      }else{
        Swal.fire("Opps", "Something Wrong Happen", "error")
      }
    setIsLoading(false);
    } else {
      router.push(`/login?callbackUrl=${encodeURIComponent(path)}`);
      setIsLoading(false);
    }
  };

  return (
    <button
      disabled={status ==='loading' || isLoading}
      onClick={add2Cart}
      className="btn btn-primary w-full"
    >
      <FaShoppingCart />
      Add To Cart
    </button>
  );
};

export default CartButton;