"use client";

import { IconButton } from "@/components/UI/IconButton";
import { TextFieldProps, useViewModel } from "./viewmodel";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
	(props: TextFieldProps, ref) => {
		const vm = useViewModel(props);
		const { className, type: inputType, disabled, ...restProps } = props;

		function getInputType() {
			if (inputType === "password") {
				return vm.passwordVisible ? "text" : "password";
			}
			return inputType;
		}

		function renderLabel() {
			if (props.label) {
				return (
					<label className={twMerge("text-black", props.labelClass)}>
						{props.label}
					</label>
				);
			}
		}

		function renderPasswordVisibleButton() {
			if (inputType == "password") {
				return (
					<IconButton
						disabled={disabled}
						onClick={vm.onPasswordVisibleChangeClick}
						className={twMerge(
							"absolute right-[5px] bottom-[50%] translate-y-[50%] p-0 text-[20px] w-[30px] h-[30px] shadow-none border border-transparent",
							"hover:shadow-lg hover:border-violet-100"
						)}
						icon={
							vm.passwordVisible ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="1em"
									height="1em"
									viewBox="0 0 24 24"
								>
									<path
										fill="currentColor"
										d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
									></path>
								</svg>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="1em"
									height="1em"
									viewBox="0 0 256 256"
								>
									<path
										fill="currentColor"
										d="M53.92 34.62a8 8 0 1 0-11.84 10.76l19.24 21.17C25 88.84 9.38 123.2 8.69 124.76a8 8 0 0 0 0 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208a127.11 127.11 0 0 0 52.07-10.83l22 24.21a8 8 0 1 0 11.84-10.76Zm89 121.69a32 32 0 0 1-41.67-45.85Zm104.39-25.05c-.42.94-10.55 23.37-33.36 43.8a8 8 0 0 1-11.26-.57L101.4 63.07a8 8 0 0 1 4.6-13.28A134 134 0 0 1 128 48c34.88 0 66.57 13.26 91.66 38.35c18.83 18.83 27.3 37.62 27.65 38.41a8 8 0 0 1 0 6.5"
									></path>
								</svg>
							)
						}
					/>
				);
			}
		}

		return (
			<div className="flex flex-col w-full">
				{renderLabel()}
				<div className="relative">
					<input
						ref={ref}
						className={twMerge(
							"border-2 border-violet-200 py-3 px-3 bg-white rounded-xl text-gray-800 w-full resize-none h-fit shadow-sm",
							"disabled:border-violet-100 disabled:text-gray-400 disabled:bg-violet-50",
							"focus-visible:!outline-violet-400",
							"focus:!outline-violet-400",
							className
						)}
						type={getInputType()}
						disabled={disabled}
						{...restProps}
					/>
					{renderPasswordVisibleButton()}
				</div>
			</div>
		);
	}
);
