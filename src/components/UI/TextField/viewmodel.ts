import { ComponentProps, MouseEvent, useState } from "react";

export interface TextFieldProps extends ComponentProps<"input"> {
	label?: string;
	labelClass?: string;
}

export function useViewModel(props: TextFieldProps) {
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

	function onPasswordVisibleChangeClick(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		setPasswordVisible((old) => !old);
	}

	return {
		passwordVisible,

		onPasswordVisibleChangeClick,
	};
}
