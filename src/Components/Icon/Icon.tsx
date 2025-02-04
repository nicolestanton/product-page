import Image, { StaticImageData } from "next/image";
import styles from "./icon.module.scss";

interface IconProps {
  src: string | StaticImageData;
  alt?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizes = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 48,
};

function getIconSize(size: keyof typeof sizes): number {
  return sizes[size];
}

export const Icon: React.FC<IconProps> = ({
  src,
  alt = "",
  size = "md",
  ...props
}) => {
  return (
    <div className={styles.icon}>
      <Image
        src={src}
        alt={alt}
        width={getIconSize(size)}
        height={getIconSize(size)}
        {...props}
      />
    </div>
  );
};
