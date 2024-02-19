import { IUser } from "@/server/models/User";
import { create } from "zustand";

type AuthStore = {
	user: IUser | null;
	loading: boolean;
	setUser: (user: IUser | null) => void;
	setLoading: (value: boolean) => void;
};

export const useAuthStore = create<AuthStore>()((set, get) => ({
	user: null,
	loading: true,
	setUser: (user: IUser | null) => {
		set(() => ({
			user,
		}));
	},
	setLoading: (value: boolean) => {
		set(() => ({ loading: value }));
	},
}));
