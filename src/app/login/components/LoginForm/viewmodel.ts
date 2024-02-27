import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useState } from "react";
import * as yup from "yup";
import { useRouter } from "next/navigation";

const formSchema = yup.object().shape({
	email: yup.string().required("Please enter your e-mail"),
	password: yup.string().required("Please enter password"),
});

type LoginForm = yup.InferType<typeof formSchema>;
type LoginState = {
	loading?: boolean;
	error?: string;
};

export function useViewModel() {
	const [loginState, setLoginState] = useState<LoginState>({});
	const router = useRouter();
	const formMethods = useForm<LoginForm>({
		resolver: yupResolver(formSchema),
	});

	const onSubmit = formMethods.handleSubmit(async (values) => {
		setLoginState((old) => ({ ...old, loading: true }));

		const status = await signIn("credentials", {
			...values,
			callbackUrl: "/app",
			redirect: false,
		});

		if (status?.error === null) {
			return router.replace("/app");
		}

		setLoginState(() => ({
			loading: false,
			error: "Please check your credentials",
		}));
	});

	return {
		formMethods,
		loginState,

		onSubmit,
	};
}
