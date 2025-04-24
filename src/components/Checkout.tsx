import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const Checkout: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<'Credit' | 'Cash' | null>(null);
    const { t } = useTranslation();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (selectedOption) {
        const timer = setTimeout(() => {
          navigate('/qr');
        }, 50); 
  
        return () => clearTimeout(timer);
      }
    }, [selectedOption, navigate]);

  const handleCashClick = () => {
    setSelectedOption('Cash');
  };

  const handleCreditClick = () => {
    setSelectedOption('Credit');
  };

  const getButtonClasses = (option: 'Credit' | 'Cash') =>
    `flex flex-col items-center text-center p-4 cursor-pointer border-4 rounded-2xl transition-all duration-300 shadow-md
     ${selectedOption === option
        ? 'bg-(--red-mcdonalds) border-[6px] border-yellow-400 text-white scale-105'
        : 'bg-white border-[4px] border-gray-300 hover:border-yellow-500 hover:shadow-lg hover:scale-105'
    }`;

    return (
        <div className="h-[1000px] max-h-[1180px] relative">
          {/* Curvas y logo */}
          <div className="fixed inset-0 z-10 pointer-events-none">
            <div className="absolute top-0 w-full h-[29%] z-[-1]">
              <img
                src="src/assets/Redcurves.svg"
                className="w-full h-full object-cover"
                alt="Green Curve"
              />
            </div>
    
            <div className="absolute top-[90%] w-full z-[-1]">
              <img
                src="src/assets/Redcurves2.svg"
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
    
          {/* Back Button */}
          <div className="absolute top-[-19%] right-[90%] z-30">
            <button
              className="rounded-full border border-gray-200 bg-white p-3 shadow-md"
              onClick={() => navigate('/main')}
            >
              <img src="src/assets/Vector.svg" alt="Back" className="w-6 h-6" />
            </button>
          </div>
    
          {/* Cards */}
          <div className="flex items-center justify-center text-[#333] rounded-t-[30px] p-8 mt-[65%] mx-4 relative z-20">
            <div className="flex gap-12 justify-center flex-wrap">
              <div className={getButtonClasses('Credit')} onClick={handleCreditClick}>
                <img
                  src="src/assets/credit.svg"
                  alt="Credit"
                  className="w-60 h-60 object-contain mx-auto"
                />
                <span className="text-2xl font-medium mt-2">{t("Credit")}</span>
              </div>
    
              <div className={getButtonClasses('Cash')} onClick={handleCashClick}>
                <img
                  src="src/assets/cash.svg"
                  alt="Cash"
                  className="w-60 h-60 object-contain mx-auto"
                />
                <span className="text-2xl font-medium mt-2">{t("Cash")}</span>
              </div>
            </div>
          </div>
        </div>
      );
    };