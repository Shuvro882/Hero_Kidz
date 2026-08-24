"use client";

import React, { useMemo, useState } from "react";
import CartItem from "../cards/CartItem";

const ClientCart = ({ cartItems = [] }) => {
  const [items, setItems] = useState(cartItems);

  // Total Quantity
  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  // Total Price
  const totalPrice = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    [items]
  );

  // Remove Item
  const removeItem = (id) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item._id != id)
    );
  };

  // Update Quantity
  const updatedQuantity = (id, q) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id == id
          ? { ...item, quantity: q }
          : item
      )
    );
  };

  return (
    <div>
      {/* Cart Header */}
      <div className="mb-6 flex items-center justify-between rounded-xl bg-base-100 p-5 shadow-md border border-base-200">
        <div>
          <h2 className="text-2xl font-bold text-base-content">
            My Cart
          </h2>

          <p className="text-sm text-base-content/60 mt-1">
            Review your selected products
          </p>
        </div>

        <div className="badge badge-primary badge-lg font-semibold px-4 py-4">
          {items.length} {items.length === 1 ? "Item" : "Items"}
        </div>
      </div>

      {/* Cart Content */}
      <div className="flex flex-col lg:flex-row gap-6">

        {/* Cart Items */}
        <div className="flex-3 space-y-4">
          {items.map((item) => (
            <CartItem
              key={item._id.toString()}
              cartItem={{
                ...item,
                _id: item._id.toString(),
              }}
              removeItem={removeItem}
              updatedQuantity={updatedQuantity}
            />
          ))}
        </div>

        {/* Cart Summary */}
        <div className="flex-1">
          <div className="card bg-base-100 shadow-md border border-base-200 sticky top-5">
            <div className="card-body">

              <h2 className="card-title text-xl">
                Order Summary
              </h2>

              {/* Products */}
              <div className="space-y-4 mt-3">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="border-b border-base-200 pb-3"
                  >
                    <div className="flex justify-between gap-3">
                      
                      {/* Product Name */}
                      <div>
                        <p className="font-medium text-sm">
                          {item.title}
                        </p>

                        <p className="text-sm text-base-content/60 mt-1">
                          {item.quantity} × ৳{item.price}
                        </p>
                      </div>

                      {/* Product Total */}
                      <p className="font-semibold whitespace-nowrap">
                        ৳{item.price * item.quantity}
                      </p>

                    </div>
                  </div>
                ))}
              </div>

              {/* Total Quantity */}
              <div className="flex justify-between mt-3">
                <span className="text-base-content/70">
                  Total Items
                </span>

                <span className="font-semibold">
                  {totalItems}
                </span>
              </div>

              {/* Total Price */}
              <div className="flex justify-between mt-2 text-lg font-bold">
                <span>
                  Total Price
                </span>

                <span className="text-primary">
                  ৳{totalPrice}
                </span>
              </div>

              {/* Confirm Button */}
              <button className="btn btn-primary w-full mt-5">
                Confirm Order
              </button>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ClientCart;