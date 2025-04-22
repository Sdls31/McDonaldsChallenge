import { useState } from "react";
import { Layout } from "./Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { findMenuItemByTitle } from "../types/MenuDetails";

export const Burger = () => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const { product } = location.state || {};
  const navigate = useNavigate();
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const burgerObject = findMenuItemByTitle(product.name);

  const burgerContent = (
    <div className="mt-6 flex flex-col md:flex-row max-w-[650px] mx-auto">
      <div className="w-full md:w-1/2">
        <div className="flex justify-center items-center mb-6">
          <img
            src="src/assets/Bigmac.svg"
            alt="Big Mac burger components"
            className="w-[275px] max-w-full h-auto"
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center border rounded-full">
            <button
              className="w-8 h-8 flex items-center justify-center text-gray-500"
              onClick={decreaseQuantity}
            >
              -
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button
              className="w-8 h-8 flex items-center justify-center text-gray-500"
              onClick={increaseQuantity}
            >
              +
            </button>
          </div>
          <div className="text-xl font-bold">${burgerObject?.price}</div>
        </div>
        <button
          onClick={() =>
            addToCart({
              id: burgerObject?.id?.toString() ?? "0",
              name: burgerObject?.title ?? "",
              price: burgerObject?.price ?? 0,
              quantity: quantity,
              image: burgerObject?.img ?? "",
            })
          }
          className="w-full py-3 bg-[var(--yellow-mcdonalds)] rounded-[10px] text-xl font-medium"
        >
          Add to cart
        </button>
      </div>
      <div className="w-full md:w-1/2 pl-0 md:pl-6 mt-6 md:mt-0">
        <div className="text-xl">{burgerObject?.calories} Cal.</div>
        <p className="text-xl leading-relaxed my-4">
          {burgerObject?.description}
        </p>
        <button
          className="text-2xl underline font-bold mb-8"
          onClick={() => {
            console.log("Click detectado");
            navigate("/personalize");
          }}
        >
          Personalize
        </button>
      </div>
    </div>
  );

  return (
    <Layout
      Component={burgerContent}
      Title={burgerObject?.title}
      BackStep="/main"
    />
  );
};
