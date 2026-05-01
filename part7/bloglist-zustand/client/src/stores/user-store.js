import { create } from "zustand";
import blogService from "../services/blogs";
import { devtools } from "zustand/middleware";
import { useNotificationActions } from "./notification-store";
import loginService from "../services/login";

const getStoredUser = () => {
  const stored = window.localStorage.getItem("appUser");
  if (stored) {
    const user = JSON.parse(stored);
    blogService.setToken(user.token);
    return user;
  }
  return null;
};

const useUserStore = create(
  devtools((set) => ({
    user: getStoredUser(),
    actions: {
      setUser: (user) => set(() => ({ user })),
      logout: () => {
        window.localStorage.removeItem("appUser");
        blogService.setToken(null);
        set(() => ({ user: null }));
      },
    },
  })),
);

export default useUserStore;

export const useUser = () => useUserStore((state) => state.user);
export const useUserActions = () => useUserStore((state) => state.actions);

export const useLogin = () => {
  const { setUser } = useUserActions();
  const { setNotification } = useNotificationActions();
  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem("appUser", JSON.stringify(user));
      setUser(user);
      setNotification("Login successful!");
      return true;
    } catch {
      setNotification("Wrong username or password");
      return false;
    }
  };
  return login;
};
