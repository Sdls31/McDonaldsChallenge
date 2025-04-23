import { useNavigate } from "react-router-dom";
import Slider from "./Slider";

interface WrapperProps {
  Component?: React.ReactNode;
  Title?: string;
  BackStep?: string;
}

export const Layout: React.FC<WrapperProps> = ({
  Component,
  Title,
  BackStep,
}) => {
  const navigate = useNavigate();

  return (
    <div className="h-[1000px] max-h-[1180px]">
      <div className="min-w-[820px] min-h-[30%] relative overflow-hidden">
        <Slider />
      </div>
      <div>
        <div className="ml-[2rem] flex justify-between max-w-[820px] items-end overflow-hidden">
          <button
            className="mt-12 rounded-full border border-gray-200 bg-white p-3 relative z-20"
            onClick={() => {
              navigate(BackStep || "/main");
            }}
          >
            <img src="src/assets/Vector.svg" alt="Botón" className="w-6 h-6" />
          </button>

          <div className="w-80 bg-[var(--yellow-mcdonalds)] rounded-bl-2xl py-2">
            <p className="font-[var(--font-global)] text-[25px] pl-4 pr-4 font-bold leading-tight whitespace-normal break-words">
              {Title ? Title : "Menu"}
            </p>
          </div>
        </div>
        <div className="mx-[2rem] h-[40rem] max-h-[40rem]">
          {Component ?? "Loading"}
        </div>
      </div>
    </div>
  );
};
