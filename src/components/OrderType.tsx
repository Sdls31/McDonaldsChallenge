import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AvatarApp from "./AvatarApp";
import { DialogBox } from "./DialogBox";

export const OrderType: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<
    "eat-in" | "take-away" | null
  >(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedOption) {
      const timer = setTimeout(() => {
        navigate("/main");
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [selectedOption, navigate]);

  const handleEatInClick = () => {
    setSelectedOption("eat-in");
  };

  const handleTakeAwayClick = () => {
    setSelectedOption("take-away");
  };

  const getButtonClasses = (option: "eat-in" | "take-away") =>
    `flex flex-col items-center text-center p-4 cursor-pointer border-4 rounded-2xl transition-all duration-300 shadow-md
     ${
       selectedOption === option
         ? "bg-[#00422A] border-[6px] border-yellow-400 text-white scale-105"
         : "bg-white border-[4px] border-gray-300 hover:border-yellow-500 hover:shadow-lg hover:scale-105"
     }`;

  const positionAvatar = {
    top: "750px",
    left: "-30px",
  };

  const positionDialogBox = {
    top: "22.5rem",
    left: "11.5rem",
  };

  return (
    <>
      <AvatarApp position={positionAvatar} />
      <DialogBox
        text="How would I like my order?"
        side="left"
        positionAvatar={positionDialogBox}
        size="large"
      />
      <div className="h-[1000px] max-h-[1180px] relative">
        {/* Curvas y logo */}
        <div className="fixed inset-0 z-10 pointer-events-none">
          {/* Primer Greencurve */}
          <div className="absolute top-0 w-full h-[29%] z-[-1]">
            <img
              src="src/assets/Greencurve.svg"
              className="w-full h-full object-cover"
              alt="Green Curve"
            />
          </div>

          {/* Segundo Greencurve */}
          <div className="absolute top-[90%] w-full z-[-1]">
            <img
              src="src/assets/Greencurve2.svg"
              className="w-full h-full object-cover"
              alt="Green Curve 2"
            />
          </div>

          {/* Logo */}
          <img
            src="src/assets/McDonalds.svg"
            className="absolute top-0 left-0 z-20 p-[1rem] w-[7.5rem]"
            alt="Logo"
          />
        </div>

        {/* Cards */}
        <div className="flex items-center justify-center text-[#333]  rounded-t-[30px] p-8 mt-[65%] mx-4 relative z-20">
          <div className="flex gap-12 justify-center flex-wrap">
            <div
              className={getButtonClasses("eat-in")}
              onClick={handleEatInClick}
            >
              <img
                src="src/assets/eatin.svg"
                alt="Eat In"
                className="w-60 h-60 object-contain mx-auto"
              />
              <span className="text-2xl font-medium mt-2">{t("Eat in")}</span>
            </div>

            <div
              className={getButtonClasses("take-away")}
              onClick={handleTakeAwayClick}
            >
              <img
                src="src/assets/delivery.png"
                alt="Take Away"
                className="w-60 h-60 object-contain mx-auto"
              />
              <span className="text-2xl font-medium mt-2">
                {t("Take away")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
