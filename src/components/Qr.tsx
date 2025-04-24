import { useNavigate } from "react-router-dom";
import Slider from "./Slider";

export const Qr: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-[1000px] max-h-[1180px] flex flex-col items-center">
      <div className="min-w-[820px] min-h-[30%] relative overflow-hidden">
        <Slider />
      </div>

      <div className="flex flex-col items-center mt-32 space-y-6">
        <p className="text-3xl font-bold text-center text-gray-800">
          Order complete! Enjoy every bite!
        </p>

        <p className="text-2xl font-semibold text-center text-gray-600 mt-4">
          Here is your Order!
        </p>

        <img
          src="src/assets/qr.png"
          alt="QR Code"
          className="w-52 h-52 border border-gray-300 rounded-lg shadow-md mt-8"
        />

        <button
          className="mt-32 px-6 py-3 bg-(--yellow-mcdonalds) text-black text-xl font-semibold rounded-lg shadow-md cursor-default" 
          onClick={() => navigate('/')}
        >
          Finish
        </button>
      </div>
    </div>
  );
};
