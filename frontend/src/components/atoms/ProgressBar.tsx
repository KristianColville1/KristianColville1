type ProgressBarProps = {
  label: string;
  percentage: number;
  valueLabel?: string;
};

export function ProgressBar({ label, percentage, valueLabel }: ProgressBarProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium text-neutral-700 dark:text-neutral-300">{label}</span>
        <span className="text-neutral-500 dark:text-neutral-400">{valueLabel ?? `${percentage}%`}</span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent-purple to-accent-orange"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
