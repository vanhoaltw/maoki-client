"use client";

import { Button, ButtonProps } from "@nextui-org/button";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

const steps = ["/privacy-type"];

const ProgressFooter = ({
  onConfirm,
  confirmProps,
}: {
  onConfirm?: () => void;
  confirmProps?: ButtonProps;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { listingId } = useParams();

  const currentStepIdx = useMemo(
    () => steps.findIndex((i) => pathname.split("/").at(-1) === i),
    [pathname, listingId]
  );

  const handleGoNext = () => {
    if (typeof onConfirm === "function") onConfirm();
  };

  return (
    <footer className="fixed bottom-0 left-0 py-4 w-full border-t">
      <div className="flex justify-between items-center px-6">
        <div>
          {listingId && (
            <Button
              onPress={() => router.back()}
              variant="light"
              className="w-28 underline"
              size="lg"
            >
              Quay lại
            </Button>
          )}
        </div>

        <Button
          variant="solid"
          color="danger"
          className="w-36"
          size="lg"
          onPress={handleGoNext}
          {...confirmProps}
        >
          Tiếp tục
        </Button>
      </div>
    </footer>
  );
};

export default ProgressFooter;
