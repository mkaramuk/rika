import { KanbanList } from "@/components/UI/Views/KanbanView/viewmodel";
import { useView } from "@/stores/useView";
import { useState } from "react";

export function useViewModel() {
	const view = useView();

	// Events
	function onKanbanChange(kanbanLists: KanbanList[]) {
		view.setKanbanLists(kanbanLists);
	}

	return {
		onKanbanChange,
	};
}
