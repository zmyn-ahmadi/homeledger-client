import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { IoClose } from "react-icons/io5";
import { getApiErrorMessage } from "@/lib/utils";
import { RecurringFrequency, RecurringFrequencyType } from "@/lib/types";
import { RecurringFrequencySelect } from "@/components/RecurringFrequencySelect";

// props type
type AddTransactionModalProps = {
  open: boolean;
  onClose: () => void;
};

export const AddTransactionModal = ({
  open,
  onClose,
}: AddTransactionModalProps) => {
  // expense or income
  const [type, setType] = useState<"expense" | "income">("expense");

  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  // description
  const [name, setName] = useState("");

  const [categories, setCategories] = useState<
    { categoryId: number; name: string }[]
  >([]);
  const [categoryId, setCategoryId] = useState<number | "">("");

  const [note, setNote] = useState("");

  // new category form (shown when the "Create new category" option is picked)
  const NEW_CATEGORY = -1;
  const [newCategory, setNewCategory] = useState({
    Name: "",
    Color: "#7c8cff",
    Icon: "",
  });
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  // income data fields
  const [source, setSource] = useState("");
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [recurringFrequency, setRecurringFrequency] =
    useState<RecurringFrequencyType>(RecurringFrequency.WEEKLY);

  // disable the submit button while the request is in flight
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

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
    setType("expense");
    setName("");
    setAmount("");
    setNote("");
    setDate(new Date().toISOString().slice(0, 10));
    setCategoryId("");
    setNote("");
    setSource("");
    setIsRecurring(false);
    setRecurringFrequency(RecurringFrequency.WEEKLY);
    setNewCategory({ Name: "", Color: "#7c8cff", Icon: "" });
    setCategoryError(null);
    setSubmitError("");
  };

  // Submit the form
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitting(true);
    setSubmitError("");

    const endpoint =
      type === "expense"
        ? "/api/dashboard/personal/expense"
        : "/api/dashboard/personal/income";

    const localDate = new Date(date);
    const body = {
      CategoryId: categoryId,
      Description: name,
      Amount: parseFloat(amount),
      Date: localDate.toISOString(),
      Note: note,
      Type: type === "expense" ? 0 : 1,
      ...(type === "income" && {
        Source: source,
        IsRecurring: isRecurring,
        RecurringFrequency: isRecurring ? recurringFrequency : null,
      }),
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        console.error("Failed to add transaction: ", error);
        setSubmitError(
          getApiErrorMessage(error, "Failed to add the transaction. Please try again."),
        );
        return;
      }

      reset();
      onClose();
    } catch (err) {
      console.error("Network error: ", err);
      setSubmitError("Network error. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  // POST: /api/category — create a new category then select it
  const handleCreateCategory = async () => {
    if (!newCategory.Name.trim()) {
      setCategoryError("Name is required");
      return;
    }

    setCreatingCategory(true);
    setCategoryError(null);

    try {
      const response = await fetch("/api/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: newCategory.Name.trim(),
          Color: newCategory.Color,
          Icon: newCategory.Icon.trim(),
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        console.error("Failed to create category: ", error);
        setCategoryError("Failed to create category");
        return;
      }

      const created: { categoryId: number; name: string } =
        await response.json();

      setCategories((prev) => [...prev, created]);
      setCategoryId(created.categoryId);
      setNewCategory({ Name: "", Color: "#7c8cff", Icon: "" });
    } catch (err) {
      console.error("Network error: ", err);
      setCategoryError("Network error");
    } finally {
      setCreatingCategory(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl bg-(--bg-surface-container-low)/95 backdrop-blur-2xl border border-white/10 p-6 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.9)]"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold tracking-tight text-white">
              Add Transaction
            </h2>
            <p className="text-xs text-white/45">
              Track a new expense or income
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

        <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
          {/* Type switch */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-white/5 border border-white/8 rounded-full">
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
            <label className="font-label text-[11px] font-medium text-white/40 uppercase tracking-[0.14em]">
              Description
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Coffee at Patricia"
              className="w-full px-4 py-2.5 rounded-xl border border-white/8 bg-white/[0.04] text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-(--primary)/40 focus:ring-1 focus:ring-(--primary)/30"
            />
          </div>

          {/* Amount */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label text-[11px] font-medium text-white/40 uppercase tracking-[0.14em]">
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
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-white/8 bg-white/[0.04] text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-(--primary)/40 focus:ring-1 focus:ring-(--primary)/30"
              />
            </div>
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
              <option
                value=""
                disabled
                className="bg-(--bg-surface-container-low)"
              >
                Select a category
              </option>
              {categories.map((c) => (
                <option
                  key={c.categoryId}
                  value={c.categoryId}
                  className="bg-(--bg-surface-container-low)"
                >
                  {c.name}
                </option>
              ))}

              <option
                value={NEW_CATEGORY}
                className="bg-(--bg-surface-container-low)"
              >
                + Create new category
              </option>
            </select>

            {categoryId === NEW_CATEGORY && (
              <div className="flex flex-col gap-2 mt-1 p-3 rounded-xl border border-white/8 bg-white/[0.03]">
                <input
                  type="text"
                  value={newCategory.Name}
                  onChange={(e) =>
                    setNewCategory((c) => ({ ...c, Name: e.target.value }))
                  }
                  placeholder="Category name"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/8 bg-white/[0.04] text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-(--primary)/40 focus:ring-1 focus:ring-(--primary)/30"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newCategory.Icon}
                    onChange={(e) =>
                      setNewCategory((c) => ({ ...c, Icon: e.target.value }))
                    }
                    placeholder="Icon (e.g. 🍔)"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-white/8 bg-white/[0.04] text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-(--primary)/40 focus:ring-1 focus:ring-(--primary)/30"
                  />
                  <input
                    type="color"
                    value={newCategory.Color}
                    onChange={(e) =>
                      setNewCategory((c) => ({ ...c, Color: e.target.value }))
                    }
                    aria-label="Category color"
                    className="h-10 w-12 shrink-0 rounded-xl border border-white/8 bg-white/[0.04] cursor-pointer"
                  />
                </div>
                {categoryError && (
                  <p className="text-xs text-(--error)">{categoryError}</p>
                )}
                <Button
                  variant="primary"
                  type="button"
                  onClick={handleCreateCategory}
                  disabled={creatingCategory}
                >
                  {creatingCategory ? "Creating..." : "Create category"}
                </Button>
              </div>
            )}
          </div>

          {/* Date */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label text-[11px] font-medium text-white/40 uppercase tracking-[0.14em]">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-white/8 bg-white/[0.04] text-sm text-white outline-none transition-colors focus:border-(--primary)/40 focus:ring-1 focus:ring-(--primary)/30"
            />
          </div>

          {/* Note */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label text-[11px] font-medium text-white/40 uppercase tracking-[0.14em]">
              Note (optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              placeholder="Add a note..."
              className="w-full px-4 py-2.5 rounded-xl border border-white/8 bg-white/[0.04] text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-(--primary)/40 focus:ring-1 focus:ring-(--primary)/30 resize-none"
            />
          </div>

          {/* Source (income only) */}
          {type === "income" && (
            <div className="flex flex-col gap-1.5">
              <label className="font-label text-[11px] font-medium text-white/40 uppercase tracking-[0.14em]">
                Source
              </label>
              <input
                type="text"
                required
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="e.g. Salary, Freelance"
                className="w-full px-4 py-2.5 rounded-xl border border-white/8 bg-white/[0.04] text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-(--primary)/40 focus:ring-1 focus:ring-(--primary)/30"
              />
            </div>
          )}

          {/* RecurringFrequency */}
          {type === "income" && (
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-2 text-sm text-white">
                <input
                  type="checkbox"
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                  className="w-4 h-4 rounded bg-white/5 accent-white/80"
                />
                Recurring income
              </label>
            </div>
          )}

          {type === "income" && isRecurring && (
            <div className="flex flex-col gap-1.5">
              <label className="font-label text-[11px] font-medium text-white/40 uppercase tracking-[0.14em]">
                Recurring frequency
              </label>
              <RecurringFrequencySelect
                value={recurringFrequency}
                onChange={setRecurringFrequency}
              />
            </div>
          )}

          {submitError && (
            <p className="rounded-xl border border-(--error)/20 bg-(--error)/10 px-4 py-2.5 text-center text-xs font-label text-(--error)">
              {submitError}
            </p>
          )}

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
              {submitting ? "Adding..." : "Add Transaction"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
