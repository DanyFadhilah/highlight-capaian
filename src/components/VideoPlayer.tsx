type Props = {
  src?: string;
};

export default function VideoPlayer({ src }: Props) {
  if (!src) {
    return (
      <div className="aspect-video w-full rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500">
        Video belum tersedia
      </div>
    );
  }

  return (
    <video
      className="aspect-video w-full rounded-2xl bg-black object-cover"
      src={src}
      autoPlay
      loop
      playsInline
      controls
      preload="auto"
    />
  );
}