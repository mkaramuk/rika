import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface KanbanListComponentItemProps {
	children?: ReactNode;
	id: UniqueIdentifier;
}

export function KanbanListComponentItem(props: KanbanListComponentItemProps) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: props.id });

	return (
		<li
			{...attributes}
			{...listeners}
			ref={setNodeRef}
			className={twMerge(
				"transition-all duration-500 border border-slate-400 bg-space-500 p-2 rounded-lg",
				"hover:bg-slate-700"
			)}
			style={{
				opacity: isDragging ? 0.4 : undefined,
				transform: CSS.Translate.toString(transform),
				transition,
			}}
		>
			{props.children}
		</li>
	);
}
