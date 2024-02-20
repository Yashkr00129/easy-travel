import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { create } from "zustand";
import axios from "axios";
import { IUser } from "@/types";
import { useAuthStore } from "../auth";
import { useAuth } from "@clerk/nextjs";

export default function useProtect() {
	const { signOut } = useAuth();
	const router = useRouter();
	const { user, loading, setUser, setLoading } = useAuthStore();

	useEffect(() => {
		if (user) return;
		const verifyProfile = async () => {
			setLoading(true);
			const res = await axios.get("/api/auth/me");
			if (res.data.status === "fail") {
				setUser(null);
				signOut();
				router.push("/sign-in");
			}
			setUser(res.data as IUser);
			setLoading(false);
		};

		verifyProfile();
	}, [user, loading]);

	return { loading };
}
