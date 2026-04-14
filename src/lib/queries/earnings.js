import { supabase } from "@/lib/supabase/client";

export async function fetchMyPayments() {
  const { data: { user } } = await supabase.auth.getUser();
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

export async function fetchContractorContracts() {
  const { data: { user } } = await supabase.auth.getUser();
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

export async function signContract(contractId) {
  const { data, error } = await supabase
    .from("contractor_documents")
    .update({
      status:    "signed",
      signed_at: new Date().toISOString(),
    })
    .eq("id", contractId)
    .select("id, status, signed_at")
    .single();

  if (error) throw error;
  return data;
}

export async function fetchOnboardingSteps() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("onboarding_steps")
    .select("id, step_key, label, completed, completed_at")
    .eq("contractor_id", user.id)
    .order("created_at", { ascending: true }); // ✅ created_at not id

  if (error) throw error;

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

export async function fetchPolicies() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("contractor_documents")
    .select("id, title, file_url, status, created_at")
    .eq("contractor_id", user.id)
    .eq("type", "policy")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}


export function formatCurrency(amountPence, currency = "gbp") {
  return new Intl.NumberFormat("en-GB", {
    style:    "currency",
    currency: currency.toUpperCase(),
  }).format(amountPence / 100);
}

export function earningsSummary(payments) {
  const paid    = payments.filter((p) => p.status === "paid");
  const pending = payments.filter((p) => p.status === "pending");
  return {
    total:   paid.reduce((s, p) => s + p.amount, 0),
    paid:    paid.reduce((s, p) => s + p.amount, 0),
    pending: pending.reduce((s, p) => s + p.amount, 0),
    count:   paid.length,
  };
}

export async function fetchContractorEarnings() {
  return fetchMyPayments();
}
