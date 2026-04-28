import { create } from "zustand";

let timeout = null;

export const useNotificationStore = create((set) => ({
  notification: null,
  actions: {
    setNotification: (message) => {
      clearTimeout(timeout);
      set({ notification: message });
      timeout = setTimeout(() => {
        set({ notification: null });
      }, 5000);
    },
  },
}));

export const useNotificationActions = () =>
  useNotificationStore((state) => state.actions);
