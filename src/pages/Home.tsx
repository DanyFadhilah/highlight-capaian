import { useMemo, useState } from "react";
import { highlights, type Highlight } from "../data/highlights";
import HighlightCard from "../components/HighlightCard";
import HighlightModal from "../components/HighlightModal";

const TOP_LEFT = "pertumbuhan-ekonomi";
const TOP_CENTER = "lapangan-pekerjaan-baru";
const TOP_RIGHT = "peningkatan-ekspor";

export default function Home() {
  const [selected, setSelected] = useState<Highlight | null>(null);
  const open = !!selected;

  const { topLeft, topCenter, topRight, rest } = useMemo(() => {
    const topLeft = highlights.find((h) => h.id === TOP_LEFT) ?? null;
    const topCenter = highlights.find((h) => h.id === TOP_CENTER) ?? null;
    const topRight = highlights.find((h) => h.id === TOP_RIGHT) ?? null;

    const rest = highlights.filter(
      (h) => ![TOP_LEFT, TOP_CENTER, TOP_RIGHT].includes(h.id)
    );

    return { topLeft, topCenter, topRight, rest };
  }, []);

  return (
    <div className="max-h-screen min-h-screen w-screen overflow-hidden bg-slate-50 text-slate-900">
      <div className="mx-auto h-full px-10 py-8">
        <header className="flex items-start justify-between">
          <div className="flex gap-3 items-center">
            <img src="/icon/garuda.svg" alt="Garuda" className="h-10 w-10" />
            <p className="text-2xl font-bold">
              Highlight Capaian Pemerintah Tahun 2026
            </p>
          </div>

          <p className="text-sm text-blue-600 font-medium">Februari 2026</p>
        </header>

        <main className="mt-6 px-10">
            <div className="grid grid-cols-3 gap-4">
                {topLeft ? (
                <HighlightCard item={topLeft} onOpen={() => setSelected(topLeft)} />
                ) : null}

                {topCenter ? (
                <HighlightCard item={topCenter} onOpen={() => setSelected(topCenter)} />
                ) : null}

                {topRight ? (
                <HighlightCard item={topRight} onOpen={() => setSelected(topRight)} />
                ) : null}
            </div>

            <div className="mt-4 grid grid-cols-4 gap-4">
                {rest.map((item) => (
                <HighlightCard
                    key={item.id}
                    item={item}
                    onOpen={() => setSelected(item)}
                />
                ))}
            </div>
        </main>

        {selected ? (
          <HighlightModal
            item={selected}
            open={open}
            onOpenChange={(v) => {
              if (!v) setSelected(null);
            }}
          />
        ) : null}
      </div>
    </div>
  );
}