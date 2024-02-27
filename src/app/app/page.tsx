"use client";

import { useView } from "@/stores/useView";
import { useViewModel } from "./viewmodel";
import { KanbanView } from "@/components/UI/Views/KanbanView";

export default function Page() {
	const view = useView();
	const vm = useViewModel();

	return (
		<div className="w-full h-full text-white">
			<div className="w-full h-full">
				<KanbanView
					className="p-3"
					onChange={vm.onKanbanChange}
					lists={view.lists}
				/>
			</div>
		</div>
	);
}
