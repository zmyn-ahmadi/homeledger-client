// ---------------------------------- BILL ---------------------------------------
// Fetch bills for personal from /api/bills
export const fetchBills = async () => {
  const res = await fetch("/api/dashboard/personal/bill", {
    method: "GET",
  });

  if (!res.ok) {
    return;
  }

  const data = await res.json();
  return data;
};

export const postBill = async (data: Bill) => {
  try {
    const res = await fetch("/api/dashboard/personal/bill", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      console.error("Failed to create bill", error);
      return;
    }
    return res.json();
  } catch (err) {
    console.error("Network error: ", err);
  }
};

export const putBill = async (id: number, data: Bill) => {
  try {
    const res = await fetch(`/api/dashboard/personal/bill/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      console.error(`Failed to update bill: ${id}`, error);
      return;
    }
  } catch (err) {
    console.error("Network error: ", err);
  }
};

export const deleteBill = async (id: number) => {
  try {
    const res = await fetch(`/api/dashboard/personal/bill/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      console.error(`Failed to delete bill: ${id}`, error);
      return;
    }
  } catch (err) {
    console.error("Network error", err);
  }
};
// ------------------------------------------------------------------------------------
