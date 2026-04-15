import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import type { Highlight } from "../types/highlight";

const SAMPLE_DATA: Record<string, { day: string; value: number }[]> = {
  "makan-bergizi-gratis": [
    { day: "Sun", value: 400 },
    { day: "Mon", value: 370 },
    { day: "Tue", value: 280 },
    { day: "Wed", value: 320 },
    { day: "Thu", value: 340 },
    { day: "Fri", value: 310 },
    { day: "Sat", value: 480 },
  ],
  "lapangan-pekerjaan-baru": [
    { day: "Sun", value: 180 },
    { day: "Mon", value: 210 },
    { day: "Tue", value: 250 },
    { day: "Wed", value: 230 },
    { day: "Thu", value: 270 },
    { day: "Fri", value: 290 },
    { day: "Sat", value: 310 },
  ],
  "pertumbuhan-ekonomi": [
    { day: "Q1", value: 497 },
    { day: "Q2", value: 503 },
    { day: "Q3", value: 507 },
    { day: "Q4", value: 539 },
  ],
  "peningkatan-ekspor": [
    { day: "Jan", value: 220 },
    { day: "Mar", value: 235 },
    { day: "May", value: 240 },
    { day: "Jul", value: 250 },
    { day: "Sep", value: 260 },
    { day: "Nov", value: 270 },
    { day: "Dec", value: 283 },
  ],
  "produksi-beras": [
    { day: "Jan", value: 280 },
    { day: "Mar", value: 290 },
    { day: "May", value: 310 },
    { day: "Jul", value: 325 },
    { day: "Sep", value: 335 },
    { day: "Nov", value: 340 },
    { day: "Dec", value: 347 },
  ],
  "cadangan-beras": [
    { day: "Jan", value: 200 },
    { day: "Mar", value: 250 },
    { day: "May", value: 310 },
    { day: "Jul", value: 420 },
    { day: "Sep", value: 410 },
    { day: "Nov", value: 415 },
    { day: "Dec", value: 425 },
  ],
  "koperasi-merah-putih": [
    { day: "Jul", value: 5000 },
    { day: "Aug", value: 18000 },
    { day: "Sep", value: 35000 },
    { day: "Oct", value: 52000 },
    { day: "Nov", value: 68000 },
    { day: "Dec", value: 81613 },
  ],
};

function getDefaultData() {
  return [
    { day: "Sun", value: 350 },
    { day: "Mon", value: 380 },
    { day: "Tue", value: 310 },
    { day: "Wed", value: 340 },
    { day: "Thu", value: 360 },
    { day: "Fri", value: 330 },
    { day: "Sat", value: 400 },
  ];
}

type Props = {
  item: Highlight;
  className?: string;
};

export default function HighlightChart({ item, className = "" }: Props) {
  const data = SAMPLE_DATA[item.id] ?? getDefaultData();

  return (
    <div className={`flex flex-col ${className}`}>
      <h3 className="mb-3 text-lg font-bold tracking-wide">
        {item.title.toUpperCase()}
      </h3>

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={{ stroke: "#cbd5e1" }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={{ stroke: "#cbd5e1" }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                fontSize: 13,
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#14b8a6"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#14b8a6", strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
