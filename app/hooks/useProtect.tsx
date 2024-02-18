import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { create } from "zustand";
import axios from "axios";
import { IUser } from "@/server/models/User";
import { useAuthStore } from "../auth";

export default function useProtect() {
	const { user, loading, setUser, setLoading } = useAuthStore();
	const router = useRouter();

	useEffect(() => {
		axios
			.get("/api/auth/me")
			.then(({ data }) => {
				if (data.status === "fail") {
					setUser(null);
					router.push("/profile/create");
				}
				setUser(data as IUser);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [user]);

	return { loading };
}
