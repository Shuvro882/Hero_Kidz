import { getSingleProduct } from "@/actions/server/product";
import Image from "next/image";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { BsLightningChargeFill } from "react-icons/bs";
import { MdVerified } from "react-icons/md";

const ProductDetails = async ({ params }) => {
  const { id } = await params;

  const product = await getSingleProduct(id);

  const {
    title,
    bangla,
    image,
    price,
    discount,
    ratings,
    reviews,
    sold,
    description,
    info,
    qna,
  } = product;

  const discountedPrice = price - (price * discount) / 100;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Image */}
        <div className="bg-base-200 rounded-xl p-6">
          <Image
            src={image}
            alt={title}
            width={600}
            height={600}
            unoptimized
            className="w-full h-[450px] object-contain"
          />
        </div>

        {/* Product Info */}
        <div>

          <h1 className="text-4xl font-bold">
            {title}
          </h1>

          <p className="text-lg text-base-content/70 mt-2">
            {bangla}
          </p>

          <div className="flex items-center gap-4 mt-5">

            <div className="flex items-center gap-1">
              <FaStar className="text-warning" />
              <span>{ratings}</span>
            </div>

            <span>{reviews} Reviews</span>

            <span>{sold} Sold</span>

          </div>

          <div className="mt-6 flex items-center gap-3">

            <span className="text-4xl font-bold text-primary">
              ৳{discountedPrice.toLocaleString()}
            </span>

            <span className="line-through text-base-content/50">
              ৳{price.toLocaleString()}
            </span>

            <div className="badge badge-error">
              -{discount}%
            </div>

          </div>

          <p className="mt-8 leading-8 text-base-content/80">
            {description}
          </p>

          <div className="divider"></div>

          <h3 className="font-bold text-xl mb-3">
            Features
          </h3>

          <ul className="space-y-2">
            {info?.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-2"
              >
                <MdVerified className="text-success" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex gap-4">

            <button className="btn btn-primary flex-1">
              <FaShoppingCart />
              Add To Cart
            </button>

            <button className="btn btn-success flex-1">
              <BsLightningChargeFill />
              Buy Now
            </button>

          </div>

        </div>

      </div>

      {/* FAQ */}

      <div className="mt-16">

        <h2 className="text-3xl font-bold mb-6">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">

          {qna?.map((item, index) => (
            <div
              key={index}
              className="collapse collapse-arrow bg-base-200"
            >
              <input type="radio" name="faq" />

              <div className="collapse-title font-semibold">
                {item.question}
              </div>

              <div className="collapse-content">
                {item.answer}
              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default ProductDetails;