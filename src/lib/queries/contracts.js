
import { getSupabaseClient } from "../supabase/client";
const supabase = getSupabaseClient()

// ─── ADMIN: Fetch all contracts (across all contractors) ──────────────────────
export async function fetchAllContracts() {
  const { data, error } = await supabase
    .from("contractor_documents")
    .select(
      `
      id, title, file_url, status, signed_at, created_at, contractor_id, type,
      contractor:profiles!contractor_id(id, name, email, avatar_url)
    `
    )
    .eq("type", "contract")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

// ─── ADMIN: Upload contract PDF to Supabase Storage ───────────────────────────
export async function uploadContractFile(contractorId, file) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${fileExt}`;
  const filePath = `${contractorId}/${fileName}`;

  const { error } = await supabase.storage
    .from("contracts")
    .upload(filePath, file);

  if (error) throw error;

  const { data } = supabase.storage.from("contracts").getPublicUrl(filePath);

  return data.publicUrl;
}

// ─── ADMIN: Create a contract and assign to a contractor ──────────────────────
export async function createContract({ contractorId, title, fileUrl }) {
  const { data, error } = await supabase
    .from("contractor_documents")
    .insert({
      contractor_id: contractorId,
      title: title || "Contractor Agreement",
      file_url: fileUrl,
      type: "contract",
      status: "pending",
    })
    .select(
      `
      id, title, file_url, status, signed_at, created_at, contractor_id, type,
      contractor:profiles!contractor_id(id, name, email, avatar_url)
    `
    )
    .single();

  if (error) throw error;
  return data;
}

// ─── ADMIN: Delete a contract ─────────────────────────────────────────────────
export async function deleteContract(contractId) {
  const { error } = await supabase
    .from("contractor_documents")
    .delete()
    .eq("id", contractId);

  if (error) throw error;
}
