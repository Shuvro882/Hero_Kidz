"use client"

import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'

const CartButton = ({ product }) => {
    const isLogin = false;
    const router = useRouter();
    const path = usePathname();

    const add2Cart = () =>{
        if(isLogin) alert(product._id);
        else{
            router.push(`/login?callbackUrl=${path}`);
        }
    }
    return (
        <button 
        onClick={add2Cart}
        className="btn btn-primary w-full">
            <FaShoppingCart />
            Add To Cart
        </button>
    )
}

export default CartButton