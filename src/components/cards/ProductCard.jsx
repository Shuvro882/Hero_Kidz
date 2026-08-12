"use client";

import Image from "next/image";
import Link from "next/link";
import { FaStar, FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ product, onAddToCart }) => {
  const {
    title,
    image,
    price,
    discount,
    ratings,
    reviews,
    sold,
  } = product;

  const discountedPrice = price - (price * discount) / 100;

  return (
    <div className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <figure className="bg-base-200">
        <Image
          src={image}
          alt={title}
          width={300}
          height={300}
          unoptimized
          className="w-full h-56 object-contain"
        />
      </figure>

      <div className="card-body p-4">
        {/* Title */}
        <h2 className="font-semibold text-base line-clamp-2 min-h-12">
          {title}
        </h2>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1">
            <FaStar className="text-warning" />
            <span className="font-medium">{ratings}</span>
          </div>

          <span className="text-base-content/50">
            ({reviews} reviews)
          </span>
        </div>

        {/* Sold */}
        <p className="text-sm text-base-content/60">
          {sold} sold
        </p>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">
            ৳{discountedPrice.toLocaleString()}
          </span>

          {discount > 0 && (
            <span className="text-sm line-through text-base-content/40">
              ৳{price.toLocaleString()}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <div className="card-actions mt-4 flex-col">
          <button
            onClick={() => onAddToCart?.(product)}
            className="btn btn-primary w-full"
          >
            <FaShoppingCart />
            Add to Cart
          </button>

          <Link
            href={`/products/${product._id}`}
            className="btn btn-outline btn-primary w-full hover:btn-primary"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

