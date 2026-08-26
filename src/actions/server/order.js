"use server";

import { authOptions } from "@/lib/authOption";
import { collections, dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { clearCart, getCart } from "./cart";
import { sendEmail } from "@/lib/sendEmail";
import { orderInvoiceTemplate } from "@/lib/orderInvoice";

const orderCollection = dbConnect(collections.ORDER);

export const createOrder=async(payload)=>{
    const { user } = (await getServerSession(authOptions)) || {};
    if(!user) return {success:false};

    const cart = await getCart();
    if(cart.length == 0){
        return{success: false};
    }
    

    const newOrder={
        createdAt:new Date().toString(),
        items:cart,
        ...payload,
    };

    const result = await orderCollection.insertOne(newOrder)
    if(Boolean(result.insertedId)){
        const result = await clearCart();
    }

     const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

    await sendEmail({
      to: user.email,
      subject: "Your Order Invoice - Hero Kidz",
      html: orderInvoiceTemplate({
        orderId: result.insertedId.toString(),
        items: cart,
        totalPrice,
      }),
    });
    
    return{
        success:result.insertedId,
    };
};


