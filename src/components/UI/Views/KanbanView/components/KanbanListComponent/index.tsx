import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { KanbanListComponentProps, useViewModel } from "./viewmodel";
import { KanbanListComponentItem } from "./components/KanbanListComponentItem";
import { CSS } from "@dnd-kit/utilities";
import { twMerge } from "tailwind-merge";

export function KanbanListComponent(props: KanbanListComponentProps) {
	const vm = useViewModel(props);

	function renderTitleEdit() {
		if (vm.titleEditing) {
			return (
				<input
					autoFocus
					ref={vm.titleEditInputRef}
					className={twMerge(
						"bg-slate-700 w-full  p-1 text-xl font-bold rounded-lg transition-all duration-500 outline-none border border-slate-500 ",
						"focus:outline-none",
						"focus-visible:outline-none"
					)}
					value={vm.title}
					onChange={vm.onTitleChange}
					onBlur={vm.onTitleBlur}
					onKeyDown={vm.onTitleEditOver}
				/>
			);
		}

		return (
			<div
				onDoubleClick={vm.onTitleEditStart}
				className={twMerge(
					"text-2xl font-bold text-ellipsis text-nowrap overflow-hidden w-[80s%]",
					"hover:cursor-pointer"
				)}
			>
				{props.list.title}
			</div>
		);
	}

	function renderCardAdd() {
		if (vm.cardAdding) {
			return (
				<li>
					<input
						autoFocus
						className={twMerge(
							"text-black w-full p-3 bg-slate-200 rounded-lg outline-none",
							"focus:outline-space-200"
						)}
						value={vm.newCardTitle}
						placeholder="Enter a title for new card"
						onKeyDown={vm.onNewCardTitleKeydown}
						onBlur={vm.onNewCardTitleBlur}
						onChange={vm.onNewCardTitleChange}
					/>
				</li>
			);
		}
	}

	return (
		<SortableContext
			id={props.list.id.toString()}
			items={props.list.items}
			strategy={verticalListSortingStrategy}
		>
			<div
				{...vm.attributes}
				{...vm.listeners}
				ref={vm.setNodeRefList}
				style={{
					opacity: vm.isDragging ? 0.4 : undefined,
					transform: CSS.Translate.toString(vm.transform),
					transition: vm.transition,
				}}
				className="h-fit bg-slate-800 shadow-lg text-white border border-gray-600 w-[350px] flex flex-col rounded-lg overflow-hidden flex-shrink-0 flex-grow-0"
			>
				<div className="flex items-center px-3 py-2">
					{renderTitleEdit()}
				</div>
				<hr className="w-[95%] self-center border-gray-700" />
				<ul
					ref={vm.setNodeRef}
					className="flex flex-col gap-3 p-5 overflow-y-auto"
				>
					{props.list.items.map((item, index) => (
						<KanbanListComponentItem key={index} id={item.id}>
							{item.content}
						</KanbanListComponentItem>
					))}
					{renderCardAdd()}
					<li
						onClick={vm.onNewCardClick}
						className={twMerge(
							"transition-all duration-200 flex items-center gap-3 w-full rounded-md p-3 border border-slate-700",
							"hover:cursor-pointer hover:bg-slate-700"
						)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="1em"
							height="1em"
							viewBox="0 0 24 24"
						>
							<path
								fill="currentColor"
								d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"
							></path>
						</svg>
						Add new card
					</li>
				</ul>
			</div>
		</SortableContext>
	);
}

KanbanListComponent.Item = KanbanListComponentItem;
