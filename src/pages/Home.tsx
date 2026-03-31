import { useMemo, useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { highlights } from "../data/highlights";
import type { Highlight } from "../types/highlight";
import HighlightModal from "../components/HighlightModal";
import SortableHighlightCard from "../components/SortableHighlightCard";

const DEFAULT_ORDER = [
  "pertumbuhan-ekonomi",
  "lapangan-pekerjaan-baru",
  "makan-bergizi-gratis",
];

export default function Home() {
  const [selected, setSelected] = useState<Highlight | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function handleResize() {
      const baseWidth = 1536;
      const baseHeight = 0;

      const scaleX = window.innerWidth / baseWidth;
      const scaleY = window.innerHeight / baseHeight;

      const scaleValue = Math.min(scaleX, scaleY);

      setScale(scaleValue);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const orderedHighlights = useMemo(() => {
    const remaining = highlights
      .filter((h) => !DEFAULT_ORDER.includes(h.id))
      .map((h) => h.id);

    return [...DEFAULT_ORDER, ...remaining];
  }, []);

  const [items, setItems] = useState<string[]>(orderedHighlights);

  const itemMap = useMemo(() => {
    return new Map(highlights.map((h) => [h.id, h]));
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const topItems = items.slice(0, 3);
  const restItems = items.slice(3);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setItems((prev) => {
      const oldIndex = prev.indexOf(String(active.id));
      const newIndex = prev.indexOf(String(over.id));
      return arrayMove(prev, oldIndex, newIndex);
    });
  }

  return (
    <div className="w-screen h-screen overflow-hidden bg-slate-50 flex items-start justify-center">
      <div
        className="origin-top"
        style={{
          transform: `scale(${scale})`,
          width: "1536px",
        }}
      >
        <div className="px-10 py-8">
          <header className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <img src="/icon/garuda.svg" alt="Garuda" className="h-10 w-10" />
              <p className="text-2xl font-bold">
                Highlight Capaian Pemerintah Tahun 2026
              </p>
            </div>

            <p className="text-sm font-medium text-blue-600">
              {new Date().toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </header>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <main className="mt-6">
              <SortableContext items={items} strategy={rectSortingStrategy}>
                <div className="grid grid-cols-3 gap-4">
                  {topItems.map((id) => {
                    const item = itemMap.get(id);
                    if (!item) return null;

                    return (
                      <SortableHighlightCard
                        key={item.id}
                        item={item}
                        onOpen={() => setSelected(item)}
                      />
                    );
                  })}
                </div>

                <div className="mt-4 grid grid-cols-4 gap-4">
                  {restItems.map((id) => {
                    const item = itemMap.get(id);
                    if (!item) return null;

                    return (
                      <SortableHighlightCard
                        key={item.id}
                        item={item}
                        onOpen={() => setSelected(item)}
                      />
                    );
                  })}
                </div>

              </SortableContext>
            </main>
          </DndContext>

          {selected ? (
            <HighlightModal
              item={selected}
              open={!!selected}
              onOpenChange={(v) => {
                if (!v) setSelected(null);
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}