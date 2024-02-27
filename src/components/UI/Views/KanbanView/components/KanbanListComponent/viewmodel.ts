import { useSortable } from "@dnd-kit/sortable";
import { KanbanList } from "../../viewmodel";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useDroppable } from "@dnd-kit/core";

export interface KanbanListComponentProps {
	list: KanbanList;

	onTitleChange?: (title: string) => void;
	onNewCardAdded?: (title: string) => void;
}

export function useViewModel(props: KanbanListComponentProps) {
	const {
		setNodeRef: setNodeRefList,
		attributes,
		listeners,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: props.list.id });

	const [title, setTitle] = useState<string>(props.list.title);
	const [newCardTitle, setNewCardTitle] = useState<string>("");
	const [titleEditing, setTitleEditing] = useState<boolean>(false);
	const [cardAdding, setCardAdding] = useState<boolean>(false);

	const titleEditInputRef = useRef<HTMLInputElement | null>(null);
	const { setNodeRef } = useDroppable({ id: props.list.id });

	// Events
	function onTitleEditStart() {
		setTitleEditing(true);
		titleEditInputRef.current?.focus();
	}

	function onTitleEditOver(event: KeyboardEvent<HTMLInputElement>) {
		if (event.key == "Escape" || event.key == "Enter") {
			setTitleEditing(false);
		}
	}

	function onTitleBlur() {
		setTitleEditing(false);
	}

	function onTitleChange(event: ChangeEvent<HTMLInputElement>) {
		setTitle(event.target.value);
		props.onTitleChange?.(event.target.value);
	}

	function onNewCardTitleChange(event: ChangeEvent<HTMLInputElement>) {
		setNewCardTitle(event.target.value);
	}

	function onNewCardTitleBlur() {
		setCardAdding(false);
	}

	function onNewCardTitleKeydown(event: KeyboardEvent<HTMLInputElement>) {
		if (event.key === "Enter") {
			props.onNewCardAdded?.(newCardTitle);
			setCardAdding(false);
			setNewCardTitle("");
		}
	}

	function onNewCardClick() {
		setCardAdding(true);
	}

	useEffect(() => {
		setTitle(props.list.title);
	}, [props.list]);

	return {
		attributes,
		listeners,
		isDragging,
		transform,
		transition,
		setNodeRefList,
		setNodeRef,

		title,
		titleEditInputRef,
		titleEditing,
		cardAdding,
		newCardTitle,

		onTitleEditStart,
		onTitleEditOver,
		onTitleBlur,
		onTitleChange,

		onNewCardTitleChange,
		onNewCardTitleBlur,
		onNewCardTitleKeydown,

		onNewCardClick,
	};
}
