import { getCart } from "@/actions/server/cart";
import CartItem from "@/components/cards/CartItem";
import React from "react";

const CartPage = async () => {
    const cartItems = await getCart();

    return (
        <div>
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
                    {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
                </div>
            </div>

            <div className="flex">
                <div className="flex-3 space-y-4">
                    {cartItems.map((item) => (
                        <CartItem
                            key={item._id.toString()}
                            cartItem={{
                                ...item,
                                _id: item._id.toString(),
                            }}
                        />
                    ))}
                </div>

                <div className="flex-1"></div>
            </div>
        </div>
    );
};

export default CartPage;