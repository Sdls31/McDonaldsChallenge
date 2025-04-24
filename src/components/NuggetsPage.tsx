import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { RoutesEnum } from "../router/RoutesEnum";
import { Layout } from "./Layout";
import { HiPlus, HiMinus } from "react-icons/hi";
import AvatarApp from "./AvatarApp";
import { DialogBox } from "./DialogBox";
import { useCart } from "../context/CartContext";
import { useAvatar } from "../context/AvatarContext";

// Porciones disponibles (4, 6, 8, 10, 20 nuggets)
const PORTIONS = [4, 6, 8, 10, 20];
const PRICE_PER_NUGGET = 0.775;

const NuggetsPage = () => {
  const [portionIndex, setPortionIndex] = useState(0);
  const [currentCount, setCurrentCount] = useState(0); // inicia vacío
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const [fallingNuggets, setFallingNuggets] = useState<number[]>([]);
  const [removingNuggets, setRemovingNuggets] = useState<HTMLImageElement[]>(
    []
  );
  const [orderCount, setOrderCount] = useState(1); // órdenes

  const nuggetContainerRef = useRef<HTMLDivElement>(null);
  const escapeNuggetsRef = useRef<HTMLDivElement>(null);

  const price = (orderCount * currentCount * PRICE_PER_NUGGET).toFixed(2);
  const { addToCart } = useCart();
  const { isAvatar } = useAvatar();
  // ----------------------------
  // 🔹 FUNCIONES HANDLER
  // ----------------------------

  const handleIncrement = () => {
    if (portionIndex >= PORTIONS.length - 1) return;

    const newIndex = portionIndex + 1;
    const newCount = PORTIONS[newIndex];
    const difference = newCount - currentCount;

    let newFalling = Array.from({ length: difference }, (_, i) => i + 1);

    // Caso especial: de 10 a 20 (añades 10, 6 escapan, 4 caen)
    if (PORTIONS[portionIndex] === 10 && PORTIONS[newIndex] === 20) {
      const escapeNuggets = Array.from({ length: 6 }, (_, i) => -1 * (i + 1));
      const visibleToAdd = difference - escapeNuggets.length;
      const newVisible = Array.from({ length: visibleToAdd }, (_, i) => i + 1);
      newFalling = [...newVisible, ...escapeNuggets];
    }

    setFallingNuggets(newFalling);
    setCurrentCount(newCount);
    setPortionIndex(newIndex);

    setTimeout(() => setFallingNuggets([]), 3000);
  };

  const handleDecrement = () => {
    if (portionIndex <= 0 || !nuggetContainerRef.current) return;

    const newIndex = portionIndex - 1;
    const newCount = PORTIONS[newIndex];

    const visibleNuggets = Array.from(
      nuggetContainerRef.current.querySelectorAll("img")
    ) as HTMLImageElement[];

    const extra = visibleNuggets.length - newCount;

    if (extra > 0) {
      const toRemove = visibleNuggets.slice(-extra);
      setRemovingNuggets(toRemove);
    }

    setTimeout(
      () => {
        setCurrentCount(newCount);
        setPortionIndex(newIndex);
      },
      extra > 0 ? extra * 100 + 100 : 0
    );
  };

  const handleAdd = () => {
    addToCart({
      id: `nuggets-${PORTIONS[portionIndex]}`,
      name: `${PORTIONS[portionIndex]} McNuggets`,
      price: parseFloat(price),
      quantity: orderCount,
      image: "src/assets/Nugget.svg", // puedes cambiar a una imagen distinta según porción si prefieres
    });
  };

  useEffect(() => {
    if (removingNuggets.length === 0) return;

    const leftLid = document.getElementById("leftLid");
    const rightLid = document.getElementById("rightLid");

    // 1️⃣ Abrimos las tapas primero
    // 1️⃣ Abrimos las tapas hacia abajo (rotación positiva)
    gsap.to(leftLid, {
      rotate: 60,
      duration: 0.4,
      transformOrigin: "top left",
      ease: "power2.out",
    });
    gsap.to(rightLid, {
      rotate: -60,
      duration: 0.4,
      transformOrigin: "top right",
      ease: "power2.out",
    });

    // 2️⃣ Luego caen los nuggets
    removingNuggets.forEach((nugget, i) => {
      setTimeout(() => {
        const finalRotation = Math.random() * 360 - 180;

        gsap.to(nugget, {
          y: "+=10",
          duration: 0.1,
          ease: "power1.in",
          onComplete: () => {
            gsap.to(nugget, {
              y: window.innerHeight + 300,
              rotation: finalRotation,
              duration: 1.2,
              ease: "power2.in",
              onComplete: () => nugget.remove(),
            });
          },
        });
      }, i * 100);
    });

    // 3️⃣ Cerramos las tapas después que todos hayan caído
    const totalDelay = removingNuggets.length * 100 + 1300;

    setTimeout(() => {
      // 3️⃣ Cerramos las tapas
      gsap.to(leftLid, {
        rotate: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });
      gsap.to(rightLid, {
        rotate: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }, totalDelay);

    setRemovingNuggets([]);
  }, [removingNuggets]);

  // 🟨 PRIMERA CARGA
  useEffect(() => {
    if (!initialLoadDone && nuggetContainerRef.current) {
      const nuggets = Array.from({ length: 4 }, (_, i) => i + 1);
      setFallingNuggets(nuggets);
      setInitialLoadDone(true);
    }
  }, [initialLoadDone]);

  // 🟧 EFECTO DE CAÍDA DE NUGGETS
  useEffect(() => {
    if (fallingNuggets.length === 0 || !nuggetContainerRef.current) return;

    fallingNuggets.forEach((id, i) => {
      setTimeout(() => {
        const nugget = document.createElement("img");
        nugget.src = "src/assets/Nugget.svg";
        nugget.alt = `Nugget ${id}`;
        nugget.className = "absolute w-28 h-28 pointer-events-none z-[40]";
        nugget.style.left = `${Math.random() * 140 + 20}px`; // antes era: 180 - 10

        nugget.style.top = `-800px`;
        nugget.style.transform = `rotate(${Math.random() * 60 - 30}deg)`;

        const parent =
          id < 0 ? escapeNuggetsRef.current : nuggetContainerRef.current;
        parent?.appendChild(nugget);

        const finalX = Math.random() * 60 - 30;
        const finalY = 935;
        const finalRotation = Math.random() * 360 - 180;

        const dropAndBounce = () => {
          gsap.to(nugget, {
            y: finalY - 10,
            x: finalX,
            rotation: finalRotation * 0.6,
            duration: 1.2, // <- AQUI
            ease: "power2.in",
            onComplete: () => {
              gsap.to(nugget, {
                y: finalY,
                rotation: finalRotation,
                duration: 0.3,
                ease: "bounce.out",
              });
            },
          });
        };

        const dropBounceExit = (direction: number) => {
          // Etapa 1: caer por detrás
          nugget.style.zIndex = "30"; // detrás de la base (base está en z-50)
          gsap.to(nugget, {
            y: finalY,
            x: finalX,
            rotation: finalRotation * 0.4,
            duration: 0.6,
            ease: "power2.in",
            onComplete: () => {
              // Etapa 2: salto hacia adelante y subir z-index
              nugget.style.zIndex = "60";
              gsap.to(nugget, {
                y: finalY - 100,
                x: finalX + direction * 25,
                duration: 0.4,
                ease: "power1.out",
                onComplete: () => {
                  // Etapa 3: caer al frente
                  nugget.style.zIndex = "90";
                  gsap.to(nugget, {
                    y: window.innerHeight + 300,
                    x: finalX + direction * 130,
                    rotation: finalRotation + direction * 180,
                    duration: 1,
                    ease: "power1.in",
                    onComplete: () => {
                      nugget.remove();
                    },
                  });
                },
              });
            },
          });
        };

        if (id < 0) {
          const index = Math.abs(id) - 1;
          const direction = index < 3 ? -1 : 1;
          dropBounceExit(direction);
        } else {
          dropAndBounce();
        }
      }, i * 250);
    });

    if (fallingNuggets.length === 4 && currentCount === 0) {
      const totalDelay = fallingNuggets.length * 250 + 300;
      setTimeout(() => setCurrentCount(4), totalDelay);
    }

    setTimeout(() => setFallingNuggets([]), fallingNuggets.length * 250 + 1000);
  }, [fallingNuggets]);

  const avatarPosition = {
    top: "1100px",
    right: "-45rem",
  };
  const positionDialogBox = {
    top: "61.5rem",
    right: "12.5rem",
  };

  return (
    <Layout
      Title={`${currentCount} McNuggets`}
      BackStep={RoutesEnum.MAIN}
      Component={
        <>
          {isAvatar && (
            <>
              <AvatarApp position={avatarPosition} />
              <DialogBox
                text="Crispy and Juicy?"
                side="right"
                positionAvatar={positionDialogBox}
                size="small"
              />
            </>
          )}

          <div className="min-h-screen flex justify-center bg-white font-poppins pt-12">
            <div className="w-full max-w-md flex flex-col items-center gap-8 px-6">
              {/* NUGGET ZONE */}
              <div className="w-full max-w-[800px] relative z-10 flex flex-col items-center gap-6 mt-6">
                <div className="relative w-[480px] h-[440px] flex flex-col items-center justify-center gap-6 mt-16">
                  {/* Caja */}
                  <div className="relative w-[320px] h-[270px] flex justify-center items-center z-0 overflow-visible">
                    {/* Botón - */}
                    <button
                      onClick={handleDecrement}
                      disabled={portionIndex === 0}
                      className={`absolute left-[-90px] top-[50%] -translate-y-1/2 w-[70px] h-[70px] rounded-full flex justify-center items-center transition-transform duration-300 hover:scale-110 shadow-lg ${
                        portionIndex === 0
                          ? "bg-[#d9dbe1] border border-black/10 text-black opacity-100"
                          : "bg-white"
                      }`}
                    >
                      <HiMinus className="text-[var(--yellow-mcdonalds)] text-[38px]" />
                    </button>

                    <img
                      src="src/assets/MenuNuggets/TapaNugget.svg"
                      alt="Tapa Caja"
                      className="absolute top-[-70px] left-[-10px] z-[30] w-full object-contain"
                    />

                    <div
                      ref={nuggetContainerRef}
                      className="absolute bottom-[20px] left-0 w-full h-full overflow-visible z-[40] pointer-events-none"
                    />
                    <div
                      ref={escapeNuggetsRef}
                      className="absolute bottom-[20px] left-0 w-full h-full overflow-visible z-[60] pointer-events-none"
                    />

                    {/* Tapas laterales */}
                    <img
                      id="leftLid"
                      src="src/assets/MenuNuggets/TapaAbierta.svg"
                      alt="Tapa Izquierda"
                      className="absolute bottom-[5px] left-[35px] w-[80px] h-[10px] z-[40]"
                      style={{
                        transformOrigin: "top left",
                        transform: "rotate(0deg)",
                      }}
                    />
                    <img
                      id="rightLid"
                      src="src/assets/MenuNuggets/TapaAbierta.svg"
                      alt="Tapa Derecha"
                      className="absolute bottom-[5px] right-[45px] w-[80px] h-[10px] z-[40]"
                      style={{
                        transformOrigin: "top right",
                        transform: "rotate(0deg)",
                      }}
                    />

                    <img
                      src="src/assets/MenuNuggets/BaseNugget.svg"
                      alt="Base Caja"
                      className="absolute bottom-[5px] left-0 z-[50] w-full object-contain"
                    />

                    {/* Botón + */}
                    <button
                      onClick={handleIncrement}
                      disabled={portionIndex === PORTIONS.length - 1}
                      className={`absolute right-[-70px] top-[50%] -translate-y-1/2 w-[70px] h-[70px] rounded-full flex justify-center items-center transition-transform duration-300 hover:scale-110 shadow-lg ${
                        portionIndex === PORTIONS.length - 1
                          ? "bg-[#d9dbe1] border border-black/10 text-black opacity-100"
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
                          onClick={() =>
                            setOrderCount((prev) => Math.max(1, prev - 1))
                          }
                          className="text-[22px] text-gray-500 font-bold px-3"
                        >
                          –
                        </button>
                        <span className="text-black mx-2 text-[18px]">
                          {orderCount}
                        </span>
                        <button
                          onClick={() => setOrderCount((prev) => prev + 1)}
                          className="text-[22px] text-[var(--yellow-mcdonalds)] font-bold px-3"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-[20px] font-bold text-black">
                        ${price}
                      </div>
                    </div>

                    <button
                      onClick={handleAdd}
                      className="w-[300px] bg-[#FFC72C] text-black font-semibold py-3 text-[15px] rounded-md shadow-sm hover:brightness-95 transition duration-200 border border-black/10"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    />
  );
};

export const NuggetsProcess = () => {
  return <NuggetsPage />;
};
