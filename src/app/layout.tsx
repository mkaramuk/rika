import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Rika",
	description: "Rika project management tool",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	return (
		<html lang="en">
			<SessionProvider session={session}>
				<body className={twMerge("w-screen", inter.className)}>
					{children}
				</body>
			</SessionProvider>
		</html>
	);
}
