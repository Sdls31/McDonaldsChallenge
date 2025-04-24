import { useState, useEffect } from "react";

export default function SwipeAnimation() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [position, setPosition] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [animationCount, setAnimationCount] = useState(0);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>; 

    const runAnimationCycle = () => {
      if (!isAnimating && animationCount < 3) {
        setIsAnimating(true);
        setAnimationCount((prev) => prev + 1);

        setTimeout(() => {
          setOpacity(1);
        }, 300);

        setTimeout(() => {
          setPosition(-200);
        }, 1000);

        setTimeout(() => {
          setOpacity(0);
        }, 1800);

        setTimeout(() => {
          setPosition(0);
          setIsAnimating(false);
        }, 2300);
      }
    };

    runAnimationCycle();

    intervalId = setInterval(() => {
      if (animationCount < 3) {
        runAnimationCycle();
      } else {
        clearInterval(intervalId);
      }
    }, 6000);

    return () => clearInterval(intervalId);
  }, [isAnimating, animationCount]);

  return (
    <div className="relative w-full h-64 flex items-center justify-center rounded-lg">
      <div 
        className="absolute top-1/2 left-1/2 pointer-events-none z-50"
        style={{ 
          transform: `translate(calc(-50% + ${position}px), -50%)`,
          opacity: opacity,
          transition: "transform 1s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease-in-out"
        }}
      >
        <img 
          src="/src/assets/finger.png"
          alt="Desliza para cambiar" 
          className="w-30 h-30 rotate-90" 
        />
      </div>
    </div>
  );
}
