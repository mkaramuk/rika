import { twMerge } from "tailwind-merge";
import twColors from "tailwindcss/colors";

export function Dot(props: {
	size?: number;
	color?: string;
	visible?: boolean;
}) {
	const size = props.size ?? 8;
	const color = props.color ?? twColors.indigo[500];

	return (
		<div
			style={{
				width: `${size}px`,
				height: `${size}px`,
				backgroundColor: props.visible ? color : "transparent",
			}}
			className={twMerge("rounded-full")}
		/>
	);
}
