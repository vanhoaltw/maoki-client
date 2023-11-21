import { Button } from "@nextui-org/button";
import clsx from "clsx";
import { forwardRef } from "react";
import { AiFillLeftCircle, AiFillRightCircle, AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

type ChervonButtonProps = {
  direction?: "right" | "left";
  className?: string;
  size?: number;
};

const ChervonButton = forwardRef<HTMLButtonElement, ChervonButtonProps>(
  ({ direction = "left", className, size = 20 }, ref) => {
    return (
      <Button
        isIconOnly
        ref={ref}
        variant="bordered"
        radius="full"
        size="lg"
        className={clsx(
          "absolute top-1/2 z-10 bg-black/40 text-white -translate-y-1/2 border-none",
          { "right-2": direction === "right", "left-2": direction !== "right" },
          className
        )}
      >
        {direction === "left" ? <AiOutlineArrowLeft size={size} /> : <AiOutlineArrowRight size={size} />}
      </Button>
    );
  }
);

export default ChervonButton;
