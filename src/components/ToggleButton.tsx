import { useState } from "react";
import { useTranslation } from "react-i18next";

export const ToggleButton = () => {
  const [isOn, setIsOn] = useState<Boolean>(true);
  const { i18n, t } = useTranslation();

  const handleChangeLanguage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsOn(!isOn);
    i18n.changeLanguage(i18n.language === "es" ? "en" : "es");
  };

  return (
    <div className="flex flex-row gap-2">
      <div className="flex items-end justify-end pb-[0.5rem]">
        <img src="src/assets/TranslateLogo.svg" />
      </div>
      <div className="flex justify-center flex-col items-center gap-2">
        <p className="text-[25px] text-white font-[var(--font-global)]">
          {t("Language")}
        </p>
        <button
          onClick={(event) => handleChangeLanguage(event)}
          className="w-28 h-14 rounded-full bg-white relative flex items-center px-1 shadow-md"
        >
          <span className="absolute left-5 text-black font-bold z-0">Es</span>
          <span className="absolute right-6 text-black font-bold z-0">En</span>

          <div
            className={`w-14 h-12 rounded-full transition-transform duration-300 bg-yellow-400 shadow-md z-10 flex items-center justify-center font-bold text-black ${
              isOn ? "translate-x-12" : "translate-x-0"
            }`}
          >
            {isOn ? "En" : "Es"}
          </div>
        </button>
      </div>
    </div>
  );
};
