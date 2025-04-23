import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { RoutesEnum } from "../router/RoutesEnum";
import { Layout } from "./Layout";
import { HiPlus, HiMinus } from "react-icons/hi";

const PRICE_PER_FRY = 0.20;
const SIZES = ["S", "M", "L"];
const COUNTS = [30, 40, 50];

const FriesPage = () => {

  // const [selected, setSelected] = useState("fries");
  const [sizeIndex, setSizeIndex] = useState(0);
  const [orderCount, setOrderCount] = useState(1);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const [fallingFries, setFallingFries] = useState<number[]>([]);
  const fryContainerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const boxImgRef = useRef<HTMLImageElement>(null);
  const fryStaticRef = useRef<HTMLDivElement>(null);


  const totalFries = COUNTS[sizeIndex] * orderCount;
  const price = (totalFries * PRICE_PER_FRY).toFixed(2);


  const handleIncrement = () => {
    if (sizeIndex >= SIZES.length - 1) return;
  
    const newIndex = sizeIndex + 1;
    const newCount = COUNTS[newIndex];
  
    const totalFalling = Array.from({ length: newCount }, (_, i) => i); // ✅ Genera todos
    setFallingFries(totalFalling);
    setSizeIndex(newIndex);
    animateBoxSize(newIndex);
  
    setTimeout(() => setFallingFries([]), 3000);
  };
  

  const handleDecrement = () => {
    if (sizeIndex <= 0) return;
  
    const currentSize = SIZES[sizeIndex]; // ⬅️ ejemplo: "L", "M", etc.
    const newIndex = sizeIndex - 1;
  
    const allFries = Array.from(
      fryStaticRef.current?.querySelectorAll("img") || []
    );
  
    // ❗ Solo eliminamos papas que pertenecen al tamaño actual
    const toRemove = allFries.filter(
      (fry) => fry.dataset.size === currentSize
    );
  
    toRemove.forEach((fry, i) => {
      setTimeout(() => {
        gsap.to(fry, {
          y: window.innerHeight + 300,
          rotation: Math.random() * 360,
          duration: 1.1,
          ease: "power2.in",
          onComplete: () => fry.remove(),
        });
      }, i * 80);
    });
  
    setSizeIndex(newIndex);
    animateBoxSize(newIndex);
  };
  
  
  

  const animateBoxSize = (index: number) => {
    if (!boxImgRef.current) return;
  
    // Escala más progresiva
    const scaleMap = [1, 1.3, 1.6];

    gsap.to(boxImgRef.current, {
      scale: scaleMap[index],
      duration: 0.4,
      ease: "power1.out",
    });
  };
  

  useEffect(() => {
    if (!initialLoadDone && fryContainerRef.current) {
      const fries = Array.from({ length: COUNTS[0] }, (_, i) => i);
      setFallingFries(fries);
      setInitialLoadDone(true);
    }
  }, [initialLoadDone]);
  

  useEffect(() => {
    if (fallingFries.length === 0 || !fryContainerRef.current || !fryStaticRef.current) return;
  
    const escapeCount = 7;
    const total = fallingFries.length;
    const visibleFries = fallingFries.slice(0, total - escapeCount);
    const escapingFries = fallingFries.slice(total - escapeCount);
  
    const sizeMap = [
      { w: 48, h: 96 },
      { w: 56, h: 112 },
      { w: 64, h: 128 },
    ];
    const leftRanges = [
      { min: 140, max: 170 },
      { min: 130, max: 185 },
      { min: 120, max: 200 },
    ];
    const finalYPositions = [670, 650, 630];
  
    // 1️⃣ Primero las normales
    visibleFries.forEach((id, i) => {
      setTimeout(() => {
        const fry = document.createElement("img");
        fry.src = "src/assets/MenuFries/Fry.svg";
        fry.alt = `Fry ${id}`;
        fry.dataset.size = SIZES[sizeIndex];

        const { w, h } = sizeMap[sizeIndex];
        fry.style.width = `${w}px`;
        fry.style.height = `${h}px`;
        fry.className = "absolute pointer-events-none z-[90]";

        const range = leftRanges[sizeIndex];
        const left = Math.random() * (range.max - range.min) + range.min;
        fry.style.left = `${left}px`;
        fry.style.top = `-600px`;
        fry.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;
        const fryBehindRef = document.getElementById("fryBehindRef");
fryBehindRef?.appendChild(fry);

  
        const finalY = finalYPositions[sizeIndex];
        const finalXOffset = Math.random() * 30 - 15;
        const finalRotation = Math.random() * 360 - 180;
  
        gsap.to(fry, {
          y: finalY - 10,
          x: finalXOffset,
          rotation: finalRotation * 0.6,
          duration: 1.2,
          ease: "power2.in",
          onComplete: () => {
            gsap.to(fry, {
              y: finalY,
              rotation: finalRotation,
              duration: 0.3,
              ease: "bounce.out",
              onComplete: () => {
                if (fry.parentElement) {
                    fry.parentElement.removeChild(fry);
                  }
                fry.style.position = "absolute";
                fryStaticRef.current?.appendChild(fry);
              },
            });
          },
        });
      }, i * 80);
    });
  
    // 2️⃣ Luego las escapistas
    escapingFries.forEach((id, i) => {
      const delay = visibleFries.length * 80 + i * 150;
      setTimeout(() => {
        const fry = document.createElement("img");
        fry.src = "src/assets/MenuFries/Fry.svg";
        fry.alt = `Fry ${id}`;
        const { w, h } = sizeMap[sizeIndex];
        fry.style.width = `${w}px`;
        fry.style.height = `${h}px`;
        fry.className = "absolute pointer-events-none z-[5]"; // detrás de la caja inicialmente

        const range = leftRanges[sizeIndex];
        const left = Math.random() * (range.max - range.min) + range.min;
        fry.style.left = `${left}px`;
        fry.style.top = `-650px`;
        fry.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;
        fryContainerRef.current?.appendChild(fry);
  
        const finalY = finalYPositions[sizeIndex];
        const finalXOffset = Math.random() * 30 - 15;
        const finalRotation = Math.random() * 360 - 180;
        const escapeDirection = Math.random() < 0.5 ? -1 : 1;
  
        gsap.to(fry, {
          y: finalY,
          x: finalXOffset,
          rotation: finalRotation * 0.5,
          duration: 1,
          ease: "power2.in",
          onComplete: () => {
            gsap.to(fry, {
              y: finalY - 100,
              x: finalXOffset + escapeDirection * 20,
              duration: 0.3,
              ease: "power1.out",
              onComplete: () => {
                // 👇 Aquí le subimos el z-index
                fry.style.zIndex = "100";
          
                gsap.to(fry, {
                  y: window.innerHeight + 300,
                  x: finalXOffset + escapeDirection * 120,
                  rotation: finalRotation,
                  duration: 1,
                  ease: "power1.in",
                  onComplete: () => fry.remove(),
                });
              },
            });
          }
          
        });
      }, delay);
    });
  }, [fallingFries]);

  return (
    <div className="min-h-screen flex justify-center bg-white font-poppins pt-12">
      <div className="w-full max-w-md flex flex-col items-center gap-8 px-6">
        <div className="text-2xl font-bold text-gray-700">
          {/* {currentCount} McNuggets */}
        </div>

        <div className="w-full max-w-[800px] relative z-10 flex flex-col items-start gap-6 mt-6 ml-10">
          <div className="relative w-[480px] h-[440px] flex flex-col items-center justify-center gap-6 mt-16">
            {/* Caja de papas y botones */}
            <div className="relative w-[340px] h-[270px] flex justify-center items-center z-0 overflow-visible" ref={boxRef}>
              {/* Botón - */}
              <button
                onClick={handleDecrement}
                disabled={sizeIndex === 0}
                className={`absolute left-[-70px] top-[50%] -translate-y-1/2 w-[70px] h-[70px] rounded-full flex justify-center items-center transition-transform duration-300 hover:scale-110 shadow-lg ${
                  sizeIndex === 0 ? "bg-gray-100 opacity-60 cursor-not-allowed" : "bg-white"
                }`}
              >
                <HiMinus className="text-[var(--yellow-mcdonalds)] text-[38px]" />
              </button>
  
              {/* Imagen de la caja */}
              <img
                ref={boxImgRef}
                src="src/assets/MenuFries/FriesBox.svg"
                alt="Caja de papas"
                className="relative z-[10] w-[260px] object-contain"
              />
  
              {/* Papas dinámicas */}
              <div
                ref={fryContainerRef}
                className="absolute bottom-[20px] left-0 w-full h-full overflow-visible z-[80] pointer-events-none"
              />


              {/* Papas que se quedan visibles en la caja */}
                <div
                ref={fryStaticRef}
                className="absolute bottom-[20px] left-0 w-full h-full overflow-visible z-[5] pointer-events-none"
                />

                {/* Papas escapistas en animación */}
              <div
                id="fryBehindRef"
                className="absolute bottom-[20px] left-0 w-full h-full overflow-visible z-[3] pointer-events-none"
              />

              {/* Botón + */}
              <button
                onClick={handleIncrement}
                disabled={sizeIndex === SIZES.length - 1}
                className={`absolute right-[-70px] top-[50%] -translate-y-1/2 w-[70px] h-[70px] rounded-full flex justify-center items-center transition-transform duration-300 hover:scale-110 shadow-lg ${
                  sizeIndex === SIZES.length - 1
                    ? "bg-gray-100 opacity-60 cursor-not-allowed"
                    : "bg-white"
                }`}
              >
                <HiPlus className="text-[var(--yellow-mcdonalds)] text-[38px]" />
              </button>
            </div>

         {/* Controles de orden y precio */}
         <div className="flex flex-col items-center justify-center gap-4">
              <div className="flex items-center justify-center gap-8">
                <div className="flex items-center rounded-full px-5 py-2 bg-white shadow-sm border border-gray-300 text-lg font-medium">
                  <button
                    onClick={() => setOrderCount((prev) => Math.max(1, prev - 1))}
                    className="text-[22px] text-gray-500 font-bold px-3"
                  >
                    –
                  </button>
                  <span className="text-black mx-2 text-[18px]">{orderCount}</span>
                  <button
                    onClick={() => setOrderCount((prev) => prev + 1)}
                    className="text-[22px] text-[var(--yellow-mcdonalds)] font-bold px-3"
                  >
                    +
                  </button>
                </div>
                <div className="text-[20px] font-bold text-black">${price}</div>
              </div>

              <button
                onClick={() => {
                  console.log(`Añadido al carrito: ${totalFries} fries por $${price}`);
                }}
                className="w-[300px] bg-[#FFC72C] text-black font-semibold py-3 text-[15px] rounded-md shadow-sm hover:brightness-95 transition duration-200 border border-black/10"
              >
                Add to cart
              </button>
            </div>
          </div>

    </div>
    </div>

    </div>

  );
};

export const FriesProcess = () => {
  return (
    <Layout
      Component={<FriesPage />}
      Title={"Fries"}
      BackStep={RoutesEnum.MAIN}
    />
  );
};
