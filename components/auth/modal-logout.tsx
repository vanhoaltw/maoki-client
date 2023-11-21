import React from "react";
import ConfirmModal from "../confirm-modal";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";

const ModalLogout = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: (isopen: boolean) => void;
}) => {
  const { logout } = useAuthStore();

  const onLogout = () => {
    logout()
    toast.success('Đã đăng xuất')
  }

  return (
    <ConfirmModal
      isOpen={isOpen}
      onOpenChange={onClose}
      title="Đăng xuất"
      onConfirm={onLogout}
    >
      Bạn có chắc muốn đăng xuất
    </ConfirmModal>
  );
};

export default ModalLogout;
