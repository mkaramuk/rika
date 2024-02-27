import { ViewType, usePreference } from "@/stores/usePreferenceStore";
import { useView } from "@/stores/useView";
import { RadioChangeEvent } from "@szhsin/react-menu";
import { signOut, useSession } from "next-auth/react";

export function useViewModel() {
	const preferences = usePreference();
	const view = useView();

	function onViewTypeChange(event: RadioChangeEvent) {
		preferences.changeView(event.value as ViewType);
	}

	function onAddListClick() {
		view.addList("New List");
	}

	async function onLogoutClick() {
		await signOut({
			callbackUrl: "/login",
			redirect: true,
		});
	}

	return {
		onViewTypeChange,
		onAddListClick,
		onLogoutClick,
	};
}
