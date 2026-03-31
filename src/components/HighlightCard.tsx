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

export default function HighlightCard({ item, onOpen }: Props) {
  const badgeText = item.badge?.text;
  const badgeVariant = item.badge?.variant;
  const isPercent =
    typeof item.value === "string" && item.value.includes("%");
  const numericValue = parseNumber(item.value);
  const animatedValue = useAnimatedNumber(numericValue, 800);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);

      setTimeout(() => {
        setGlitch(false);
      }, 180);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <button
      onClick={onOpen}
      className="
        relative w-full max-h-[190px] text-left rounded-2xl bg-white
        ring-1 ring-slate-200 shadow-sm
        px-4 py-5
        hover:shadow-md hover:ring-slate-300
        active:scale-[0.995] transition cursor-pointer
      "
    >
      <div className="flex items-center gap-3">
        <div className="h-5 w-5">
          {item.icon && (
            <img
              src={item.icon}
              alt=""
              className="h-5 w-5 object-contain"
            />
          )}
        </div>

        <div className="h-5 w-px bg-slate-200" />

        {badgeText && (
          <div
            className={[
              "ml-auto rounded-lg px-3 py-1 text-xs font-medium ring-1",
              badgeClass(badgeVariant),
            ].join(" ")}
          >
            {badgeText}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <div className="text-xl font-bold tracking-wide">
          {item.title.toUpperCase()}
        </div>

        <div className="flex items-baseline gap-2">
          <div
            className={`
              text-4xl font-bold tracking-tight tabular-nums
              transition-all duration-200 relative
              ${glitch ? "scale-105 blur-[0.5px] opacity-80 text-blue-600" : ""}
            `}
          >
            {animatedValue.toLocaleString("id-ID", {
              minimumFractionDigits: isPercent ? 2 : 0,
              maximumFractionDigits: isPercent ? 2 : 2,
            })}
            {isPercent ? "%" : ""}
          </div>

          {item.unit && (
            <div className="text-xl font-semibold text-slate-700">
              {item.unit}
            </div>
          )}
        </div>

        <div className="text-sm leading-relaxed text-slate-600 line-clamp-2">
          {item.description}
        </div>
      </div>
    </button>
  );
}