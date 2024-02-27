"use client";

import { MenuItemProps, MenuItem as ReactMenuItem } from "@szhsin/react-menu";
import { twMerge } from "tailwind-merge";

export function MenuItem(props: MenuItemProps) {
	return (
		<ReactMenuItem
			{...props}
			className={twMerge(
				"flex items-center gap-2 !transition-all !duration-200 !px-4 !py-3 !pl-5",
				"hover:!bg-indigo-200",
				props.disabled && "!text-gray-500"
			)}
		>
			{props.children}
		</ReactMenuItem>
	);
}
