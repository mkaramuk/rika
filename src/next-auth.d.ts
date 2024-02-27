import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

interface UserObject {
	surname?: string;
	profilePicture?: string | null;
}

declare module "next-auth/jwt" {
	interface JWT extends UserObject {}
}

declare module "next-auth" {
	interface Session extends DefaultSession {
		user?: User;
	}

	interface User extends UserObject {}
}
