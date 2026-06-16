import {
  RecurringFrequency,
  RecurringFrequencyType,
  FREQUENCY_LABELS,
} from "@/lib/types";

interface Props {
  value: RecurringFrequencyType;
  onChange: (value: RecurringFrequencyType) => void;
  className?: string;
}

export const RecurringFrequencySelect = ({
  value,
  onChange,
  className,
}: Props) => {
  return (
    <div className={`${className}`}>
      <select
        value={value}
        onChange={(e) =>
          onChange(Number(e.target.value) as RecurringFrequencyType)
        }
        className="w-full px-4 py-2.5 rounded-xl border border-white/8 bg-white/[0.04] text-sm text-white outline-none transition-colors focus:border-(--primary)/40 focus:ring-1 focus:ring-(--primary)/30"
      >
        {Object.values(RecurringFrequency).map((f) => (
          <option key={f} value={f} className="bg-(--bg-main)">
            {FREQUENCY_LABELS[f]}
          </option>
        ))}
      </select>
    </div>
  );
};
