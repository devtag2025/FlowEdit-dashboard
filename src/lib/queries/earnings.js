import { supabase } from "@/lib/supabase/client";

export async function fetchMyPayments() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("contractor_payments")
    .select("*")
    .eq("contractor_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function fetchEarningsSummary() {
  const payments = await fetchMyPayments();
  const paid = payments.filter((p) => p.status === "paid");

  const now = new Date();
  const thisMonth = paid.filter((p) => {
    const d = new Date(p.created_at);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const thisYear = paid.filter(
    (p) => new Date(p.created_at).getFullYear() === now.getFullYear()
  );

  return {
    thisMonth:     thisMonth.reduce((sum, p) => sum + p.amount, 0),
    yearToDate:    thisYear.reduce((sum, p) => sum + p.amount, 0),
    totalProjects: paid.length,
    currency:      payments[0]?.currency || "gbp",
  };
}

export async function fetchContractorPayments(contractorId) {
  const { data, error } = await supabase
    .from("contractor_payments")
    .select("*")
    .eq("contractor_id", contractorId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function fetchConnectStatus(profileId) {
  const res = await fetch(`/api/stripe/connect/status?profileId=${profileId}`);
  if (!res.ok) throw new Error("Failed to fetch connect status");
  return res.json();
}

export async function startConnectOnboarding({ profileId, email }) {
  const res = await fetch("/api/stripe/connect", {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ profileId, email }),
  });
  if (!res.ok) throw new Error("Failed to start onboarding");
  return res.json();
}

export async function createPayment({ contractorId, adminId, amount, currency, description }) {
  const res = await fetch("/api/stripe/payout", {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ contractorId, adminId, amount, currency, description }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to create payment");
  return data;
}

// ── Contracts ─────────────────────────────────────────────────────────────────

export async function fetchContractorContracts() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("contractor_documents")
    .select("id, title, file_url, status, signed_at, created_at")
    .eq("contractor_id", user.id)
    .eq("type", "contract")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

// ── Onboarding Steps ──────────────────────────────────────────────────────────

export async function fetchOnboardingSteps() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("onboarding_steps")
    .select("id, step_key, label, completed, completed_at")
    .eq("contractor_id", user.id)
    .order("id", { ascending: true });

  if (error) throw error;

  // Fallback to default steps if none exist in DB yet
  if (!data || data.length === 0) {
    return [
      { id: 1, label: "Start",    completed: false },
      { id: 2, label: "Account",  completed: false },
      { id: 3, label: "Profile",  completed: false },
      { id: 4, label: "Training", completed: false },
      { id: 5, label: "Contract", completed: false },
      { id: 6, label: "Signed",   completed: false },
      { id: 7, label: "Ready",    completed: false },
      { id: 8, label: "End",      completed: false },
    ];
  }

  return data;
}
