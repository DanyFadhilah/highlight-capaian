import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { Highlight } from "../data/highlights";
import VideoPlayer from "./VideoPlayer";

type Props = {
  item: Highlight;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function HighlightModal({ item, open, onOpenChange }: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/55 backdrop-blur-[2px]" />
        <Dialog.Content
          className="
            fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            w-[min(1200px,92vw)]
            focus:outline-none
          "
        >
          <Dialog.Close asChild>
            <button
              aria-label="Close"
              className="
                absolute -right-3 -top-3 z-10
                grid h-9 w-9 place-items-center
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
              grid gap-6 md:grid-cols-[1.15fr_0.85fr]
              items-stretch
            "
          >
            <div className="overflow-hidden rounded-2xl bg-black shadow-xl ring-1 ring-black/10">
              {open ? (
                <VideoPlayer src={item.videoUrl}/>
              ) : (
                <div className="aspect-video w-full bg-black" />
              )}
            </div>
 
            <div className="rounded-2xl bg-white shadow-xl ring-1 ring-slate-200 p-6">
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

                <div className="text-sm text-slate-500 flex gap-3 items-center">
                  <span className="italic">Source</span>{" "}
                    {item.source ? (
                        <img
                        src={item.source}
                        alt=""
                        className="w-30 max-h-15 object-contain"
                        />
                    ) : null}
                </div>
              </div>

              <div className="flex flex-col gap-5 mt-5">
                <div className="text-2xl font-extrabold tracking-wide">
                    {item.title.toUpperCase()}
                </div>

                <div className="flex justify-center items-end gap-3">
                    <div className="text-8xl text-center font-extrabold tracking-tight">
                    {item.value}
                    </div>
                    {item.unit ? (
                    <div className="text-3xl font-semibold text-slate-700">
                        {item.unit}
                    </div>
                    ) : null}
                </div>

                <div className="text-sm leading-relaxed text-slate-600">
                    {item.description}
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}