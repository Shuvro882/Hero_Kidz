"use client";

import { decreaseItemDb, deleteItemsFromCart, increaseItemDb } from "@/actions/server/cart";
import Image from "next/image";
import { useState } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const CartItem = ({ cartItem, removeItem, updatedQuantity }) => {
  // const [quantity, setQuantity] = useState(cartItem.quantity);

  const {quantity, _id} = cartItem;
   
  const [loading,setLoading] = useState(false);


  const onIncrease = async() => {
    setLoading(true);
    const result = await increaseItemDb(_id, quantity)

    if(result.success){
      Swal.fire("success","quantity increased", "success")
      updatedQuantity(_id, quantity+1)
    }
    setLoading(false);
  };

  const onDecrease = async() => {
    setLoading(true);
    const result = await decreaseItemDb(_id, quantity)

    if(result.success){
      Swal.fire("success","quantity decreased", "success")
      updatedQuantity(_id, quantity -1)

    }
    setLoading(false);
  };

  const handleRemove = async() => {
    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, Remove it!"
}).then(async(result) => {
  if (result.isConfirmed) {

    const result = await deleteItemsFromCart(cartItem._id)
    

  if(result.success){
    removeItem(cartItem._id);

    Swal.fire({
    title: "Deleted!",
    text: "Your file has been deleted.",
    icon: "success"
  });
  }else{
    Swal.fire({
    title: "Opps!",
    text: "Something went wrong.",
    icon: "error"
  });
  }   
  }
});
  };

  return (
    <div className="card card-side bg-base-100 shadow-md border border-base-200 p-4">

      {/* Image */}
      <figure className="w-28 h-28 shrink-0">
        <Image
          src={cartItem.image}
          alt={cartItem.title}
          width={112}
          height={112}
          unoptimized
          className="w-full h-full object-contain rounded-lg"
        />
      </figure>

      {/* Content */}
      <div className="card-body p-0 pl-4">

        {/* Title */}
        <h2 className="card-title text-base md:text-lg">
          {cartItem.title}
        </h2>

        {/* Price */}
        <p className="text-lg font-semibold text-primary">
          ৳{cartItem.price}
        </p>

        {/* Quantity + Remove */}
        <div className="flex items-center justify-between gap-4 mt-2">

          {/* Quantity */}
          <div className="join border">
            <button
              onClick={onDecrease}
              disabled={quantity === 1 || loading}
              className="btn btn-sm join-item"
            >
              <FaMinus size={11} />
            </button>

            <span className="px-4 flex items-center justify-center font-semibold">
              {quantity}
            </span>

            <button
              onClick={onIncrease}
              disabled={quantity === 10 || loading}
              className="btn btn-sm join-item"
            >
              <FaPlus size={11} />
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={handleRemove}
            className="btn btn-sm btn-error btn-outline"
          >
            <FaTrash />
            <span className="hidden sm:inline">Remove</span>
          </button>

        </div>
      </div>
    </div>
  );
};

export default CartItem;