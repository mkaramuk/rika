import {
	KanbanList,
	KanbanListItem,
} from "@/components/UI/Views/KanbanView/viewmodel";
import { UniqueIdentifier } from "@dnd-kit/core";
import { create } from "zustand";

interface ViewStore {
	// TODO: Design another struct for various views.
	lists: KanbanList[];

	setKanbanLists: (lists: KanbanList[]) => void;
	addList: (
		title: string,
		items?: KanbanListItem[],
		id?: UniqueIdentifier
	) => void;
}

export const useView = create<ViewStore>((set, get) => ({
	lists: [],

	addList(title, items, id) {
		set((state) => ({
			lists: [
				...state.lists,
				{
					id:
						id ??
						Date.now().toString(36) +
							Math.random().toString(36).substring(4),
					items: items ?? [],
					title,
				},
			],
		}));
	},
	setKanbanLists(lists) {
		set(() => ({ lists }));
	},
}));
