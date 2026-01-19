import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
  className?: string;
  showLabel?: boolean;
  variant?: "default" | "success" | "accent";
}

const ProgressBar = ({
  progress,
  className,
  showLabel = false,
  variant = "default",
}: ProgressBarProps) => {
  const getProgressColor = (percent: number) => {
    if (percent < 30) return "bg-gradient-to-r from-red-500 to-orange-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]";
    if (percent < 70) return "bg-gradient-to-r from-orange-500 to-yellow-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]";
    if (percent < 100) return "bg-gradient-to-r from-yellow-500 to-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]";
    return "bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]";
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="neu-pressed rounded-full h-2.5 overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1)",
            getProgressColor(progress)
          )}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-end mt-1">
          <span className="text-xs text-muted-foreground">{progress}%</span>
        </div>
      )}
    </div>
  );
};

export { ProgressBar };
