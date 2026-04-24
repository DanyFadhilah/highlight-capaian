import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Highlight } from "../data/highlights";
import HighlightCard from "./HighlightCard";

type Props = {
  item: Highlight;
  onOpen: () => void;
};

export default function SortableHighlightCard({ item, onOpen }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.85 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="h-full min-h-0">
      <div className="relative h-full min-h-0">
        
        <div
          {...attributes}
          {...listeners}
          className="absolute top-2 right-2 z-10 cursor-grab active:cursor-grabbing p-2"
        >
          ☰
        </div>

        <HighlightCard item={item} onOpen={onOpen} />
      </div>
    </div>
  );
}
