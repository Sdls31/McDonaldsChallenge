interface DialogProps {
  text: string;
  side: "right" | "left";
}

export const DialogBox = ({ text, side }: DialogProps) => {
  const isRight = side === "right";
  return (
    <div
      className="w-[25rem] min-h-[5rem] z-60 absolute"
      style={{ border: "2px solid #FFC72C", top: "60rem", left: "15rem", borderRadius: "1rem" }}
    >
      <p className="text-left pt-[1rem] font-[var(--font-global)] text-[15px] font-bold ml-[2rem] text-[#4F4F4F] leading-snug line-clamp-2">
        {text}
      </p>
      <div
        className="absolute w-0 h-0"
        style={{
          bottom: "-0.75rem",
          [isRight ? "right" : "left"]: "1.5rem",
          borderLeft: isRight ? "0.75rem solid transparent" : undefined,
          borderRight: !isRight ? "0.75rem solid transparent" : undefined,
          borderTop: "0.75rem solid #FFC72C",
        }}
      />
    </div>
  );
};
