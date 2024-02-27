import { TextField } from "@/components/UI/TextField";
import { TextFieldProps } from "@/components/UI/TextField/viewmodel";
import { Controller, useFormContext } from "react-hook-form";

export function InputTextField(
	props: TextFieldProps & { name: string; inputName?: string }
) {
	const { control } = useFormContext();
	const { name, inputName, defaultValue, disabled, ...restProps } = props;

	return (
		<Controller
			name={name}
			disabled={disabled}
			control={control}
			defaultValue={defaultValue ?? ""}
			render={({ field, fieldState: { error } }) => (
				<div className="w-full flex flex-col gap-1">
					<TextField
						{...restProps}
						{...field}
						name={inputName ?? name}
					/>
					{error && (
						<div className="text-red-500 text-[14px] font-normal italic">
							{error?.message}
						</div>
					)}
				</div>
			)}
		/>
	);
}
