import { User } from "@/types/graphql";
import { destroyToken, setToken } from "@/utils/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token?: string | null;
  user?: User | null;
  login: (token: string, user?: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      login: (token, user) => {
        set({ token, user });
        setToken(token);
      },
      logout: () => {
        destroyToken();
        set({ token: null, user: null });
        window.location.reload();
      },
    }),
    { name: "auth", getStorage: () => localStorage }
  )
);

export default useAuthStore;
