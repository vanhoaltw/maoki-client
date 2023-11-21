import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { FaFacebookF } from "react-icons/fa";
import LoginGoogle from "./login-google";
import toast from "react-hot-toast";
import useAuthStore from "@/store/authStore";
import { User } from "@/types/graphql";

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const Login = ({ isOpen, onClose }: LoginProps) => {
  const { login } = useAuthStore();

  const onLoginSuccess = (token: string, user: User) => {
    toast.success("Chào mừng trở lại 🎊");
    login(token, user);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalBody className="py-4 pb-8">
          <ModalHeader className="text-center text-2xl block">
            Đăng nhập vào Maoki
          </ModalHeader>
          <div className="flex flex-col flex-1 gap-2">
            <Button
              startContent={<FaFacebookF size={18} />}
              variant="bordered"
              className="border-1"
            >
              <span className="flex-1">Tiếp tục với Facebook</span>
            </Button>
            <LoginGoogle onLoginSuccess={onLoginSuccess} />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Login;
