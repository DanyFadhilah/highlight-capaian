import { useEffect, useState } from "react";
import type { Highlight } from "../data/highlights";
import { useAnimatedNumber } from "../hooks/useAnimatedNumber";

type Props = {
  item: Highlight;
  onOpen: () => void;
};

function badgeClass(variant?: "up" | "down" | "info" | "warn") {
  if (variant === "up") return "bg-blue-50 text-blue-700 ring-blue-200";
  if (variant === "down") return "bg-rose-50 text-rose-700 ring-rose-200";
  if (variant === "warn") return "bg-amber-50 text-amber-700 ring-amber-200";
  return "bg-blue-50 text-blue-700 ring-blue-200";
}

function parseNumber(val: string | number): number {
  if (typeof val === "number") return val;

  const clean = val.replace("%", "").trim();
  const normalized = clean.replace(/\./g, "").replace(",", ".");
  return parseFloat(normalized) || 0;
}

/** Nilai yang boleh dianimasikan sebagai angka (bukan teks status seperti "Belum Berjalan"). */
function isPlainNumericValue(value: number | string): boolean {
  if (typeof value === "number" && Number.isFinite(value)) return true;
  if (typeof value !== "string") return false;
  const s = value.replace(/\s/g, "").replace("−", "-");
  return /^[-+]?[\d.,]+%?$/.test(s);
}

export default function HighlightCard({ item, onOpen }: Props) {
  const badgeText = item.badge?.text;
  const badgeVariant = item.badge?.variant;
  const numericDisplay = isPlainNumericValue(item.value);
  const isPercent = typeof item.value === "string" && item.value.includes("%");
  const numericValue = numericDisplay ? parseNumber(item.value) : 0;
  const animatedValue = useAnimatedNumber(numericValue, 800);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);

      setTimeout(() => {
        setGlitch(false);
      }, 200);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <button
      onClick={onOpen}
      className="
        relative flex h-full min-h-0 w-full flex-col overflow-hidden text-left
        rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm
        px-6 py-6 sm:px-8 sm:py-7
        hover:shadow-md hover:ring-slate-300
        active:scale-[0.995] transition cursor-pointer
      "
    >
      <div className="flex shrink-0 items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center">
            {item.icon && (
              <img src={item.icon} alt="" className="h-7 w-7 object-contain" />
            )}
          </div>
          <div className="h-7 w-px shrink-0 bg-slate-200" />
        </div>

        {badgeText ? (
          <div
            className={[
              "max-w-[58%] shrink-0 rounded-lg px-3 py-2 text-left text-sm font-medium leading-snug ring-1 sm:px-3.5 sm:text-[15px]",
              badgeClass(badgeVariant),
            ].join(" ")}
          >
            {badgeText}
          </div>
        ) : null}
      </div>

      <div className="mt-3 flex shrink-0 flex-col gap-2.5 sm:mt-4 sm:gap-3">
        <div className="shrink-0 text-2xl font-bold leading-snug tracking-wide sm:text-3xl">
          {item.title.toUpperCase()}
        </div>

        <div className="flex shrink-0 flex-wrap items-baseline gap-x-2 gap-y-1">
          {numericDisplay ? (
            <div
              className={`
              text-4xl font-bold tracking-tight tabular-nums transition-all duration-200
              sm:text-5xl relative
              ${glitch ? "scale-105 blur-[0.5px] opacity-80 text-blue-600" : ""}
            `}
            >
              {animatedValue.toLocaleString("id-ID", {
                minimumFractionDigits: isPercent ? 2 : 0,
                maximumFractionDigits: 2,
              })}
              {isPercent ? "%" : ""}
            </div>
          ) : (
            <div
              className={`
              wrap-break-word text-3xl font-bold leading-snug tracking-tight text-slate-900
              sm:text-4xl relative
              ${glitch ? "scale-105 blur-[0.5px] opacity-80 text-blue-600" : ""}
            `}
            >
              {String(item.value)}
            </div>
          )}

          {item.unit ? (
            <div className="text-xl font-semibold text-slate-700 sm:text-2xl">
              {item.unit}
            </div>
          ) : null}
        </div>
      </div>

      {item.description ? (
        <div className="mt-4 shrink-0 sm:mt-5">
          <p className="mb-2 shrink-0 pl-0.5 text-sm font-semibold uppercase tracking-wide text-slate-600 sm:text-base">
            Ringkasan indikator
          </p>
          <div
            className="
              max-h-52 overflow-y-auto overscroll-y-contain rounded-xl
              bg-slate-50 px-5 py-4 text-left text-lg leading-relaxed text-slate-800
              ring-1 ring-inset ring-slate-200/90
              sm:max-h-56 sm:px-6 sm:py-5 sm:text-xl sm:leading-relaxed
            "
          >
            {item.description}
          </div>
        </div>
      ) : null}
    </button>
  );
}
