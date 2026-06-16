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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl bg-(--bg-surface-container-low)/95 backdrop-blur-2xl border border-white/10 p-6 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.9)]"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold tracking-tight text-white">Add Budget</h2>
            <p className="text-xs text-white/45">
              Plan your spending before it happens
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center h-8 w-8 rounded-full text-white/50 hover:text-white hover:bg-white/8 transition-colors"
            aria-label="Close"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <div>
            <label className="font-label text-[11px] font-medium text-white/40 uppercase tracking-[0.14em]">
              Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Food"
              className="w-full px-4 py-2.5 rounded-xl border border-white/8 bg-white/[0.04] text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-(--primary)/40 focus:ring-1 focus:ring-(--primary)/30"
            />
          </div>

          {/* LimitAmount */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label text-[11px] font-medium text-white/40 uppercase tracking-[0.14em]">
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
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-white/8 bg-white/[0.04] text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-(--primary)/40 focus:ring-1 focus:ring-(--primary)/30"
              />
            </div>
          </div>

          {/* Period */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label text-[11px] font-medium text-white/40 uppercase tracking-[0.14em]">
              Period
            </label>

            <select
              value={period}
              onChange={(e) => setPeriod(Number(e.target.value) as PeriodType)}
              className="w-full px-4 py-2.5 rounded-xl border border-white/8 bg-white/[0.04] text-sm text-white outline-none transition-colors focus:border-(--primary)/40 focus:ring-1 focus:ring-(--primary)/30"
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
            <label className="font-label text-[11px] font-medium text-white/40 uppercase tracking-[0.14em]">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-white/8 bg-white/[0.04] text-sm text-white outline-none transition-colors focus:border-(--primary)/40 focus:ring-1 focus:ring-(--primary)/30"
            />
          </div>

          {/* EndDate */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label text-[11px] font-medium text-white/40 uppercase tracking-[0.14em]">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-white/8 bg-white/[0.04] text-sm text-white outline-none transition-colors focus:border-(--primary)/40 focus:ring-1 focus:ring-(--primary)/30"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label text-[11px] font-medium text-white/40 uppercase tracking-[0.14em]">
              Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl border border-white/8 bg-white/[0.04] text-sm text-white outline-none transition-colors focus:border-(--primary)/40 focus:ring-1 focus:ring-(--primary)/30"
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
