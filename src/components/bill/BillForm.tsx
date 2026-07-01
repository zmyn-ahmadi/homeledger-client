// components/BillForm.tsx
"use client";

import { useState, useEffect } from "react";
import { IoAdd, IoClose } from "react-icons/io5";
import { RecurringFrequencySelect } from "@/components/RecurringFrequencySelect";
import {
  Bill,
  RecurringFrequency,
  RecurringFrequencyType,
  FREQUENCY_LABELS,
} from "@/lib/types";

interface BillFormProps {
  scope: "personal" | "family";
  initialBill?: Bill | null; // when set, form is in edit mode
  onSubmit: (bill: Omit<Bill, "BillId" | "Status"> & { BillId?: number }) => void;
  onCancel?: () => void;
  forceOpen?: boolean; // open from external trigger (edit)
}

const fieldClass =
  "w-full bg-white/[0.04] border border-white/8 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-(--primary)/40 focus:ring-1 focus:ring-(--primary)/30";

const labelClass =
  "font-label text-[11px] font-medium text-white/40 uppercase tracking-[0.14em]";

export default function BillForm({
  scope,
  initialBill,
  onSubmit,
  onCancel,
  forceOpen,
}: BillFormProps) {
  const [open, setOpen] = useState(false);

  // form fields
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [recurringFrequency, setRecurringFrequency] =
    useState<RecurringFrequencyType>(RecurringFrequency.WEEKLY);
  const [notes, setNotes] = useState("");
  const [isPaid, setIsPaid] = useState(false);

  // category
  const [categories, setCategories] = useState<
    { categoryId: number; name: string }[]
  >([]);
  const [categoryId, setCategoryId] = useState<number | "">("");

  // new category form (shown when the "Create new category" option is picked)
  const NEW_CATEGORY = -1;
  const [newCategory, setNewCategory] = useState({
    Name: "",
    Color: "#7c8cff",
    Icon: "",
  });
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [categoryError, setCategoryError] = useState<string | null>(null);

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

  // Sync with edit mode
  useEffect(() => {
    if (initialBill) {
      setOpen(true);
      setName(initialBill.Name);
      setAmount(String(initialBill.Amount));
      setDueDate(initialBill.DueDate.split("T")[0]);
      setNotes(initialBill.Notes ?? "");
      setIsPaid(initialBill.Status === "Paid");
      setCategoryId(initialBill.CategoryId ?? "");

      // Map backend frequency label back to the select's key
      const freqKey = Object.entries(FREQUENCY_LABELS).find(
        ([, label]) => label === initialBill.RecurringFrequency,
      )?.[0] as RecurringFrequencyType | undefined;
      setRecurringFrequency(freqKey ?? RecurringFrequency.WEEKLY);
    }
  }, [initialBill]);

  useEffect(() => {
    if (forceOpen) setOpen(true);
  }, [forceOpen]);

  const reset = () => {
    setName("");
    setAmount("");
    setDueDate("");
    setRecurringFrequency(RecurringFrequency.WEEKLY);
    setNotes("");
    setIsPaid(false);
    setCategoryId("");
    setNewCategory({ Name: "", Color: "#7c8cff", Icon: "" });
    setCategoryError(null);
  };

  const handleSubmit = () => {
    if (
      !name ||
      !amount ||
      !dueDate ||
      recurringFrequency === undefined ||
      recurringFrequency === null ||
      !scope
    )
      return;
    const localDate = new Date(dueDate);
    onSubmit({
      ...(initialBill ? { BillId: initialBill.BillId } : {}),
      Name: name,
      Amount: parseFloat(amount),
      DueDate: localDate.toISOString(),
      RecurringFrequency: FREQUENCY_LABELS[recurringFrequency],
      Notes: notes,
      Scope: scope,
      CategoryId: categoryId === "" ? null : categoryId,
    });
    reset();
    setOpen(false);
  };

  const handleCancel = () => {
    reset();
    setOpen(false);
    onCancel?.();
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

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-dashed border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-5 h-5 rounded-full bg-(--primary)/15 text-(--primary) flex items-center justify-center text-sm font-semibold">
            <IoAdd />
          </span>
          <span className="text-sm font-medium text-white/70">
            Add a new bill
          </span>
        </div>
      </button>
    );
  }

  const isEdit = !!initialBill;

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-white/8 bg-white/[0.03] p-5 font-sans">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-(--primary)/15 text-(--primary) flex items-center justify-center text-sm font-semibold">
            <IoAdd />
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">
              {isEdit ? "Edit bill" : "New bill"}
            </span>
            <span className="text-[11px] text-white/40">
              {isEdit ? "Update this commitment" : "Track a new commitment"}
            </span>
          </div>
        </div>
        <button
          onClick={handleCancel}
          className="flex items-center justify-center h-8 w-8 rounded-full text-white/40 hover:text-white hover:bg-white/8 transition-colors"
          aria-label="Close"
        >
          <IoClose className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className={labelClass}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Rent"
            className={fieldClass}
          />
        </div>

        {/* Amount */}
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Amount (AUD)</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-sm">
              $
            </span>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className={`${fieldClass} pl-7`}
            />
          </div>
        </div>

        {/* Due date */}
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Due date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={fieldClass}
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className={labelClass}>Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className={fieldClass}
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
                className={fieldClass}
              />
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newCategory.Icon}
                  onChange={(e) =>
                    setNewCategory((c) => ({ ...c, Icon: e.target.value }))
                  }
                  placeholder="Icon (e.g. 🍔)"
                  className={`${fieldClass} flex-1`}
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
              <button
                type="button"
                onClick={handleCreateCategory}
                disabled={creatingCategory}
                className="text-xs font-medium px-3.5 py-2 rounded-full bg-(--primary)/20 text-(--primary) hover:bg-(--primary)/30 transition-colors disabled:opacity-50"
              >
                {creatingCategory ? "Creating..." : "Create category"}
              </button>
            </div>
          )}
        </div>

        {/* Recurring frequency */}
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Recurring frequency</label>
          <RecurringFrequencySelect
            value={recurringFrequency}
            onChange={setRecurringFrequency}
            className={fieldClass}
          />
        </div>

        {/* Notes */}
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Notes</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional note"
            className={fieldClass}
          />
        </div>

        {/* Is paid */}
        <label className="flex items-center gap-2.5 text-sm text-white/80 md:col-span-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isPaid}
            onChange={(e) => setIsPaid(e.target.checked)}
            className="w-4 h-4 rounded bg-white/5 accent-(--primary)"
          />
          Mark as paid
        </label>
      </div>

      <div className="flex justify-end gap-2 pt-1">
        <button
          onClick={handleCancel}
          className="text-xs font-medium px-4 py-2 rounded-full text-white/50 hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="text-xs font-medium px-4 py-2 rounded-full bg-linear-to-r from-(--primary) to-(--primary-container) text-(--text-primary) font-semibold hover:brightness-110 transition-all"
        >
          {isEdit ? "Save changes" : "Add bill"}
        </button>
      </div>
    </div>
  );
}
