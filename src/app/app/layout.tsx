"use client";

import { twMerge } from "tailwind-merge";
import { TopBar } from "./components/TopBar";
import { topbarHeight } from "@/constants/topbar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Loading from "./loading";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = useSession();

	if (session.status === "loading") {
		return <Loading />;
	}

	if (session.status === "unauthenticated") {
		return redirect("/login");
	}

	return (
		<>
			<TopBar />
			<div
				style={{
					top: `${topbarHeight}px`,
					height: `calc(100vh - ${topbarHeight}px)`,
				}}
				className={twMerge(
					"absolute bg-gray-800 overflow-y-auto w-full"
				)}
			>
				{children}
			</div>
		</>
	);
}
