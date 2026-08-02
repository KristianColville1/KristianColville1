type TechChipProps = {
  label: string;
};

export function TechChip({ label }: TechChipProps) {
  return (
    <span className="rounded-md border border-neutral-300 px-2 py-1 text-xs text-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
      {label}
    </span>
  );
}
