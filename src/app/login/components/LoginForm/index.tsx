"use client";

import { FormProvider } from "react-hook-form";
import { useViewModel } from "./viewmodel";
import { InputTextField } from "@/components/HookForm/InputTextField";
import { twMerge } from "tailwind-merge";

export function LoginForm() {
	const vm = useViewModel();

	function renderError() {
		if (vm.loginState.error) {
			return (
				<div className="italic text-red-500 w-full text-center">
					{vm.loginState.error}
				</div>
			);
		}
	}

	function renderLoginButtonContent() {
		if (vm.loginState.loading) {
			return (
				<div className="text-violet-700">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="30px"
						height="30px"
						viewBox="0 0 24 24"
					>
						<path
							fill="currentColor"
							d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
							opacity={0.5}
						></path>
						<path
							fill="currentColor"
							d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"
						>
							<animateTransform
								attributeName="transform"
								dur="1s"
								from="0 12 12"
								repeatCount="indefinite"
								to="360 12 12"
								type="rotate"
							></animateTransform>
						</path>
					</svg>
				</div>
			);
		}

		return "Login";
	}

	return (
		<FormProvider {...vm.formMethods}>
			<form onSubmit={vm.onSubmit} className="flex flex-col gap-3">
				<InputTextField
					disabled={vm.loginState.loading}
					label="E-Mail"
					name="email"
				/>
				<InputTextField
					disabled={vm.loginState.loading}
					label="Password"
					type="password"
					name="password"
				/>
				{renderError()}
				<button
					disabled={vm.loginState.loading}
					type="submit"
					className={twMerge(
						"bg-white h-[50px]",
						"hover:bg-violet-400 hover:text-white",
						"disabled:bg-gray-100"
					)}
				>
					{renderLoginButtonContent()}
				</button>
			</form>
		</FormProvider>
	);
}
