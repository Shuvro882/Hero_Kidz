import { getCart } from "@/actions/server/cart";
import ClientCart from "@/components/home/ClientCart";

import React from "react";

const CartPage = async () => {
  const cartItems = await getCart();
  const formattedItems = cartItems.map(item=>({...item,_id:item._id.toString()}))

  return (
    <div>
         <ClientCart cartItems={formattedItems}></ClientCart>
    </div>
  );
};

export default CartPage;