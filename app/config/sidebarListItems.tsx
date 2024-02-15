import { ReactElement } from "react";
import { SvgIcon } from "@mui/material";
import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import LockClosedIcon from "@heroicons/react/24/solid/LockClosedIcon";
import ShoppingBagIcon from "@heroicons/react/24/solid/ShoppingBagIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import UserPlusIcon from "@heroicons/react/24/solid/UserPlusIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

type SidebarItem = {
	title: string;
	path: string;
	icon: ReactElement;
	disabled?: boolean;
	external?: boolean;
};

export const items: SidebarItem[] = [
	{
		title: "Overview",
		path: "/",
		icon: (
			<SvgIcon fontSize="small">
				<ChartBarIcon />
			</SvgIcon>
		),
	},

	{
		title: "Account",
		path: "/account",
		icon: (
			<SvgIcon fontSize="small">
				<UserIcon />
			</SvgIcon>
		),
	},
	{
		title: "Settings",
		path: "/settings",
		icon: (
			<SvgIcon fontSize="small">
				<CogIcon />
			</SvgIcon>
		),
	},
];
