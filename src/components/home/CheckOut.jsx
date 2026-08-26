"use client";

import { createOrder } from "@/actions/server/order";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import Swal from "sweetalert2";

const CheckOut = ({ cartItems = [] }) => {
  const session = useSession();
  const router = useRouter();

  // const [form, setForm] = useState({
  //   name: "",
  //   email: "",
  //   deliveryinformation: "",
  //   specialinformation: "",
  //   contactnumber: "",
  // });

  // Total Items
  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  // Total Price
  const totalPrice = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    [cartItems]
  );

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   setForm((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Checkout Data:", form, cartItems);
    const form= e.target;

    const payload = {
      name:form.name.value,
      email:form.email.value,
      contact:form.contactNo.value,
      address:form.deliveryinformation.value,
      instruction:form.specialInstruction.value,
    };
    const result = await createOrder(payload);

    if(result.success){
      Swal.fire("success", "Order Added","success");
      router.push("/")
    }else{
      Swal.fire("error","Something went wrong", "error");
      router.push("/cart")
    }
  };


  if(session.status=="loading"){
    return <h2>Loading..</h2>
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 py-6">

      {/* ================= LEFT : FORM ================= */}
      <div className="flex-3">

        <div className="card bg-base-100 shadow-md border border-base-200">
          <div className="card-body">

            <h2 className="text-2xl font-bold mb-4">
              Delivery Information
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* Name */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Full Name
                  </span>
                </label>

                <input
                  type="text"
                  name="name"
                  value={session?.data?.user?.name}
                  // onChange={handleChange}
                  placeholder="Enter your full name"
                  className="input input-bordered w-full"
                  required
                  readOnly
                />
              </div>

              {/* Email */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Email
                  </span>
                </label>

                <input
                  type="email"
                  name="email"
                  value={session?.data?.user?.email}
                  // onChange={handleChange}
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                  required
                  readOnly
                />
              </div>

              {/* Contact */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Contact Number
                  </span>
                </label>

                <input
                  type="tel"
                  name="contactNo"
                  // value={form.contactnumber}
                  // onChange={handleChange}
                  placeholder="01XXXXXXXXX"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Delivery Information */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Delivery Information
                  </span>
                </label>

                <textarea
                  name="deliveryinformation"
                  // value={form.deliveryinformation}
                  // onChange={handleChange}
                  placeholder="Enter your full delivery address"
                  className="textarea textarea-bordered w-full h-28"
                  required
                ></textarea>
              </div>

              {/* Special Instruction */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Special Instruction
                  </span>
                </label>

                <textarea
                  name="specialInstruction"
                  // value={form.specialinformation}
                  // onChange={handleChange}
                  placeholder="Any special instructions?"
                  className="textarea textarea-bordered w-full h-24"
                ></textarea>
              </div>

              {/* Checkout Button */}
              <button
                type="submit"
                className="btn btn-primary w-full mt-3"
              >
                Checkout ৳{totalPrice}
              </button>

            </form>

          </div>
        </div>

      </div>


      {/* ================= RIGHT : ORDER SUMMARY ================= */}
      <div className="flex-1">

        <div className="card bg-base-100 shadow-md border border-base-200 sticky top-5">

          <div className="card-body">

            <h2 className="card-title text-xl">
              Order Summary
            </h2>

            {/* Products */}
            <div className="space-y-4 mt-3">

              {cartItems.map((item) => (

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

            {/* Total Items */}
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

          </div>

        </div>

      </div>

    </div>
  );
};

export default CheckOut;