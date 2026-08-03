type SectionBackdropProps = {
  src: string;
  flipX?: boolean;
  flipY?: boolean;
};

export function SectionBackdrop({ src, flipX = false, flipY = false }: SectionBackdropProps) {
  return (
    <div className="absolute inset-0 -z-10">
      <img
        src={src}
        alt=""
        loading="lazy"
        className={`h-full w-full object-cover opacity-15 dark:opacity-10 ${flipX ? 'scale-x-[-1]' : ''} ${
          flipY ? 'scale-y-[-1]' : ''
        }`}
      />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent dark:from-neutral-950" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent dark:from-neutral-950" />
    </div>
  );
}
