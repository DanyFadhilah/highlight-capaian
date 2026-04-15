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
const LAYOUT: "A" | "B" | "C" = "B";

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
  return (
    <div
      className="
        grid h-full min-h-0 gap-6 overflow-hidden
        p-2 md:grid-cols-[1.1fr_0.9fr]
        items-stretch
      "
    >
      <div className="flex min-h-0 max-h-full flex-col gap-5 overflow-hidden rounded-2xl shadow-xl">
        {open ? (
          <VideoPlayer src={item.videoUrl} />
        ) : (
          <div className="aspect-video w-full shrink-0 rounded-2xl bg-black" />
        )}
        <ArticleInfoCard item={item} />
      </div>

      <ArticleChatPanel item={item} open={open} />
    </div>
  );
}

// ============================================================
// LAYOUT B — 2x2 Grid: Video + Info kiri, Chart + Chat kanan (Gambar 1)
// ============================================================
function LayoutB({ item, open }: { item: Highlight; open: boolean }) {
  return (
    <div
      className="
        grid h-full min-h-0 gap-4 overflow-hidden
        p-2 md:grid-cols-2 md:grid-rows-[auto_1fr]
        items-stretch
      "
    >
      {/* Kiri atas: Video */}
      <div className="min-h-0 overflow-hidden rounded-2xl shadow-xl">
        {open ? (
          <VideoPlayer src={item.videoUrl} />
        ) : (
          <div className="aspect-video w-full rounded-2xl bg-black" />
        )}
      </div>

      {/* Kanan atas: Chart */}
      <div className="min-h-0 overflow-hidden rounded-2xl bg-white p-5 shadow-xl ring-1 ring-slate-200">
        <HighlightChart item={item} className="h-full" />
      </div>

      {/* Kiri bawah: Article info */}
      <ArticleInfoCompact item={item} />

      {/* Kanan bawah: Chat */}
      <div className="min-h-0 overflow-hidden">
        <ArticleChatPanel item={item} open={open} />
      </div>
    </div>
  );
}

// ============================================================
// LAYOUT C — Chart terintegrasi kiri: Video + Chart + Info kiri, Chat full kanan (Gambar 2)
// ============================================================
function LayoutC({ item, open }: { item: Highlight; open: boolean }) {
  return (
    <div
      className="
        grid h-full min-h-0 gap-4 overflow-hidden
        p-2 md:grid-cols-[1.1fr_0.9fr]
        items-stretch
      "
    >
      {/* Kiri: Video + Chart + Info */}
      <div className="flex min-h-0 max-h-full flex-col gap-4 overflow-hidden">
        <div className="shrink-0 overflow-hidden rounded-2xl shadow-xl">
          {open ? (
            <VideoPlayer src={item.videoUrl} />
          ) : (
            <div className="aspect-video w-full rounded-2xl bg-black" />
          )}
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto rounded-2xl bg-white p-5 shadow-xl ring-1 ring-slate-200">
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

          {/* Chart terintegrasi */}
          <HighlightChart item={item} className="h-48 shrink-0" />

          <div className="flex items-end gap-3">
            <div className="text-4xl font-bold tracking-tight">
              {item.value}
            </div>
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
      </div>

      {/* Kanan: Chat full height */}
      <ArticleChatPanel item={item} open={open} />
    </div>
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
            fixed left-1/2 top-1/2 z-50
            -translate-x-1/2 -translate-y-1/2
            w-[min(1380px,calc(100vw-1.5rem))]
            h-dvh max-h-dvh min-h-0
            rounded-3xl
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

          <div className="relative h-full min-h-0">
            <Dialog.Close asChild>
              <button
                aria-label="Close"
                className="
                  absolute right-3 top-3 z-20
                  grid h-10 w-10 place-items-center
                  rounded-full bg-white text-slate-900 shadow-lg
                  ring-1 ring-slate-200
                  hover:bg-slate-50 active:scale-[0.98] cursor-pointer
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
