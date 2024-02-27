"use client";

import { twMerge } from "tailwind-merge";
import { MenuItem } from "@/components/UI/MenuItem";
import { topbarHeight } from "@/constants/topbar";
import { Menu, MenuRadioGroup } from "@szhsin/react-menu";
import { usePreference } from "@/stores/usePreferenceStore";
import { useViewModel } from "./viewmodel";
import { Dot } from "@/components/UI/Dot";
import { Tooltip } from "react-tooltip";
import { useSession } from "next-auth/react";
import twColors from "tailwindcss/colors";

import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

export function TopBar() {
	const session = useSession();
	const preferences = usePreference();
	const vm = useViewModel();

	function renderProfilePictureContent() {
		if (session.data?.user?.profilePicture) {
			return <img src={session.data?.user?.profilePicture} />;
		}

		return (
			<div className="p-3 bg-indigo-300">
				{session.data?.user?.name?.[0]}
				{session.data?.user?.surname?.[0]}
			</div>
		);
	}

	return (
		<nav
			style={{
				height: `${topbarHeight}px`,
			}}
			className={twMerge(
				"w-full h-[70px] absolute top-0 bg-indigo-700 flex justify-between gap-3 p-2 items-center z-10"
			)}
		>
			<div className="flex gap-3 items-center">
				<Menu
					arrow
					arrowProps={{
						style: {
							backgroundColor: twColors.indigo[300],
						},
					}}
					portal
					menuStyle={{
						backgroundColor: twColors.indigo[300],
						padding: 0,
					}}
					menuButton={
						<button
							className={twMerge(
								"bg-indigo-500 h-[40px] text-white",
								"hover:bg-indigo-400"
							)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="1em"
								height="1em"
								viewBox="0 0 24 24"
							>
								<path
									fill="currentColor"
									d="M9 20h13v-4H9zM2 8h5V4H2zm0 6h5v-4H2zm0 6h5v-4H2zm7-6h13v-4H9zm0-6h13V4H9z"
								></path>
							</svg>
							<span>View</span>
						</button>
					}
					transition
				>
					<MenuRadioGroup
						value={preferences.view}
						onRadioChange={vm.onViewTypeChange}
					>
						<MenuItem type="radio" value="kanban">
							<Dot visible={preferences.view == "kanban"} />
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="1em"
								height="1em"
								viewBox="0 0 24 24"
							>
								<path
									fill="currentColor"
									d="M7 7h2v10H7zm4 0h2v5h-2zm4 0h2v8h-2z"
								></path>
								<path
									fill="currentColor"
									d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 16H5V5h14z"
								></path>
							</svg>{" "}
							Kanban
						</MenuItem>
						<MenuItem disabled type="radio" value="table">
							<Dot visible={preferences.view == "table"} />
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="1em"
								height="1em"
								viewBox="0 0 24 24"
							>
								<path
									fill="currentColor"
									d="M3 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm5 2v3H4V5zm-4 9v-4h4v4zm0 2h4v3H4zm6 0h10v3H10zm10-2H10v-4h10zm0-9v3H10V5z"
								></path>
							</svg>
							Table
						</MenuItem>
					</MenuRadioGroup>
				</Menu>
			</div>
			<div className="flex gap-3 items-center">
				<button
					onClick={vm.onAddListClick}
					className={twMerge(
						"bg-indigo-500 h-[40px] text-white",
						"hover:bg-indigo-400"
					)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						viewBox="0 0 24 24"
					>
						<path
							fill="currentColor"
							d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"
						></path>
					</svg>
					<span>Add List</span>
				</button>

				<Menu
					arrow
					arrowProps={{
						style: {
							backgroundColor: twColors.indigo[300],
						},
					}}
					portal
					menuStyle={{
						padding: 0,
						backgroundColor: twColors.indigo[300],
					}}
					menuButton={
						<button
							className={twMerge(
								"shadow-none p-0 group rounded-full overflow-hidden",
								"hover:shadow-lg"
							)}
						>
							{renderProfilePictureContent()}
						</button>
					}
					transition
				>
					<MenuItem
						onClick={vm.onLogoutClick}
						className="flex items-center gap-3"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="1em"
							height="1em"
							viewBox="0 0 24 24"
						>
							<path
								fill="currentColor"
								d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"
							></path>
						</svg>
						Logout
					</MenuItem>
				</Menu>
				<Tooltip
					delayShow={500}
					className="!bg-indigo-500"
					place="bottom-start"
					anchorSelect="#logoutButton"
				>
					Logout from your account
				</Tooltip>
			</div>
		</nav>
	);
}
