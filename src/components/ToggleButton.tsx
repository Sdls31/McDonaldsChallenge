import { useTranslation } from "react-i18next";

export const ToggleButton = () => {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;

  const handleChangeLanguage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const newLang = currentLanguage === "es" ? "en" : "es";
    i18n.changeLanguage(newLang);
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
              currentLanguage === "en" ? "translate-x-12" : "translate-x-0"
            }`}
          >
            {currentLanguage === "en" ? "En" : "Es"}
          </div>
        </button>
      </div>
    </div>
  );
};
