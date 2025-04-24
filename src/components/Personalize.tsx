import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "../components/Layout";
import { useLocation, useNavigate } from "react-router-dom";
// import { RoutesEnum } from "../router/RoutesEnum";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { findMenuItemByTitle } from "../types/MenuDetails";
import { useCart } from "../context/CartContext";
type Ingredients = {
  topBun: boolean;
  bottomBun: boolean;
  lettuce: number;
  tomato: number;
  meat: number;
  cheese: number;
};

export const Personalize = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const previousIndexRefMeat = useRef(0);
  const previousIndexRefCheese = useRef(0);
  const location = useLocation();
  const { product } = location.state || {};
  const burgerObject = findMenuItemByTitle(product.name);
  const { addToCart } = useCart();
  const [meatPrice, setMeatPrice] = useState<number>(0);
  const [cheesePrice, setCheesePrice] = useState<number>(0);

  const prices = {
    meat: 1.99,
    cheese: 0.99,
    lettuce: 1.59,
    tomato: 4.9,
  };

  const meatImgArray = [
    { img: "src/assets/Personalize/Meat1.svg" },
    { img: "src/assets/Personalize/Meat2.svg" },
    { img: "src/assets/Personalize/Meat3.svg" },
  ];

  const cheeseImgArray = [
    { img: "src/assets/Personalize/Cheese1.svg" },
    { img: "src/assets/Personalize/Cheese2.svg" },
    { img: "src/assets/Personalize/Cheese3.svg" },
  ];

  const [ingredients, setIngredients] = useState<Ingredients>({
    topBun: true,
    bottomBun: true,
    lettuce: 1,
    tomato: 1,
    meat: 1,
    cheese: 1,
  });

  const toggleIngredient = (ingredient: keyof Ingredients) => {
    setIngredients((prev) => {
      if (ingredient === "lettuce" || ingredient === "tomato") {
        return {
          ...prev,
          [ingredient]: prev[ingredient] === 0 ? 1 : 0,
        };
      }

      if (ingredient === "meat" || ingredient === "cheese") {
        if (prev[ingredient] < 3) {
          return {
            ...prev,
            [ingredient]: prev[ingredient] + 1,
          };
        }
        return prev;
      }

      return prev;
    });
  };

  const isLettuceOrTomatoActive = (ingredient: keyof Ingredients) => {
    const ingredientValue = ingredients[ingredient];
    return typeof ingredientValue === "number" && ingredientValue > 0;
  };

  const isMeatOrCheeseActive = (ingredient: keyof Ingredients) => {
    const ingredientValue = ingredients[ingredient];
    return typeof ingredientValue === "number" && ingredientValue < 3;
  };
  // Calcular ingredientes visibles
  const totalIngredients =
    (ingredients.topBun ? 1 : 0) +
    (ingredients.bottomBun ? 1 : 0) +
    (ingredients.lettuce > 0 ? 1 : 0) +
    (ingredients.tomato > 0 ? 1 : 0) +
    ingredients.meat +
    ingredients.cheese;

  // Ajustar tamaño y espacio dinámicamente
  const ingredientSize = totalIngredients > 7 ? 140 : 170;
  const bottomBunSize = totalIngredients > 7 ? 220 : 260;
  const topBunSize = totalIngredients > 7 ? 140 : 170;
  const spacingClass = totalIngredients > 7 ? "space-y-[4px]" : "space-y-[8px]";
  const meatSwiperRef = useRef<any>(null);
  const cheeseSwiperRef = useRef<any>(null);

  const PersonalizeContent = (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col items-center justify-center relative w-full">
        <div className="relative h-[400px] w-full flex flex-col items-center justify-center mt-24 ">
          <div
            className={`burger-stack ${spacingClass} flex flex-col items-center`}
          >
            {ingredients.topBun && (
              <img
                src="src/assets/Personalize/bread1.svg"
                alt="Top Bun"
                style={{ width: `${topBunSize}px` }}
                className="z-30 transition-all duration-300"
              />
            )}
            {ingredients.lettuce > 0 && (
              <img
                src="src/assets/Personalize/lettuce.svg"
                alt="Lettuce"
                style={{ width: `${ingredientSize}px` }}
                className="z-30 transition-all duration-300"
              />
            )}
            {ingredients.tomato > 0 && (
              <img
                src="src/assets/Personalize/tomato.svg"
                alt="Tomato"
                style={{ width: `${ingredientSize}px` }}
                className="z-30 transition-all duration-300 "
              />
            )}
            {/* Swiper Cheese*/}
            <Swiper
              onSwiper={(swiper) => (cheeseSwiperRef.current = swiper)}
              onSlideChange={(swiper) => {
                const newIndex = swiper.realIndex;
                const prevIndex = previousIndexRefCheese.current;

                if (newIndex > prevIndex) {
                  setIngredients({
                    ...ingredients,
                    cheese: ingredients.cheese + 1,
                  });
                  setCheesePrice(cheesePrice + prices.cheese);
                } else if (newIndex < prevIndex) {
                  setIngredients({
                    ...ingredients,
                    cheese: ingredients.cheese - 1,
                  });
                  setCheesePrice(cheesePrice - prices.cheese);
                }

                previousIndexRefCheese.current = newIndex;
              }}
              spaceBetween={50}
              slidesPerView={1}
              className="w-[200px] h-[60px]"
            >
              {cheeseImgArray.map((item, index) => (
                <SwiperSlide
                  key={index}
                  className="flex justify-center items-center w-full h-full"
                >
                  <div className="w-full h-full flex justify-center items-center">
                    <img
                      src={item.img}
                      alt={`cheese-${index}`}
                      style={{ maxWidth: `${ingredientSize}px` }}
                      className=" max-h-full object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Swiper Carne*/}
            <Swiper
              onSwiper={(swiper) => (meatSwiperRef.current = swiper)}
              spaceBetween={50}
              slidesPerView={1}
              className="w-[200px] h-[80px]"
              onSlideChange={(swiper) => {
                const newIndex = swiper.realIndex;
                const prevIndex = previousIndexRefMeat.current;

                if (newIndex > prevIndex) {
                  setIngredients({
                    ...ingredients,
                    meat: ingredients.meat + 1,
                  });
                  setMeatPrice(meatPrice + prices.meat);
                } else if (newIndex < prevIndex) {
                  setIngredients({
                    ...ingredients,
                    meat: ingredients.meat - 1,
                  });
                  setMeatPrice(meatPrice - prices.meat);
                }

                previousIndexRefMeat.current = newIndex;
              }}
            >
              {meatImgArray.map((item, index) => (
                <SwiperSlide
                  key={index}
                  className="flex justify-center items-center w-full h-full"
                >
                  <div className="w-full h-full flex justify-center items-center">
                    <img
                      src={item.img}
                      alt={`meat-${index}`}
                      style={{ maxWidth: `${ingredientSize - 10}px` }}
                      className=" max-h-full object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {ingredients.bottomBun && (
              <img
                src="src/assets/Personalize/bread2.svg"
                alt="Bottom Bun"
                style={{ width: `${bottomBunSize}px` }}
                className="z-10 transition-all duration-300"
              />
            )}
          </div>
          {/* <div className="absolute w-full flex flex-col items-center">
            <div
              className={`burger-stack ${spacingClass} flex flex-col items-center`}
            >
              {ingredients.topBun && (
                <img
                  src="src/assets/Personalize/bread1.svg"
                  alt="Top Bun"
                  style={{ width: `${topBunSize}px` }}
                  className="z-50 transition-all duration-300"
                />
              )}
              {ingredients.lettuce > 0 && (
                <img
                  src="src/assets/Personalize/lettuce.svg"
                  alt="Lettuce"
                  style={{ width: `${ingredientSize}px` }}
                  className="z-40 transition-all duration-300"
                />
              )}
              {ingredients.tomato > 0 && (
                <img
                  src="src/assets/Personalize/tomato.svg"
                  alt="Tomato"
                  style={{ width: `${ingredientSize}px` }}
                  className="z-30 transition-all duration-300"
                />
              )}
              {[...Array(ingredients.cheese)].map((_, i) => (
                <img
                  key={`cheese-${i}`}
                  src="src/assets/Personalize/cheese.svg"
                  alt="Cheese"
                  style={{ width: `${ingredientSize}px` }}
                  className="z-30 transition-all duration-300"
                />
              ))}
              {[...Array(ingredients.meat)].map((_, i) => (
                <img
                  key={`meat-${i}`}
                  src="src/assets/Personalize/meat.svg"
                  alt="Meat"
                  style={{ width: `${ingredientSize + 10}px` }}
                  className="z-20 transition-all duration-300"
                />
              ))}
              {ingredients.bottomBun && (
                <img
                  src="src/assets/Personalize/bread2.svg"
                  alt="Bottom Bun"
                  style={{ width: `${bottomBunSize}px` }}
                  className="z-10 transition-all duration-300"
                />
              )}
            </div>
          </div> */}

          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex flex-col items-end space-y-6">
            {/* Lechuga */}
            <div className="flex items-center space-x-2">
              {ingredients.lettuce > 1 && (
                <span className="text-sm font-medium">Label</span>
              )}
              <button
                onClick={() => toggleIngredient("lettuce")}
                className={`w-24 h-24 rounded-full border-2 ${
                  isLettuceOrTomatoActive("lettuce")
                    ? "border-black/20 bg-gray-300"
                    : "border-black/20 bg-white"
                } flex items-center justify-center shadow-md`}
                disabled={ingredients.lettuce === 1}
              >
                <img
                  src="src/assets/Personalize/lettuce.svg"
                  alt="Lettuce"
                  className="w-16 h-16"
                />
              </button>
            </div>

            {/* Tomate */}
            <div className="flex items-center space-x-2">
              {ingredients.tomato > 1 && (
                <span className="text-sm font-medium">Label</span>
              )}
              <button
                onClick={() => toggleIngredient("tomato")}
                className={`w-24 h-24 rounded-full border-2 ${
                  isLettuceOrTomatoActive("tomato")
                    ? "border-black/20 bg-gray-300"
                    : "border-black/20 bg-white"
                } flex items-center justify-center shadow-md`}
                disabled={ingredients.tomato === 1}
              >
                <img
                  src="src/assets/Personalize/tomato.svg"
                  alt="Tomato"
                  className="w-16 h-16"
                />
              </button>
            </div>

            {/* Carne */}
            <div className="flex items-center space-x-2">
              {ingredients.meat > 1 && (
                <span className="text-sm font-medium">+{meatPrice}</span>
              )}
              <button
                onClick={() => {
                  toggleIngredient("meat");
                  meatSwiperRef.current?.slideNext();
                }}
                className={`w-24 h-24 rounded-full border-2 ${
                  isMeatOrCheeseActive("meat")
                    ? "border-black/20 bg-white"
                    : "border-black/20 bg-gray-300"
                } flex items-center justify-center shadow-md`}
                disabled={ingredients.meat >= 3}
              >
                <img
                  src="src/assets/Personalize/meat.svg"
                  alt="Meat"
                  className="w-16 h-16"
                />
              </button>
            </div>

            {/* Queso */}
            <div className="flex items-center space-x-2">
              {ingredients.cheese > 1 && (
                <span className="text-sm font-medium">
                  +{cheesePrice.toFixed(2)}
                </span>
              )}
              <button
                onClick={() => {
                  toggleIngredient("cheese");
                  cheeseSwiperRef.current?.slideNext();
                }}
                className={`w-24 h-24 rounded-full border-2 ${
                  isMeatOrCheeseActive("cheese")
                    ? "border-black/20 bg-white"
                    : "border-black/20 bg-gray-300"
                } flex items-center justify-center shadow-md`}
                disabled={ingredients.cheese >= 3}
              >
                <img
                  src="src/assets/Personalize/cheese.svg"
                  alt="Cheese"
                  className="w-16 h-16"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4">
        <div className="text-xl font-bold mb-4 text-center">
          ${burgerObject?.price}
        </div>
        <button
          className="py-3 px-6 bg-yellow-400 rounded-[10px] font-semibold hover:bg-yellow-500 transition-colors mx-auto block"
          onClick={() => {
            addToCart({
              id: burgerObject?.id?.toString() ?? "0",
              name: burgerObject?.title ?? "",
              price: burgerObject?.price ?? 0,
              quantity: 1,
              image: burgerObject?.img ?? "",
            });
            navigate("/main");
          }}
        >
          {t("Add to cart")}
        </button>
      </div>
    </div>
  );

  return (
    <Layout Component={PersonalizeContent} Title="Big Mac®" BackStep="/main" />
  );
};
