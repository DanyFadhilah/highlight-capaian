import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import type { Highlight } from "../types/highlight";
import VideoPlayer from "./VideoPlayer";
import ArticleChatPanel from "./ArticleChatPanel";

type Props = {
  item: Highlight;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function HighlightModal({ item, open, onOpenChange }: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/55 backdrop-blur-[2px]" />

        <Dialog.Content
          className="
            fixed left-1/2 top-1/2 z-50
            -translate-x-1/2 -translate-y-1/2
            w-[min(1380px,94vw)]
            max-h-screen
            min-h-screen
            
            rounded-3xl
            focus:outline-none
          "
        >
          <Dialog.Title className="sr-only">Detail highlight {item.title}</Dialog.Title>

          <Dialog.Description className="sr-only">
            Modal detail highlight berisi video, ringkasan data, tautan artikel WordPress,
            dan kolom chat AI untuk pertanyaan terkait artikel.
          </Dialog.Description>

          <div className="relative">
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

            <div
              className="
                grid gap-6
                md:grid-cols-[1.1fr_0.9fr]
                items-start
                p-2
                min-h-screen
                max-h-screen
              "
            >
              <div className="min-h-[98vh] max-h-[98vh] rounded-2xl shadow-xl flex flex-col gap-5">
                {open ? (
                  <VideoPlayer src={item.videoUrl} />
                ) : (
                  <div className="aspect-video w-full bg-black" />
                )}

                <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200 object-fill min-h-[47.3vh] max-h-[47.3vh]">
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
                        <img src={item.source} alt="" className="w-30 max-h-15 object-contain" />
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-5">
                    <div className="text-2xl font-bold tracking-wide">{item.title.toUpperCase()}</div>

                    <div className="flex items-end gap-3">
                      <div className="text-7xl font-bold tracking-tight md:text-8xl">
                        {item.value}
                      </div>
                      {item.unit ? (
                        <div className="text-3xl font-semibold text-slate-700">{item.unit}</div>
                      ) : null}
                    </div>

                    <div className="text-sm leading-relaxed text-slate-600">{item.description}</div>

                    <div className="text-right underline italic">
                      <Link
                        to={`https://mbg.nikici.com/${item.id}`}
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

              <ArticleChatPanel item={item} open={open} />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}