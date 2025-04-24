import { useState, useEffect } from "react";
import { ToggleButton } from "./ToggleButton";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FontSizeSelect } from "./FontSizeSelectProps";

export const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">(
    "small"
  );
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

      <div className="absolute h-[30%] w-full bg-[var(--green-mcdonalds)] flex justify-around items-start z-20 self-end">
        {/* Logo mantiene su posición */}
        <div className="pl-[2rem] pt-8">
          <img src="src/assets/McDonalds.svg" alt="Logo" />
        </div>

        {/* Columna de elementos a la derecha */}
        <div
          className="flex pr-[2rem] translate-y-[1rem] items-center justify-center flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Texto "Touch to start" */}
          <p
            className={`text-white font-bold font-[var(--font-global)] ${fontSizeClass} mb-4`}
          >
            {t("Touch to start")}
          </p>

          {/* Controles */}
          <div className="flex justify-center items-center flex-col gap-6">
            <ToggleButton />

            <div className="mb-6">
              <FontSizeSelect initialSize={fontSize} onChange={setFontSize} />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div
            className="bg-white rounded-2xl px-10 py-10 w-[95%] max-w-[560px] shadow-lg text-center flex flex-col items-center gap-6"
            onClick={(e) => e.stopPropagation()}
          >
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
                onClick={() => navigate("/type", { state: { avatar: true } })}
                className={`bg-[#FFC72C] text-black font-medium rounded-md shadow hover:brightness-95 transition ${modalButtonClass}`}
              >
                {t("Create my avatar")}
              </button>
              <button
                onClick={() => navigate("/type", { state: { avatar: false } })}
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
