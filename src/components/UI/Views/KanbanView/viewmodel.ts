import {
	DragOverEvent,
	DragStartEvent,
	MouseSensor,
	PointerSensor,
	UniqueIdentifier,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	MouseEvent,
	ReactNode,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";

export interface KanbanListItem {
	id: UniqueIdentifier;
	content: ReactNode;
}

export interface KanbanList {
	id: UniqueIdentifier;
	title: string;
	items: KanbanListItem[];
}

export interface KanbanViewProps {
	lists?: KanbanList[];
	className?: string;
	onChange?: (lists: KanbanList[]) => void;
}

export function useViewModel(props: KanbanViewProps) {
	const mouseSensor = useSensor(MouseSensor, {
		activationConstraint: {
			distance: 10,
		},
	});
	const pointerSensor = useSensor(PointerSensor, {
		activationConstraint: {
			distance: 10,
		},
	});
	const sensors = useSensors(mouseSensor, pointerSensor);

	const [listsState, setListsState] = useState<KanbanList[]>(
		props.lists ?? []
	);
	const [draggingItem, setDraggingItem] = useState<KanbanListItem | null>(
		null
	);
	const [draggingList, setDraggingList] = useState<KanbanList | null>(null);
	const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
	const [scrollInfo, setScrollInfo] = useState({
		startX: 0,
		startY: 0,
		scrollLeft: 0,
		scrollTop: 0,
	});

	const viewRef = useRef<HTMLDivElement>(null);

	// Functions
	function lists() {
		if (props.lists) {
			return props.lists;
		}
		return listsState;
	}

	function setLists(value: SetStateAction<KanbanList[]>) {
		if (props.lists) {
			props.onChange?.(
				typeof value === "function" ? value(props.lists) : value
			);
		}
		setListsState(value);
	}

	function findParentListOfItem(
		kanbanLists: KanbanList[],
		itemId?: UniqueIdentifier
	): KanbanList | undefined {
		if (!itemId) return;
		for (const list of kanbanLists) {
			if (list.id == itemId) return list;
			for (const item of list.items) {
				if (item.id == itemId) {
					return list;
				}
			}
		}
	}

	function findDraggingItem(
		kanbanLists: KanbanList[],
		id?: UniqueIdentifier
	): KanbanList | KanbanListItem | undefined {
		if (!id) return;
		for (const list of kanbanLists) {
			if (id == list.id) return list;
			for (const item of list.items) {
				if (item.id == id) {
					return item;
				}
			}
		}
	}

	function changeListTitle(id: UniqueIdentifier, title: string) {
		setLists((old) => {
			const newList = [...old];
			const index = newList.findIndex((x) => x.id == id);

			if (index != -1) {
				newList[index].title = title;
			}
			return newList;
		});
	}

	function addNewCard(id: UniqueIdentifier, title: string) {
		setLists((old) => {
			const newList = [...old];
			const index = newList.findIndex((x) => x.id == id);

			if (index != -1) {
				newList[index].items.push({
					content: title,
					id: `${id}_${newList[index].items.length + 1}`,
				});
			}
			return newList;
		});
	}

	// Events
	function onDragCancel() {
		setDraggingItem(null);
		setDraggingList(null);
	}

	function onDragStart({ active }: DragStartEvent) {
		let item = findDraggingItem(lists(), active.id.toString());
		if (item) {
			// It is a list
			if ("items" in item) {
				setDraggingList(item);
			} else {
				setDraggingItem(item);
			}
		}
	}

	function onDragOver(event: DragOverEvent) {
		const { active, over } = event;

		setLists((old) => {
			let newLists = [...old];
			const dragType = findDraggingItem(newLists, active.id.toString());

			if (dragType) {
				if ("items" in dragType) {
					const element = Object.assign(
						{},
						newLists.find((list) => list.id == active.id.toString())
					);
					let toIndex = newLists.findIndex(
						(list) => list.id == over?.id.toString()
					);

					if (toIndex == -1) {
						const parent = findParentListOfItem(
							newLists,
							over?.id.toString()
						);
						toIndex = newLists.findIndex(
							(list) => list.id == parent?.id
						);
					}

					if (element && toIndex > -1) {
						newLists = newLists.filter(
							(list) => list.id != active.id.toString()
						);
						newLists.splice(toIndex, 0, element);
						console.log(newLists);
					}
				} else {
					const fromContainer = findParentListOfItem(
						newLists,
						active.id.toString()
					);
					const toContainer = findParentListOfItem(
						newLists,
						over?.id.toString()
					);

					if (!fromContainer || !toContainer) return newLists;

					const fromIndex = fromContainer.items.findIndex(
						(item) => item.id == active.id
					);

					const toIndex = toContainer.items.findIndex(
						(item) => item.id === over?.id
					);

					const element = fromContainer.items[fromIndex];
					fromContainer.items = fromContainer.items.filter(
						(item) => item.id != active.id
					);

					toContainer.items.splice(toIndex, 0, element);
				}
			}

			return newLists;
		});
	}

	function onDragEnd() {
		setDraggingItem(null);
		setDraggingList(null);
	}

	function onViewMouseDown(e: MouseEvent<HTMLDivElement>) {
		setIsMouseDown(true);
		if (viewRef.current) {
			setScrollInfo((old) => ({
				...old,
				startX: e.pageX - viewRef.current!.offsetLeft,
				startY: e.pageY - viewRef.current!.offsetTop,
				scrollLeft: viewRef.current!.scrollLeft,
				scrollTop: viewRef.current!.scrollTop,
			}));
		}
	}

	function onViewMouseUpAndLeave() {
		setIsMouseDown(false);
	}

	function onMouseMove(e: MouseEvent<HTMLDivElement>) {
		if (!isMouseDown) return;
		e.preventDefault();

		if (viewRef.current) {
			const x = e.pageX - viewRef.current.offsetLeft;
			const y = e.pageY - viewRef.current.offsetTop;
			const walkX = (x - scrollInfo.startX) * 1;
			const walkY = (y - scrollInfo.startY) * 1;
			viewRef.current.scrollLeft = scrollInfo.scrollLeft - walkX;
			viewRef.current.scrollTop = scrollInfo.scrollTop - walkY;
		}
	}

	return {
		lists,
		isMouseDown,
		draggingItem,
		draggingList,
		sensors,
		viewRef,

		onDragCancel,
		onDragEnd,
		onDragStart,
		onDragOver,
		onViewMouseDown,
		onViewMouseUpAndLeave,
		onMouseMove,
		changeListTitle,
		addNewCard,
	};
}
