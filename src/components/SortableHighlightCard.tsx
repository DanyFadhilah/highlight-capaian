import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Highlight } from "../data/highlights";
import HighlightCard from "./HighlightCard";

type Props = {
  item: Highlight;
  onOpen: () => void;
  disabled?: boolean;
};

export default function SortableHighlightCard({ item, onOpen, disabled }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    disabled,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.85 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="h-full min-h-0">
      <div
        {...attributes}
        {...(!disabled ? listeners : {})}
        className="h-full min-h-0"
      >
        <HighlightCard item={item} onOpen={onOpen} />
      </div>
    </div>
  );
}
