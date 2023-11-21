import { loginGoogle } from "@/api/auth";
import { env } from "@/constants/env";
import { User } from "@/types/graphql";
import { Button } from "@nextui-org/button";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import toast from "react-hot-toast";
import { GrGoogle } from "react-icons/gr";

const GoolgeCustomBtn = ({
  onLoginSuccess,
}: {
  onLoginSuccess: (token: string, user: User) => void;
}) => {
  const [loading, setLoading] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async ({ code }) => {
      setLoading(true);
      if (code) {
        try {
          const response = await loginGoogle(code);
          onLoginSuccess(response?.token, response?.user);
        } finally {
          setLoading(false);
        }
      }
    },
    onError: (err) => {
      console.error(err);
      toast.error(
        "Xảy ra sự cố khi đăng nhập. Vui lòng liên hệ bộ phận CSKH để được hỗ trợ."
      );
    },
    flow: "auth-code",
  });

  return (
    <Button
      startContent={<GrGoogle size={18} />}
      variant="bordered"
      isLoading={loading}
      className="border-1"
      onPress={login}
    >
      <span className="flex-1">Tiếp tục với Google</span>
    </Button>
  );
};

const LoginGoogle = ({
  onLoginSuccess,
}: {
  onLoginSuccess: (token: string, user: User) => void;
}) => {
  return (
    <GoogleOAuthProvider clientId={env.GOOGLE_CLIENT_ID}>
      <GoolgeCustomBtn onLoginSuccess={onLoginSuccess} />
    </GoogleOAuthProvider>
  );
};

export default LoginGoogle;
