import React from "react";

type LogoSize = "small" | "medium" | "large";

const sizeMap: Record<LogoSize, { height: string; width: string }> = {
  small: { height: "h-10", width: "w-28" },
  medium: { height: "h-16", width: "w-48" },
  large: { height: "h-20", width: "w-[280px]" }
};

interface LogoProps {
  size?: LogoSize;
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
}

const Logo: React.FC<LogoProps> = ({
  size = "large",
  className = "",
  style = { background: "transparent" },
  alt = "Logo"
}) => {
  const sizeClasses = `${sizeMap[size].height} ${sizeMap[size].width}`;
  return (
    <img
      src="/images/nextratech-logo.png"
      alt={alt}
      className={`${sizeClasses} object-cover ${className}`}
      style={style}
    />
  );
};

export default Logo;