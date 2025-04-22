import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RoutesEnum } from "../router/RoutesEnum";
import { Layout } from "./Layout";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// Porciones disponibles (4, 6, 8, 10, 20 nuggets)
const PORTIONS = [4, 6, 8, 10, 20];
const PRICE_PER_NUGGET = 0.775;

const NuggetsPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [portionIndex, setPortionIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const [nuggets, setNuggets] = useState<number[]>(
    Array.from({ length: PORTIONS[0] }, (_, i) => i + 1)
  );

  const currentCount = PORTIONS[portionIndex];
  const price = (currentCount * PRICE_PER_NUGGET * quantity).toFixed(2);

  const handleIncrement = () => {
    if (portionIndex < PORTIONS.length - 1) {
      const newIndex = portionIndex + 1;
      const newCount = PORTIONS[newIndex];
      const difference = newCount - currentCount;

      setPortionIndex(newIndex);
      setNuggets((prev) => [
        ...prev,
        ...Array.from({ length: difference }, (_, i) => prev.length + i + 1),
      ]);
    }
  };

  const handleDecrement = () => {
    if (portionIndex > 0) {
      const newIndex = portionIndex - 1;
      const newCount = PORTIONS[newIndex];
      setPortionIndex(newIndex);
      setNuggets((prev) => prev.slice(0, newCount));
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-white font-poppins pt-12">
      <div className="w-full max-w-md flex flex-col items-center gap-8 px-6">
        <div className="text-2xl font-bold text-gray-700">
          {currentCount} McNuggets
        </div>
        <div className="relative w-[300px] h-[220px]">
          <img
            src="src/assets/NuggetBox.svg"
            alt="Nugget Box"
            className="w-full h-full object-contain"
          />
          <AnimatePresence>
            {nuggets.map((n, index) => (
              <motion.img
                key={n}
                src="src/assets/Nugget.svg"
                alt={`Nugget ${n}`}
                initial={{ y: -80, opacity: 0, scale: 0.5 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  x: ((index % 5) - 2) * 30,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="absolute top-[35px] left-1/2 -translate-x-1/2 w-12 h-12"
              />
            ))}
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleDecrement}
            className="text-2xl bg-gray-200 w-15 h-15 rounded-full flex justify-center items-center"
          >
            -
          </button>
          <span className="text-xl font-medium">{currentCount}</span>
          <button
            onClick={handleIncrement}
            className="text-2xl bg-gray-200 w-15 h-15 rounded-full flex justify-center items-center"
          >
            +
          </button>
        </div>
        <div className="flex justify-between items-center w-[12.5rem]">
          <div className="flex justify-center items-center px-[1rem] gap-[1rem] border-2 border-black rounded-full">
            <span
              className="text-[30px] font-bold"
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            >
              -
            </span>
            <span className="text-[20px] font-semi-bold">{quantity}</span>
            <span
              className="text-[30px] font-bold"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </span>
          </div>
          <div className="text-lg font-semibold text-gray-700">${price}</div>
        </div>
        <button
          className="py-3 px-6 bg-yellow-400 rounded-[10px] font-semibold hover:bg-yellow-500 transition-colors mx-auto block"
          onClick={() => navigate("/main")}
        >
          {t("Add to cart")}
        </button>
      </div>
    </div>
  );
};

export const NuggetsProcess = () => {
  return (
    <Layout
      Component={<NuggetsPage />}
      Title={"McNuggets"}
      BackStep={RoutesEnum.MAIN}
    />
  );
};
