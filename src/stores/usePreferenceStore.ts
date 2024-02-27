import { create } from "zustand";

export type ViewType = "table" | "kanban";

interface PreferenceStore {
	view: ViewType;

	changeView: (view: ViewType) => void;
}

export const usePreference = create<PreferenceStore>((set, get) => ({
	// TODO: Load preferences from API.
	view: "kanban",

	changeView(view) {
		set(() => ({ view }));
	},
}));
