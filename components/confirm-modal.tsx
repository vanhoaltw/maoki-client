import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalProps,
  ModalContent,
  ModalHeader,
} from "@nextui-org/modal";
import { FC } from "react";

interface ConfirmModalProps {
  textConfirm?: string;
  textCancel?: string;
  onConfirm?: () => void;
}

const ConfirmModal: FC<ConfirmModalProps & ModalProps> = ({
  isOpen,
  onOpenChange,
  title,
  children,
  textCancel = "Huỷ bỏ",
  textConfirm = "Xác nhận",
  onConfirm,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{ closeButton: "m-2 text-main" }}
      closeButton={<div />}
    >
      <ModalContent>
        {(onClose) => (
          <div>
            {title && (
              <ModalHeader className="flex flex-col gap-1 text-xl">
                {title}
              </ModalHeader>
            )}

            {children && (
              <div className="text-muted-foreground px-6">{children}</div>
            )}

            <div className="flex justify-end gap-2 p-4">
              <Button onClick={onClose} variant="light">
                {textCancel}
              </Button>
              <Button variant="solid" color="danger" onClick={onConfirm}>
                {textConfirm}
              </Button>
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
