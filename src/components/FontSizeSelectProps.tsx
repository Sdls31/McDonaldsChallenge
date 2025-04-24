import { useState, useEffect } from "react";

type FontSize = "small" | "medium" | "large";

interface FontSizeSelectProps {
  initialSize?: FontSize;
  onChange: (size: FontSize) => void;
  className?: string;
}

export const FontSizeSelect = ({
  initialSize = "small",
  onChange,
  className = ""
}: FontSizeSelectProps) => {
  const [selectedSize, setSelectedSize] = useState<FontSize>(initialSize);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelectedSize(initialSize);
  }, [initialSize]);

  const handleSizeChange = (size: FontSize) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedSize(size);
    onChange(size);
    setIsOpen(false);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!isOpen) return;
    const closeDropdown = () => setIsOpen(false);
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, [isOpen]);

  const sizeLabels: Record<FontSize, string> = {
    small: "Small",
    medium: "Medium",
    large: "Large",
  };

  return (
    <div
      className={`flex flex-col items-end ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative w-28">
        <button
          onClick={toggleDropdown}
          className="w-full bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-md px-3 py-1.5 text-sm font-semibold flex justify-between items-center hover:bg-white/20 transition focus:outline-none"
        >
          Font size
          <svg
            className={`ml-2 h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.04l3.71-3.81a.75.75 0 111.08 1.04l-4.25 4.36a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-1 w-full bg-white text-black rounded-md shadow-lg z-50 overflow-hidden text-sm">
            {(["small", "medium", "large"] as FontSize[]).map((size) => (
              <button
                key={size}
                onClick={handleSizeChange(size)}
                className={`w-full text-left px-3 py-1.5 hover:bg-yellow-300 transition ${
                  selectedSize === size ? "bg-yellow-400 font-semibold" : ""
                }`}
              >
                {sizeLabels[size]}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
