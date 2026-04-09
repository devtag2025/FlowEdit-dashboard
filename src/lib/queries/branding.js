import { createClient } from "@/lib/supabase/client";
import { supabase } from "@/lib/supabase/client";

// ─── Fetch client branding ───
export async function fetchClientBranding(clientId) {
  const { data, error } = await supabase
    .from("client_branding")
    .select("*")
    .eq("client_id", clientId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

// ─── Check if client has branding saved ───
export async function hasBranding(clientId) {
  const { data, error } = await supabase
    .from("client_branding")
    .select("id")
    .eq("client_id", clientId)
    .maybeSingle();

  if (error) throw error;
  return !!data;
}

// ─── Create or update branding ───
export async function upsertClientBranding(clientId, brandingData) {
  const { data, error } = await supabase
    .from("client_branding")
    .upsert(
      {
        client_id: clientId,
        ...brandingData,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "client_id" }
    )
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ─── Upload file to branding bucket ───
export async function uploadBrandingFile(clientId, folder, file) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${fileExt}`;
  const filePath = `${clientId}/${folder}/${fileName}`;

  const { error } = await supabase.storage
    .from("branding")
    .upload(filePath, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("branding")
    .getPublicUrl(filePath);

  return data.publicUrl;
}

// ─── Delete file from branding bucket ───
export async function deleteBrandingFile(fileUrl) {
  // Extract path from public URL
  const url = new URL(fileUrl);
  const pathParts = url.pathname.split("/storage/v1/object/public/branding/");
  if (pathParts.length < 2) return;

  const filePath = decodeURIComponent(pathParts[1]);

  const { error } = await supabase.storage
    .from("branding")
    .remove([filePath]);

  if (error) throw error;
}
