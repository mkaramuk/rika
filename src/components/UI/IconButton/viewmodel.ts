import { useRouter } from "next/navigation";
import { ComponentProps, MouseEvent, ReactNode } from "react";

export type IconButtonProps = ComponentProps<"button"> & {
	icon: ReactNode;
	href?: string;
	assignRoute?: boolean;
};

export function useViewModel(props: IconButtonProps) {
	const router = useRouter();

	function onClick(e: MouseEvent<HTMLButtonElement>) {
		if (props.href) {
			if (props.assignRoute) {
				window.location.assign(props.href);
			} else {
				router.push(props.href);
			}
		}
		props.onClick?.(e);
	}

	return {
		onClick,
	};
}
