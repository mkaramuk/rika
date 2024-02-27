import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const prisma = new PrismaClient();

export const {
	handlers: { GET, POST },
	auth,
} = NextAuth({
	pages: {
		signIn: "/login",
	},
	session: {
		strategy: "jwt",
	},
	callbacks: {
		jwt({ token, user }) {
			if (user) {
				token = { ...token, ...user };
			}
			return token;
		},

		session({ session, token }) {
			if (token && session.user) {
				session.user.id = token.id as string;
				session.user.name = token.name!;
				session.user.surname = token.surname;
				session.user.email = token.email!;
				session.user.profilePicture = token.profilePicture!;
			}
			return session;
		},
	},
	providers: [
		Credentials({
			name: "credentials",
			credentials: {
				email: {},
				password: {},
			},
			type: "credentials",
			async authorize(credentials, req) {
				const user = await prisma.user.findFirst({
					where: {
						email: credentials!.email as string,
					},
				});

				// TODO: Check the password by hashing it.
				if (!user || user.password != credentials.password) {
					return null;
				}

				return {
					id: user.id.toString(),
					name: user.name,
					surname: user.surname,
					email: user.email,
					profilePicture: user.profilePicture,
				};
			},
		}),
	],
});
