export type Highlight = {
  id: string;
  title: string;
  value: number | string;
  unit?: string;
  description: string;
  videoUrl?: string;
  icon?: string;
  source?: string;
  badge?: {
    text: string;
    variant?: "up" | "down" | "info" | "warn";
  };
};