type BrandMarkProps = {
  className?: string;
  monochrome?: boolean;
};

export function BrandMark({
  className,
  monochrome = false,
}: BrandMarkProps) {
  const wordmarkColor = monochrome ? "currentColor" : "#0D1B4B";
  const starColor = monochrome ? "currentColor" : "#F26522";

  return (
    <svg
      viewBox="0 0 116 36"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="illumios"
      role="img"
    >
      <text
        fontFamily="Nunito, sans-serif"
        fontWeight="900"
        fontSize="28"
        fill={wordmarkColor}
        y="30"
        x="58"
        textAnchor="middle"
        letterSpacing="-0.5"
      >
        illumios
      </text>
      <path
        d="M 0,-5.5 L 1.4,-1.4 L 5.5,0 L 1.4,1.4 L 0,5.5 L -1.4,1.4 L -5.5,0 L -1.4,-1.4 Z"
        fill={starColor}
        transform="translate(72, 7)"
      />
    </svg>
  );
}
