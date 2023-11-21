import clsx from "clsx";
import { ImageProps } from "next/image";
import { HTMLProps } from "react";

type BaseImageProps = {
  useSkeleton?: boolean;
  classNames?: {
    image?: string;
    blur?: string;
  };
  alt?: string;
} & {
  width: string | number;
  height: string | number;
} & HTMLProps<HTMLImageElement>;

export default function BaseImage({
  className,
  width,
  src,
  height,
  alt,
  classNames,
  ...rest
}: BaseImageProps) {
  const widthIsSet = className?.includes("w-") ?? false;
  const fallbackUrl = "http://localhost";

  return (
    <figure
      style={!widthIsSet ? { width: `${width}px` } : undefined}
      className={className}
    >
      <img
        {...rest}
        className={classNames?.image}
        src={src || fallbackUrl}
        width={width}
        height={height}
        alt={alt}
      />
    </figure>
  );
}
