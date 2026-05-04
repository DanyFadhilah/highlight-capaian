import { highlights, type Highlight } from "../data/highlights";
import dashboardFile from "../data/dashboard_prabowo.json";

export type DashboardQuarterId = (typeof dashboardFile.meta.quarters)[number];

type IndicatorRow = {
  label: string;
  value: number | null;
  unit?: string;
  unit_label?: string;
  badge: string;
  badge_type: string;
  description: string;
  source?: string;
  source_url?: string;
};

type QuarterBlock = {
  id: string;
  label: string;
  period: string;
  note?: string;
  indicators: Record<string, IndicatorRow>;
};

type DashboardJson = {
  meta: {
    title: string;
    description: string;
    quarters: DashboardQuarterId[];
    last_updated?: string;
  };
  quarters: Record<string, QuarterBlock>;
};

const file = dashboardFile as unknown as DashboardJson;

/** Kunci indikator JSON → id highlight di aplikasi */
export const INDICATOR_KEY_BY_HIGHLIGHT_ID: Record<string, string> = {
  "pertumbuhan-ekonomi": "pertumbuhan_ekonomi",
  "lapangan-pekerjaan-baru": "lapangan_kerja",
  "makan-bergizi-gratis": "makan_bergizi_gratis",
  "peningkatan-ekspor": "peningkatan_ekspor",
  "produksi-beras": "produksi_beras",
  "cadangan-beras": "cadangan_beras",
  "koperasi-merah-putih": "koperasi_merah_putih",
  "sekolah-rakyat": "sekolah_rakyat_garuda",
  "renovasi-sekolah": "renovasi_sekolah",
  "interactive-flat-panel": "interactive_flat_panel",
  "cek-kesehatan-gratis": "cek_kesehatan_gratis",
};

function mapBadgeVariant(
  t: string,
): "up" | "down" | "info" | "warn" {
  if (t === "success") return "up";
  if (t === "warning") return "warn";
  if (t === "down") return "down";
  return "info";
}

export function getDefaultQuarterId(): DashboardQuarterId {
  const qs = file.meta.quarters;
  return qs.at(-1) ?? "q1_2026";
}

export function listQuarterOptions(): { id: DashboardQuarterId; label: string; period: string }[] {
  return file.meta.quarters.map((id) => {
    const q = file.quarters[id];
    return {
      id,
      label: q?.label ?? id,
      period: q?.period ?? "",
    };
  });
}

export function buildHighlightMapForQuarter(quarterId: string): Map<string, Highlight> {
  const q = file.quarters[quarterId];
  if (!q) {
    return new Map(highlights.map((h) => [h.id, h] as const));
  }

  const dateLabel = `${q.label} · ${q.period}`;

  return new Map(
    highlights.map((h) => {
      const indKey = INDICATOR_KEY_BY_HIGHLIGHT_ID[h.id];
      const ind = indKey ? q.indicators[indKey] : undefined;

      if (!ind) {
        return [h.id, { ...h, date: dateLabel }] as const;
      }

      let value: number | string;
      let unit: string | undefined;

      if (ind.value != null && typeof ind.value === "number") {
        value = ind.value;
        unit = ind.unit ?? ind.unit_label ?? h.unit;
      } else {
        value = ind.badge;
        unit = undefined;
      }

      return [
        h.id,
        {
          ...h,
          value,
          unit,
          description: ind.description,
          date: dateLabel,
          badge: { text: ind.badge, variant: mapBadgeVariant(ind.badge_type) },
        },
      ] as const;
    }),
  );
}
