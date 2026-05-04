import {
  useMemo,
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
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
import {
  buildHighlightMapForQuarter,
  getDashboardMeta,
  getDefaultQuarterId,
  listQuarterOptions,
  type DashboardQuarterId,
} from "../lib/dashboardQuarter";

/** Lebar desain minimum; di layar lebar diperlebar sampai DESIGN_MAX_WIDTH jika skala dibatasi tinggi. */
const DESIGN_MIN_WIDTH = 1536;
const DESIGN_MAX_WIDTH = 2800;

const DEFAULT_ORDER = [
  "pertumbuhan-ekonomi",
  "lapangan-pekerjaan-baru",
  "makan-bergizi-gratis",
];

export default function Home() {
  const [selected, setSelected] = useState<Highlight | null>(null);
  const [quarterId, setQuarterId] =
    useState<DashboardQuarterId>(getDefaultQuarterId);
  const [scale, setScale] = useState(1);
  const [designContentHeight, setDesignContentHeight] = useState(1080);
  const [designCanvasWidth, setDesignCanvasWidth] = useState(DESIGN_MIN_WIDTH);
  const desktopStageRef = useRef<HTMLDivElement | null>(null);
  const designMeasureRef = useRef<HTMLDivElement | null>(null);
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
    audio
      .play()
      .then(() => {
        bgmStarted.current = true;
      })
      .catch(() => {});
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

  const orderedHighlights = useMemo(() => {
    const remaining = highlights
      .filter((h) => !DEFAULT_ORDER.includes(h.id))
      .map((h) => h.id);

    return [...DEFAULT_ORDER, ...remaining];
  }, []);

  const [items, setItems] = useState<string[]>(orderedHighlights);

  const itemMap = useMemo(
    () => buildHighlightMapForQuarter(quarterId),
    [quarterId],
  );

  const quarterOptions = useMemo(() => listQuarterOptions(), []);

  const activeQuarterLabel = useMemo(() => {
    return quarterOptions.find((q) => q.id === quarterId)?.period ?? "";
  }, [quarterId, quarterOptions]);

  const dashboardMeta = useMemo(() => getDashboardMeta(), []);

  const updateDesktopFit = useCallback(() => {
    const stage = desktopStageRef.current;
    const design = designMeasureRef.current;
    if (!stage || !design) return;

    const vw = stage.clientWidth;
    const vh = stage.clientHeight;
    /** Stage belum ter-layout (mis. `display:none` sebelum breakpoint) — hindari NaN / loop. */
    if (vw < 8 || vh < 8) return;

    const w = designCanvasWidth;

    const contentH = Math.max(1, Math.ceil(design.scrollHeight));
    const scaleW = vw / w;
    const scaleH = vh / contentH;

    if (!Number.isFinite(scaleW) || !Number.isFinite(scaleH)) return;

    // Hanya perlebar kanvas bila tinggi viewport yang membatasi skala.
    // Jangan paksa kembali ke DESIGN_MIN_WIDTH saat dibatasi lebar — itu bikin loncat 1536 ↔ lebar
    // besar dan memicu update tanpa akhir (layar putih).
    if (scaleH < scaleW) {
      const idealW = Math.min(
        DESIGN_MAX_WIDTH,
        Math.max(DESIGN_MIN_WIDTH, Math.floor((vw * 0.998) / scaleH)),
      );
      if (Math.abs(idealW - w) > 6) {
        setDesignCanvasWidth(idealW);
        return;
      }
    }

    const h = Math.max(1, Math.ceil(design.scrollHeight));
    const next = Math.min(vw / designCanvasWidth, vh / h) * 0.995;
    const safe = Number.isFinite(next) && next > 0 ? next : 1;

    setDesignContentHeight((prev) => (prev === h ? prev : h));
    setScale((prev) => (Math.abs(prev - safe) < 1e-4 ? prev : safe));
  }, [designCanvasWidth]);

  useLayoutEffect(() => {
    updateDesktopFit();
  }, [updateDesktopFit, quarterId, items]);

  useEffect(() => {
    const stage = desktopStageRef.current;
    const design = designMeasureRef.current;
    if (!stage || !design) return;

    let raf = 0;
    const scheduleFit = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        raf = 0;
        updateDesktopFit();
      });
    };

    const ro = new ResizeObserver(scheduleFit);
    ro.observe(stage);
    ro.observe(design);
    window.addEventListener("resize", scheduleFit);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", scheduleFit);
    };
  }, [updateDesktopFit]);

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

      <div
        ref={desktopStageRef}
        className="hidden lg:flex lg:h-dvh lg:w-screen lg:max-w-[100vw] lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:bg-slate-50"
      >
        <div className="flex min-h-dvh w-full shrink-0 flex-col items-center justify-center px-1 py-2 sm:px-2">
        <div
          className="shrink-0 overflow-hidden"
          style={{
            width: designCanvasWidth * scale,
            height: designContentHeight * scale,
          }}
        >
          <div
            ref={designMeasureRef}
            className="flex shrink-0 flex-col"
            style={{
              width: designCanvasWidth,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          >
            <div className="flex min-h-0 w-full shrink-0 flex-col px-6 pb-6 pt-8 sm:px-8 lg:px-10">
            <div className="flex items-center justify-center gap-4">
              <img src="/icon/garuda.svg" alt="Garuda" className="h-12 w-12 shrink-0" />
              <p className="text-3xl font-bold tracking-tight sm:text-4xl">
                Dashboard AI Presiden Prabowo Subianto
              </p>
            </div>

            <header className="mt-4 flex flex-wrap items-end justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-2xl font-semibold leading-snug text-slate-900 sm:text-3xl">
                  Highlight Capaian Pemerintah Tahun 2026
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <label
                    htmlFor="dashboard-quarter"
                    className="shrink-0 text-base font-medium text-slate-700 sm:text-lg"
                  >
                    Periode data
                  </label>
                  <select
                    id="dashboard-quarter"
                    value={quarterId}
                    onChange={(e) =>
                      setQuarterId(e.target.value as DashboardQuarterId)
                    }
                    className="
                      max-w-full rounded-lg border border-slate-200 bg-white
                      px-4 py-2.5 text-base font-medium text-slate-800 shadow-sm
                      outline-none ring-slate-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100
                      sm:text-lg
                    "
                  >
                    {quarterOptions.map((q) => (
                      <option key={q.id} value={q.id}>
                        {q.label}
                      </option>
                    ))}
                  </select>
                </div>
                {activeQuarterLabel ? (
                  <p className="mt-2 text-base text-slate-600 sm:text-lg">{activeQuarterLabel}</p>
                ) : null}
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1 text-right">
                <p className="text-lg font-semibold text-blue-600 sm:text-xl">{tanggalHariIni}</p>
                <p className="max-w-[20rem] text-sm leading-snug text-slate-500 sm:text-base">
                  Tampilan kartu mengikuti periode
                </p>
              </div>
            </header>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <main className="mt-5 flex min-h-0 shrink-0 flex-col gap-3">
                <SortableContext items={items} strategy={rectSortingStrategy}>
                  <div className="grid min-h-0 shrink-0 grid-cols-3 gap-3">
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
                      className="grid min-h-0 shrink-0 grid-cols-4 gap-3"
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
        </div>

        <footer className="mx-auto w-full max-w-4xl shrink-0 border-t border-slate-200 bg-slate-50 px-6 py-10 pb-16 sm:px-10">
          <p className="text-base font-medium leading-relaxed text-slate-800 sm:text-lg">
            {dashboardMeta.description}
          </p>
          {dashboardMeta.currency_note ? (
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              {dashboardMeta.currency_note}
            </p>
          ) : null}
          {dashboardMeta.last_updated ? (
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Pembaruan data:{" "}
              {new Date(dashboardMeta.last_updated).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          ) : null}
          {dashboardMeta.sources && dashboardMeta.sources.length > 0 ? (
            <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-2.5">
              <span className="w-full text-sm font-semibold text-slate-600 sm:w-auto sm:text-base">
                Sumber:
              </span>
              {dashboardMeta.sources.map((src) => (
                <span
                  key={src}
                  className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-800 ring-1 ring-slate-200/80 sm:text-sm"
                >
                  {src}
                </span>
              ))}
            </div>
          ) : null}
        </footer>
      </div>

      <div className="min-h-dvh w-full bg-slate-50 lg:hidden">
        <div className="mx-auto flex w-full max-w-[720px] flex-col px-4 py-6 sm:px-6 sm:py-8">
          <div className="flex items-center justify-center gap-2 text-center">
            <img
              src="/icon/garuda.svg"
              alt="Garuda"
              className="h-8 w-8 shrink-0 sm:h-9 sm:w-9"
            />
            <p className="text-lg font-bold leading-tight sm:text-xl">
              Dashboard AI Presiden Prabowo Subianto
            </p>
          </div>

          <header className="mt-4 flex flex-col gap-2 border-b border-slate-200/80 pb-4">
            <p className="text-base font-semibold sm:text-lg">
              Highlight Capaian Pemerintah Tahun 2026
            </p>
            <div className="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
              <label
                htmlFor="dashboard-quarter-mobile"
                className="text-xs text-slate-600 sm:text-sm"
              >
                Periode data
              </label>
              <select
                id="dashboard-quarter-mobile"
                value={quarterId}
                onChange={(e) =>
                  setQuarterId(e.target.value as DashboardQuarterId)
                }
                className="
                  w-full max-w-md rounded-lg border border-slate-200 bg-white
                  px-3 py-2 text-sm font-medium text-slate-800 shadow-sm
                  outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100
                  sm:w-auto
                "
              >
                {quarterOptions.map((q) => (
                  <option key={q.id} value={q.id}>
                    {q.label}
                  </option>
                ))}
              </select>
            </div>
            {activeQuarterLabel ? (
              <p className="text-xs text-slate-500">{activeQuarterLabel}</p>
            ) : null}
            <p className="text-xs font-medium text-blue-600 sm:text-sm">
              {tanggalHariIni}
            </p>
          </header>

          <DndContext>
            <main className="mt-4 pb-8">
              <SortableContext items={items} strategy={rectSortingStrategy}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
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

          <footer className="mt-10 border-t border-slate-200 pt-6">
            <p className="text-sm font-medium text-slate-700">{dashboardMeta.description}</p>
            {dashboardMeta.currency_note ? (
              <p className="mt-1 text-xs text-slate-600">{dashboardMeta.currency_note}</p>
            ) : null}
            {dashboardMeta.last_updated ? (
              <p className="mt-1 text-xs text-slate-500">
                Pembaruan data:{" "}
                {new Date(dashboardMeta.last_updated).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            ) : null}
            {dashboardMeta.sources && dashboardMeta.sources.length > 0 ? (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-slate-500">Referensi sumber:</span>
                {dashboardMeta.sources.map((src) => (
                  <span
                    key={src}
                    className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700 ring-1 ring-slate-200/80"
                  >
                    {src}
                  </span>
                ))}
              </div>
            ) : null}
          </footer>
        </div>
      </div>

      {selected ? (
        <HighlightModal
          item={itemMap.get(selected.id) ?? selected}
          open={!!selected}
          onOpenChange={(v) => {
            if (!v) setSelected(null);
          }}
        />
      ) : null}
    </>
  );
}
