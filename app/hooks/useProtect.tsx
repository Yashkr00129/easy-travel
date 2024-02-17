import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function useProtect() {
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		axios
			.get("/api/auth/me")
			.then(({ data }) => {
				if (data.status === "fail") router.push("/profile/create");
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return { loading };
}
