import { auth } from "@/auth";
import { LoginForm } from "./components/LoginForm";
import { redirect } from "next/navigation";

export default async function Page() {
	const session = await auth();

	if (session) {
		return redirect("/app");
	}

	return (
		<div className="w-screen h-screen bg-[linear-gradient(129deg,rgba(47,15,84,1)_30%,rgba(71,8,142,1)_100%)] flex items-center justify-center">
			<div className="w-[400px] bg-violet-200 rounded-xl shadow-xl border border-violet-400 flex flex-col p-[20px]">
				<img className="w-[100px] self-center" src="/rika-logo.svg" />
				<LoginForm />
			</div>
		</div>
	);
}
