import { Layout } from "./Layout";
import { useNavigate } from "react-router-dom";

export const HappyMealPage = () => {
  const navigate = useNavigate();

  const happyMealContent = (
    <div className="mt-6 flex flex-col max-w-[650px] mx-auto items-center text-center px-4">
      <img
        src="src/assets/MenuItems/HappyMeal.svg"
        alt="Happy Meal Box"
        className="w-[240px] md:w-[280px] mb-6"
      />
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Create your Happy Meal®
      </h2>
      <p className="text-lg md:text-xl text-gray-700 max-w-md mb-6">
        Choose from your favorite items to build a meal made just for you!
      </p>
      <button
        className="bg-[#FFC72C] text-black font-semibold px-6 py-3 rounded-md shadow hover:brightness-95 transition duration-200 border border-black/10"
        onClick={() => navigate("/main")}
      >
        Start customizing
      </button>
    </div>
  );

  return (
    <Layout
      Component={happyMealContent}
      Title="Happy Meal®"
      BackStep="/main"
    />
  );
};
