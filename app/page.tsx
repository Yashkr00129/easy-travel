"use client";
import { Button, Typography } from "@mui/material";
import { SidebarLayout as SidebarLayout } from "./components/dashboard/Layout";
import axios from "axios";

export default function Home() {
	return (
		<SidebarLayout>
			<Typography>Easy-Travel</Typography>
		</SidebarLayout>
	);
}
