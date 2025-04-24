import { useState, useEffect } from "react";
import { ToggleButton } from "./ToggleButton";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("small");
  const [showModal, setShowModal] = useState(false);

  const fontSizeClass =
    fontSize === "small"
      ? "text-[28px]"
      : fontSize === "large"
      ? "text-[42px]"
      : "text-[35px]";

  const modalTextClass =
    fontSize === "small"
      ? "text-base"
      : fontSize === "large"
      ? "text-2xl"
      : "text-xl";

  const modalButtonClass =
    fontSize === "small"
      ? "text-base py-2"
      : fontSize === "large"
      ? "text-xl py-4"
      : "text-lg py-3";

  useEffect(() => {
    const handleClick = () => {
      setShowModal(true);
      document.removeEventListener("click", handleClick);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="w-full h-screen flex justify-between min-h-[1180px] relative">
      <img src="src/assets/Promotion.png" className="w-full z-0" />
      <img
        src="src/assets/Curves-green.svg"
        className="absolute w-full h-[45%] bg-no-repeat bg-bottom bg-contain z-10 self-end"
      />

      <div className="absolute h-[28%] w-full bg-[var(--green-mcdonalds)] flex justify-around items-start z-20 self-end">
        <div className="pl-[2rem]">
          <img src="src/assets/McDonalds.svg" alt="Logo" />
        </div>

        <div className="flex pr-[2rem] items-center justify-center h-[15rem] flex-col gap-3">
          <p className={`text-white font-bold font-[var(--font-global)] ${fontSizeClass}`}>
            {t("Touch to start")}
          </p>

          <div className="flex justify-center items-center flex-col gap-3">
            <ToggleButton />

            <div className="flex flex-col items-center gap-3 text-white mt-2">
              <span className="font-bold text-2xl">{t("Font size")}</span>
              <div className="flex gap-3">
                {(["small", "medium", "large"] as const).map((size) => (
                  <button
                    key={size}
                    onClick={(e) => {
                      e.stopPropagation();
                      setFontSize(size);
                    }}
                    className={`px-6 py-2 text-xl rounded-full border transition ${
                      fontSize === size
                        ? "bg-white text-[var(--green-mcdonalds)] font-semibold"
                        : "bg-transparent border-white"
                    }`}
                  >
                    {t(
                      size === "small"
                        ? "Small"
                        : size === "medium"
                        ? "Medium"
                        : "Large"
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl px-10 py-10 w-[95%] max-w-[560px] shadow-lg text-center flex flex-col items-center gap-6">
            <h2 className={`font-semibold text-gray-900 ${modalTextClass}`}>
              {t("Make your order as yourself!")}
            </h2>
            <p className={`text-gray-700 ${modalTextClass}`}>
              {t("Could we create an avatar just like you?")}
            </p>

            <div className="w-full flex justify-center">
              <img
                src="src/assets/avatar-sample.svg"
                alt="avatar preview"
                className="w-[170px] h-auto"
              />
            </div>

            <div className="w-full flex flex-col gap-4 mt-4">
              <button
                onClick={() => navigate("/type")}
                className={`bg-[#FFC72C] text-black font-medium rounded-md shadow hover:brightness-95 transition ${modalButtonClass}`}
              >
                {t("Create my avatar")}
              </button>
              <button
                onClick={() => navigate("/type")}
                className={`bg-[#FFC72C] text-black font-medium rounded-md shadow hover:brightness-95 transition ${modalButtonClass}`}
              >
                {t("Continue to order")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
