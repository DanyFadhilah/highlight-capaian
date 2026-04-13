type Props = {
  src?: string;
};

export default function VideoPlayer({ src }: Props) {
  if (!src) {
    return (
      <div className="flex w-full min-h-0 flex-[1.15] basis-0 items-center justify-center overflow-hidden rounded-2xl bg-slate-100 text-slate-500">
        Video belum tersedia
      </div>
    );
  }

  return (
    <div className="min-h-0 w-full flex-[1.15] basis-0 overflow-hidden rounded-2xl bg-black">
      <video
        className="h-full min-h-0 w-full object-cover"
        src={src}
        autoPlay
        loop
        playsInline
        controls
        preload="auto"
      />
    </div>
  );
}
