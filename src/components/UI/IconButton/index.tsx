"use client";

import { IconButtonProps, useViewModel } from "./viewmodel";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	(props: IconButtonProps, ref) => {
		const vm = useViewModel(props);
		const {
			className,
			children,
			icon,
			assignRoute,
			href,
			onClick,
			...restProps
		} = props;

		return (
			<button
				ref={ref}
				className={twMerge(
					"p-1 w-[40px] h-[40px] rounded-full text-[20px] flex items-center justify-center",
					"hover:bg-primary hover:text-black",
					"disabled:hover:bg-gray-100",
					className
				)}
				onClick={vm.onClick}
				{...restProps}
			>
				{icon}
				{children}
			</button>
		);
	}
);
