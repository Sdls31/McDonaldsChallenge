interface positions {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

interface DialogProps {
  text: string;
  side: "right" | "left";
  size: "small" | "large";
  positionAvatar: positions;
}

export const DialogBox = ({
  text,
  side,
  positionAvatar,
  size,
}: DialogProps) => {
  const isRight = side === "right";
  const isSmall = size === "small";
  return (
    <div
      className="min-h-[5rem] z-60 absolute"
      style={{
        width: isSmall ? "15rem" : "25rem",
        border: "2px solid #FFC72C",
        borderRadius: "1rem",
        top: positionAvatar.top,
        left: positionAvatar.left || "",
        right: positionAvatar.right || "",
      }}
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
