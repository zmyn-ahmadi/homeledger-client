import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { Button } from "@/components/ui/Button";
import { cap } from "@/lib/utils";

// props type
type AddBudgetModelProps = {
  open: boolean;
  onClose: () => void;
};

const Period = {
  WEEKLY: 1,
  MONTHLY: 2,
  YEARLY: 3,
  CUSTOM: 4,
} as const;

type PeriodType = (typeof Period)[keyof typeof Period];

const PERIOD_LABELS: Record<PeriodType, string> = {
  [Period.WEEKLY]: "Weekly",
  [Period.MONTHLY]: "Monthly",
  [Period.YEARLY]: "Yearly",
  [Period.CUSTOM]: "Custom",
};

export const AddBudgetModal = ({ open, onClose }: AddBudgetModelProps) => {
  const [name, setName] = useState("");
  const [limitAmount, setLimitAmount] = useState("");
  const [period, setPeriod] = useState<PeriodType>(Period.MONTHLY);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));

  const [categories, setCategories] = useState<
    { categoryId: number; name: string }[]
  >([]);

  const [categoryId, setCategoryId] = useState<number | "">("");

  const [submitting, setSubmitting] = useState(false);

  // GET: /api/category
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/category");
        if (!response.ok) {
          throw new Error(`Failed to load categories: ${response.status}`);
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const reset = () => {
    setName("");
    setLimitAmount("");
    setPeriod(Period.MONTHLY);
    setStartDate(new Date().toISOString().slice(0, 10));
    setEndDate(new Date().toISOString().slice(0, 10));
    setCategories([]);
    setCategoryId("");
    setSubmitting(false);
  };

  // submit form callback
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitting(true);

    const localStartDate = new Date(startDate);
    const localEndDate = new Date(endDate);

    const body = {
      Name: name,
      LimitAmount: limitAmount,
      Period: period,
      StartDate: localStartDate,
      EndDate: localEndDate,
      CategoryId: categoryId,
    };

    try {
      const response = await fetch("/api/budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        console.error("Failed to add budget: ", error);
        return;
      }

      reset();
      onClose();
    } catch (err) {
      console.error("Network error.", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md mx-4 rounded-3xl bg-(--bg-surface-bright)/80 backdrop-blur-xl border border-white/10 p-6 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-white">Add Budget</h2>
            <p className="text-xs text-white/50">
              Plan your spending before it happens
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white p-1"
            aria-label="Close"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <div>
            <label className="text-xs font-medium text-white/60 uppercase tracking-wider">
              Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Food"
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 text-sm text-white placeholder:white/30 outline-none focus:bg-white/10 transition-colors"
            />
          </div>

          {/* LimitAmount */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-white/60 uppercase tracking-wider">
              Limit Amount (AUD)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm">
                $
              </span>
              <input
                type="number"
                step="0.01"
                required
                value={limitAmount}
                onChange={(e) => setLimitAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-white/5 text-sm text-white placeholder:text-white/30 outline-none focus:bg-white/10 transition-colors"
              />
            </div>
          </div>

          {/* Period */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-white/60 uppercase tracking-wider">
              Period
            </label>

            <select
              value={period}
              onChange={(e) => setPeriod(Number(e.target.value) as PeriodType)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 text-sm text-white outline-none focus:bg-white/10 transition-colors"
            >
              {Object.values(Period).map((p) => (
                <option key={p} value={p} className="bg-(--bg-main)">
                  {PERIOD_LABELS[p]}
                </option>
              ))}
            </select>
          </div>

          {/* StartDate */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-white/60 uppercase tracking-wider">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 text-sm text-white outline-none focus:bg-white/10 transition-colors"
            />
          </div>

          {/* EndDate */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-white/60 uppercase tracking-wider">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 text-sm text-white outline-none focus:bg-white/10 transition-colors"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-white/60 uppercase tracking-wider">
              Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 text-sm text-white outline-none focus:bg-white/10 transition-colors"
            >
              {categories.map((c) => (
                <option
                  key={c.categoryId}
                  value={c.categoryId}
                  className="bg-(--bg-surface-container-low)"
                >
                  {cap(c.name)}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 mt-2">
            <Button
              variant="outlined"
              type="button"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>

            <Button
              variant="primary"
              type="submit"
              disabled={submitting}
              className="flex-1"
            >
              Add Budget
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
