import { useMemo, useState, useEffect, useRef, useCallback } from "react";
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

const DESIGN_BASE_WIDTH = 1536;
const DESIGN_BASE_HEIGHT = 820;

const DEFAULT_ORDER = [
  "pertumbuhan-ekonomi",
  "lapangan-pekerjaan-baru",
  "makan-bergizi-gratis",
];

export default function Home() {
  const [selected, setSelected] = useState<Highlight | null>(null);
  const [scale, setScale] = useState(1);
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const bgmStarted = useRef(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  const startBgm = useCallback(() => {
    const audio = bgmRef.current;
    if (!audio || bgmStarted.current) return;

    audio.volume = 0.35;
    audio.play().then(() => {
      bgmStarted.current = true;
    }).catch(() => {});
  }, []);

  useEffect(() => {
    startBgm();

    const fallback = () => {
      startBgm();
      if (bgmStarted.current) {
        window.removeEventListener("click", fallback);
        window.removeEventListener("keydown", fallback);
      }
    };

    window.addEventListener("click", fallback);
    window.addEventListener("keydown", fallback);

    return () => {
      window.removeEventListener("click", fallback);
      window.removeEventListener("keydown", fallback);
    };
  }, [startBgm]);

  useEffect(() => {
    const audio = bgmRef.current;
    if (!audio) return;

    if (selected) {
      audio.pause();
    } else if (bgmStarted.current) {
      audio.play().catch(() => {});
    }
  }, [selected]);

  useEffect(() => {
    function handleResize() {
      const scaleX = window.innerWidth / DESIGN_BASE_WIDTH;
      const scaleY = window.innerHeight / DESIGN_BASE_HEIGHT;
      setScale(Math.min(scaleX, scaleY));
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

  const topItems = items.slice(0, 3);
  const restItems = items.slice(3);

  const restRows = useMemo(() => {
    const perRow = 4;
    const rows: string[][] = [];
    for (let i = 0; i < restItems.length; i += perRow) {
      rows.push(restItems.slice(i, i + perRow));
    }
    return rows;
  }, [restItems]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setItems((prev) => {
      const oldIndex = prev.indexOf(String(active.id));
      const newIndex = prev.indexOf(String(over.id));
      return arrayMove(prev, oldIndex, newIndex);
    });
  }

  const tanggalHariIni = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <audio ref={bgmRef} src="/audio/backsound.mp3" loop preload="auto" />

      <div className="hidden lg:flex h-dvh w-screen max-w-[100vw] items-center justify-center overflow-hidden bg-slate-50">
        <div
          className="origin-center flex shrink-0 flex-col"
          style={{
            transform: `scale(${scale})`,
            width: DESIGN_BASE_WIDTH,
            height: DESIGN_BASE_HEIGHT,
          }}
        >
          <div className="flex min-h-0 flex-1 flex-col px-10 py-8">
            <div className="flex items-center gap-3 justify-center">
              <img src="/icon/garuda.svg" alt="Garuda" className="h-10 w-10" />
              <p className="text-2xl font-bold">
                Dashboard AI Presiden Prabowo Subianto
              </p>
            </div>

            <header className="flex items-start justify-between mt-1">
              <p className="text-xl font-semibold">
                Highlight Capaian Pemerintah Tahun 2026
              </p>
              <p className="text-sm font-medium text-blue-600">
                {tanggalHariIni}
              </p>
            </header>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <main className="mt-6 flex min-h-0 flex-1 flex-col gap-4">
                <SortableContext items={items} strategy={rectSortingStrategy}>
                  <div className="grid min-h-0 flex-1 grid-cols-3 gap-4">
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

                  {restRows.map((rowIds, rowIndex) => (
                    <div
                      key={`rest-row-${rowIndex}`}
                      className="grid min-h-0 flex-1 grid-cols-4 gap-4"
                    >
                      {rowIds.map((id) => {
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
                  ))}
                </SortableContext>
              </main>
            </DndContext>
          </div>
        </div>
      </div>

      <div className="lg:hidden min-h-dvh w-full bg-slate-50">
        <div className="mx-auto flex w-full max-w-[720px] flex-col px-4 py-5 sm:px-6 sm:py-6">
          <div className="flex items-center justify-center gap-2 text-center">
            <img
              src="/icon/garuda.svg"
              alt="Garuda"
              className="h-7 w-7 sm:h-9 sm:w-9"
            />
            <p className="text-base font-bold leading-tight sm:text-xl">
              Dashboard AI Presiden Prabowo Subianto
            </p>
          </div>

          <header className="mt-3 flex flex-col gap-1">
            <p className="text-base font-semibold sm:text-lg">
              Highlight Capaian Pemerintah Tahun 2026
            </p>
            <p className="text-xs font-medium text-blue-600 sm:text-sm">
              {tanggalHariIni}
            </p>
          </header>

          <DndContext>
            <main className="mt-4 pb-6">
              <SortableContext items={items} strategy={rectSortingStrategy}>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  {items.map((id) => {
                    const item = itemMap.get(id);
                    if (!item) return null;

                    return (
                      <SortableHighlightCard
                        key={item.id}
                        item={item}
                        onOpen={() => setSelected(item)}
                        disabled={true}
                      />
                    );
                  })}
                </div>
              </SortableContext>
            </main>
          </DndContext>
        </div>
      </div>

      {selected ? (
        <HighlightModal
          item={selected}
          open={!!selected}
          onOpenChange={(v) => {
            if (!v) setSelected(null);
          }}
        />
      ) : null}
    </>
  );
}
