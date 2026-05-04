import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import type { Highlight } from "../types/highlight";
import VideoPlayer from "./VideoPlayer";
import ArticleChatPanel from "./ArticleChatPanel";
import HighlightChart from "./HighlightChart";

type Props = {
  item: Highlight;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

// ============================================================
// GANTI LAYOUT DI SINI
// "A" = Layout asli (Video + Info | Chat)
// "B" = Layout 2x2 (Video + Info | Chart + Chat)  — Gambar 1
// "C" = Layout chart di kiri (Video + Chart + Info | Chat full) — Gambar 2
// ============================================================
const LAYOUT: "A" | "B" | "C" = "A";

function ArticleInfoCard({ item }: { item: Highlight }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200 sm:p-8">
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        <div className="flex shrink-0 items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-5 w-5">
              {item.icon ? (
                <img
                  src={item.icon}
                  alt=""
                  className="h-6 w-6 object-contain"
                />
              ) : null}
            </div>
            <div className="h-6 w-px bg-slate-200" />
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span className="italic">Source</span>
            {item.source ? (
              <img
                src={item.source}
                alt=""
                className="w-30 max-h-15 object-contain"
              />
            ) : null}
          </div>
        </div>

        <div className="mt-6 flex min-h-0 flex-1 flex-col gap-4 sm:mt-8 sm:gap-5">
          <div className="shrink-0 text-xl font-bold tracking-wide sm:text-2xl">
            {item.title.toUpperCase()}
          </div>

          <div className="flex shrink-0 items-end gap-3">
            <div className="text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl">
              {item.value}
            </div>
            {item.unit ? (
              <div className="text-2xl font-semibold text-slate-700 sm:text-3xl">
                {item.unit}
              </div>
            ) : null}
          </div>

          <div className="min-h-0 flex-1 text-sm leading-relaxed text-slate-600">
            {item.description}
          </div>

          <div className="text-right underline italic">
            <Link
              to={`https://technocracy.indonesiabrain.com/${item.id}`}
              className="underline italic"
              target="_blank"
              rel="noreferrer"
            >
              Lihat selengkapnya
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArticleInfoCompact({ item }: { item: Highlight }) {
  return (
    <div className="flex min-h-0 flex-col gap-3 overflow-y-auto rounded-2xl bg-white p-5 shadow-xl ring-1 ring-slate-200">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5">
            {item.icon ? (
              <img src={item.icon} alt="" className="h-6 w-6 object-contain" />
            ) : null}
          </div>
          <div className="h-6 w-px bg-slate-200" />
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span className="italic">Source</span>
          {item.source ? (
            <img
              src={item.source}
              alt=""
              className="w-30 max-h-15 object-contain"
            />
          ) : null}
        </div>
      </div>

      <div className="text-lg font-bold tracking-wide">
        {item.title.toUpperCase()}
      </div>

      <div className="flex items-end gap-3">
        <div className="text-5xl font-bold tracking-tight">{item.value}</div>
        {item.unit ? (
          <div className="text-xl font-semibold text-slate-700">
            {item.unit}
          </div>
        ) : null}
      </div>

      <div className="text-sm leading-relaxed text-slate-600">
        {item.description}
      </div>

      <div className="text-right underline italic text-sm">
        <Link
          to={`https://technocracy.indonesiabrain.com/${item.id}`}
          className="underline italic"
          target="_blank"
          rel="noreferrer"
        >
          Lihat selengkapnya
        </Link>
      </div>
    </div>
  );
}

// ============================================================
// LAYOUT A — Layout asli: Video + Info kiri, Chat kanan
// ============================================================
function LayoutA({ item, open }: { item: Highlight; open: boolean }) {
  const videoEl = open ? (
    <VideoPlayer src={item.videoUrl} />
  ) : (
    <div className="aspect-video w-full shrink-0 rounded-2xl bg-black" />
  );

  return (
    <>
      {/* Mobile: satu kolom tinggi natural, scroll di Dialog.Content; chat boleh panjang */}
      <div className="flex flex-col gap-3 p-1 pb-8 pt-10 sm:gap-3 sm:p-2 md:hidden">
        <div className="aspect-video w-full shrink-0 overflow-hidden rounded-2xl shadow-xl">
          {videoEl}
        </div>
        <div className="shrink-0 rounded-2xl shadow-xl">
          <ArticleInfoCompact item={item} />
        </div>
        <div className="w-full shrink-0">
          <ArticleChatPanel item={item} open={open} />
        </div>
      </div>

      {/* Desktop */}
      <div
        className="
          hidden h-full min-h-0 gap-4 overflow-hidden
          p-1 sm:p-2
          md:grid md:grid-cols-[1.1fr_0.9fr] md:items-stretch md:gap-6
        "
      >
        <div className="flex min-h-0 flex-col gap-4 overflow-hidden rounded-2xl shadow-xl md:max-h-full md:gap-5">
          {open ? (
            <VideoPlayer src={item.videoUrl} />
          ) : (
            <div className="aspect-video w-full shrink-0 rounded-2xl bg-black" />
          )}
          <ArticleInfoCard item={item} />
        </div>

        <div className="min-h-0">
          <ArticleChatPanel item={item} open={open} />
        </div>
      </div>
    </>
  );
}

// ============================================================
// LAYOUT B — 2x2 Grid: Video + Info kiri, Chart + Chat kanan (Gambar 1)
// ============================================================
function LayoutB({ item, open }: { item: Highlight; open: boolean }) {
  const videoEl = open ? (
    <VideoPlayer src={item.videoUrl} />
  ) : (
    <div className="aspect-video w-full shrink-0 rounded-2xl bg-black" />
  );

  return (
    <>
      <div className="flex flex-col gap-3 p-1 pb-8 pt-10 sm:p-2 md:hidden">
        <div className="aspect-video w-full shrink-0 overflow-hidden rounded-2xl shadow-xl">
          {videoEl}
        </div>
        <div className="shrink-0 overflow-hidden rounded-2xl bg-white p-4 shadow-xl ring-1 ring-slate-200">
          <HighlightChart item={item} className="h-[min(40vh,220px)] min-h-[160px] w-full" />
        </div>
        <div className="shrink-0 rounded-2xl shadow-xl">
          <ArticleInfoCompact item={item} />
        </div>
        <div className="w-full shrink-0">
          <ArticleChatPanel item={item} open={open} />
        </div>
      </div>

      <div
        className="
          hidden h-full min-h-0 gap-4 overflow-hidden
          p-1 sm:p-2
          md:grid md:grid-cols-[1.1fr_0.9fr] md:items-stretch md:gap-6
        "
      >
        <div className="flex min-h-0 flex-col gap-4 overflow-hidden rounded-2xl shadow-xl md:max-h-full md:gap-5">
          {open ? (
            <VideoPlayer src={item.videoUrl} />
          ) : (
            <div className="aspect-video w-full rounded-2xl bg-black" />
          )}
        </div>

        <div className="min-h-0 overflow-hidden rounded-2xl bg-white p-5 shadow-xl ring-1 ring-slate-200">
          <HighlightChart item={item} className="h-full" />
        </div>

        <ArticleInfoCompact item={item} />

        <div className="min-h-0 overflow-hidden">
          <ArticleChatPanel item={item} open={open} />
        </div>
      </div>
    </>
  );
}

// ============================================================
// LAYOUT C — Chart terintegrasi kiri: Video + Chart + Info kiri, Chat full kanan (Gambar 2)
// ============================================================
function LayoutC({ item, open }: { item: Highlight; open: boolean }) {
  const articleWithChart = (
    <div className="flex min-h-0 flex-col gap-3 overflow-y-auto rounded-2xl bg-white p-4 shadow-xl ring-1 ring-slate-200 sm:gap-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5">
            {item.icon ? (
              <img src={item.icon} alt="" className="h-6 w-6 object-contain" />
            ) : null}
          </div>
          <div className="h-6 w-px bg-slate-200" />
        </div>
        <div className="flex min-w-0 items-center gap-2 text-sm text-slate-500 sm:gap-3">
          <span className="shrink-0 italic">Source</span>
          {item.source ? (
            <img
              src={item.source}
              alt=""
              className="w-30 max-h-15 object-contain"
            />
          ) : null}
        </div>
      </div>

      <div className="text-lg font-bold tracking-wide">{item.title.toUpperCase()}</div>

      <HighlightChart item={item} className="h-40 shrink-0 sm:h-48" />

      <div className="flex items-end gap-3">
        <div className="text-3xl font-bold tracking-tight sm:text-4xl">{item.value}</div>
        {item.unit ? (
          <div className="text-lg font-semibold text-slate-700 sm:text-xl">{item.unit}</div>
        ) : null}
      </div>

      <div className="text-sm leading-relaxed text-slate-600">{item.description}</div>

      <div className="text-right text-sm underline italic">
        <Link
          to={`https://technocracy.indonesiabrain.com/${item.id}`}
          className="underline italic"
          target="_blank"
          rel="noreferrer"
        >
          Lihat selengkapnya
        </Link>
      </div>
    </div>
  );

  const videoEl = open ? (
    <VideoPlayer src={item.videoUrl} />
  ) : (
    <div className="aspect-video w-full shrink-0 rounded-2xl bg-black" />
  );

  return (
    <>
      <div className="flex flex-col gap-3 p-1 pb-8 pt-10 sm:p-2 md:hidden">
        <div className="aspect-video w-full shrink-0 overflow-hidden rounded-2xl shadow-xl">
          {videoEl}
        </div>
        <div className="shrink-0">{articleWithChart}</div>
        <div className="w-full shrink-0">
          <ArticleChatPanel item={item} open={open} />
        </div>
      </div>

      <div
        className="
          hidden h-full min-h-0 gap-4 overflow-hidden
          p-2 md:grid md:grid-cols-[1.1fr_0.9fr] md:items-stretch
        "
      >
        <div className="flex min-h-0 max-h-full flex-col gap-4 overflow-hidden">
          <div className="shrink-0 overflow-hidden rounded-2xl shadow-xl">
            {open ? (
              <VideoPlayer src={item.videoUrl} />
            ) : (
              <div className="aspect-video w-full rounded-2xl bg-black" />
            )}
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl bg-white p-5 shadow-xl ring-1 ring-slate-200">
            <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5">
                    {item.icon ? (
                      <img
                        src={item.icon}
                        alt=""
                        className="h-6 w-6 object-contain"
                      />
                    ) : null}
                  </div>
                  <div className="h-6 w-px bg-slate-200" />
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <span className="italic">Source</span>
                  {item.source ? (
                    <img
                      src={item.source}
                      alt=""
                      className="w-30 max-h-15 object-contain"
                    />
                  ) : null}
                </div>
              </div>

              <div className="text-lg font-bold tracking-wide">
                {item.title.toUpperCase()}
              </div>

              <HighlightChart item={item} className="h-48 shrink-0" />

              <div className="flex items-end gap-3">
                <div className="text-4xl font-bold tracking-tight">{item.value}</div>
                {item.unit ? (
                  <div className="text-xl font-semibold text-slate-700">{item.unit}</div>
                ) : null}
              </div>

              <div className="text-sm leading-relaxed text-slate-600">{item.description}</div>

              <div className="text-right text-sm underline italic">
                <Link
                  to={`https://technocracy.indonesiabrain.com/${item.id}`}
                  className="underline italic"
                  target="_blank"
                  rel="noreferrer"
                >
                  Lihat selengkapnya
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="min-h-0">
          <ArticleChatPanel item={item} open={open} />
        </div>
      </div>
    </>
  );
}

const LAYOUTS = { A: LayoutA, B: LayoutB, C: LayoutC };

export default function HighlightModal({ item, open, onOpenChange }: Props) {
  const ActiveLayout = LAYOUTS[LAYOUT];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/55 backdrop-blur-[2px]" />

        <Dialog.Content
          className="
            fixed inset-0 z-50
            max-h-dvh min-h-0 w-full overflow-y-auto overscroll-y-contain
            p-2 sm:p-3
            md:left-1/2 md:top-1/2 md:inset-auto
            md:-translate-x-1/2 md:-translate-y-1/2
            md:h-dvh md:max-h-dvh md:w-[min(1380px,calc(100vw-1.5rem))]
            md:overflow-hidden md:rounded-3xl
            focus:outline-none
          "
        >
          <Dialog.Title className="sr-only">
            Detail highlight {item.title}
          </Dialog.Title>

          <Dialog.Description className="sr-only">
            Modal detail highlight berisi video, ringkasan data, tautan artikel
            WordPress, dan kolom chat AI untuk pertanyaan terkait artikel.
          </Dialog.Description>

          <div className="relative w-full md:h-full md:min-h-0">
            <Dialog.Close asChild>
              <button
                aria-label="Close"
                className="
                  fixed right-4 top-4 z-[70] grid h-9 w-9 place-items-center
                  rounded-full bg-white text-slate-900 shadow-lg ring-1 ring-slate-200
                  hover:cursor-pointer hover:bg-slate-50 active:scale-[0.98]
                  md:absolute md:right-3 md:top-3 md:z-20 md:h-10 md:w-10
                "
              >
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>

            <ActiveLayout item={item} open={open} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
