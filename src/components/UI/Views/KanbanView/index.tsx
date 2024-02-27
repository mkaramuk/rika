import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import { KanbanViewProps, useViewModel } from "./viewmodel";
import {
	SortableContext,
	horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { KanbanListComponent } from "@/components/UI/Views/KanbanView/components/KanbanListComponent";
import NoSSR from "@/controllers/NoSSR";
import { twMerge } from "tailwind-merge";

export function KanbanView(props: KanbanViewProps) {
	const vm = useViewModel(props);

	function renderItemOverlay() {
		if (vm.draggingItem) {
			return (
				<div className="rotate-3 border-2 border-space-400 bg-space-500 p-2 rounded-lg text-white">
					{vm.draggingItem.content}
				</div>
			);
		}
	}

	function renderListOverlay() {
		if (vm.draggingList) {
			return (
				<div className="rotate-2 bg-space-600 shadow-2xl text-white border-2 border-space-400 w-[350px] h-fit flex flex-col rounded-lg overflow-hidden">
					<div className="mx-4 my-2 text-2xl font-bold">
						{vm.draggingList.title}
					</div>
					<hr className="w-[90%] self-center border-space-200" />
					<ul className="flex flex-col gap-3 p-5 overflow-y-auto ">
						{vm.draggingList.items.map((item, index) => (
							<li
								key={index}
								className="transition-all duration-500 border-2 border-space-400 bg-space-500 p-2 rounded-lg hover:bg-space-400 hover:border-space-300"
							>
								{item.content}
							</li>
						))}
					</ul>
				</div>
			);
		}
	}

	return (
		<NoSSR>
			<DndContext
				collisionDetection={closestCenter}
				sensors={vm.sensors}
				onDragStart={vm.onDragStart}
				onDragCancel={vm.onDragCancel}
				onDragOver={vm.onDragOver}
				onDragEnd={vm.onDragEnd}
			>
				<SortableContext
					id="kanban-view"
					items={vm.lists()}
					strategy={horizontalListSortingStrategy}
				>
					<div
						ref={vm.viewRef}
						onMouseDown={vm.onViewMouseDown}
						onMouseLeave={vm.onViewMouseUpAndLeave}
						onMouseUp={vm.onViewMouseUpAndLeave}
						onMouseMove={vm.onMouseMove}
						className={twMerge(
							"flex gap-[20px] w-full h-full overflow-x-auto",
							vm.isMouseDown && "cursor-grabbing",
							props.className
						)}
					>
						{vm.lists().map((list, index) => (
							<KanbanListComponent
								key={index}
								onTitleChange={(newTitle) =>
									vm.changeListTitle(list.id, newTitle)
								}
								onNewCardAdded={(title) =>
									vm.addNewCard(list.id, title)
								}
								list={list}
							/>
						))}
					</div>
				</SortableContext>
				<DragOverlay>
					{renderListOverlay()}
					{renderItemOverlay()}
				</DragOverlay>
			</DndContext>
		</NoSSR>
	);
}
