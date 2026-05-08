import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { IoClose } from "react-icons/io5";

type AddTransactionModalProps = {
  open: boolean;
  onClose: () => void;
};

const categoryOptions = [
  "Rent",
  "Food",
  "Transport",
  "Entertainment",
  "Shopping",
  "Health",
  "Subscriptions",
  "Salary",
  "Other",
];

export const AddTransactionModal = ({
  open,
  onClose,
}: AddTransactionModalProps) => {
  const [type, setType] = useState<"expense" | "income">("expense");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(categoryOptions[0]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState("");

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
    setAmount("");
    setNote("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md mx-4 rounded-3xl bg-(--bg-surface-bright)/80 backdrop-blur-xl border border-white/10 p-6 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-white">Add Transaction</h2>
            <p className="text-xs text-white/50">
              Track a new expense or income
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

        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("New transaction:", {
              type,
              name,
              amount,
              category,
              date,
              note,
            });
            reset();
            onClose();
          }}
          className="flex flex-col gap-4"
        >
          {/* Type switch */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-white/5 rounded-full">
            <button
              type="button"
              onClick={() => setType("expense")}
              className={`py-2 rounded-full text-sm font-medium transition-colors ${
                type === "expense"
                  ? "bg-(--error)/20 text-(--error)"
                  : "text-white/50 hover:text-white"
              }`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setType("income")}
              className={`py-2 rounded-full text-sm font-medium transition-colors ${
                type === "income"
                  ? "bg-(--primary)/20 text-(--primary)"
                  : "text-white/50 hover:text-white"
              }`}
            >
              Income
            </button>
          </div>

          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-white/60 uppercase tracking-wider">
              Description
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Coffee at Patricia"
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 text-sm text-white placeholder:text-white/30 outline-none focus:bg-white/10 transition-colors"
            />
          </div>

          {/* Amount */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-white/60 uppercase tracking-wider">
              Amount (AUD)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm">
                $
              </span>
              <input
                type="number"
                step="0.01"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-white/5 text-sm text-white placeholder:text-white/30 outline-none focus:bg-white/10 transition-colors"
              />
            </div>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-white/60 uppercase tracking-wider">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 text-sm text-white outline-none focus:bg-white/10 transition-colors"
            >
              {categoryOptions.map((c) => (
                <option
                  key={c}
                  value={c}
                  className="bg-(--bg-surface-container-low)"
                >
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-white/60 uppercase tracking-wider">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 text-sm text-white outline-none focus:bg-white/10 transition-colors"
            />
          </div>

          {/* Note */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-white/60 uppercase tracking-wider">
              Note (optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              placeholder="Add a note..."
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 text-sm text-white placeholder:text-white/30 outline-none focus:bg-white/10 transition-colors resize-none"
            />
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
            <Button variant="primary" type="submit" className="flex-1">
              Add Transaction
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
