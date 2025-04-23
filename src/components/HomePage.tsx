import { ToggleButton } from "./ToggleButton";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div
      className="w-full h-screen flex justify-between min-h-[1180px]"
      onClick={() => navigate("/type")}
    >
      <img src="src/assets/Promotion.png" className="w-full z-0" />
      <img
        src="src/assets/Curves-green.svg"
        className="absolute w-full h-[45%] bg-no-repeat bg-bottom bg-contain z-10 self-end"
      />
      <div className="absolute h-[28%] w-full bg-(--green-mcdonalds) flex justify-around items-start z-20 self-end">
        <div className="pl-[2rem]">
          <img src="src/assets/McDonalds.svg" alt="Logo" />
        </div>
        <div className="flex pr-[2rem] items-center justify-center h-[15rem] flex-col gap-3">
          <p className="text-[35px] text-white font-[var(--font-global)]">
            {t("Touch to start")}
          </p>
          <div className="flex justify-center items-center flex-col gap-3">
            <ToggleButton />
          </div>
        </div>
      </div>
    </div>
  );
};
