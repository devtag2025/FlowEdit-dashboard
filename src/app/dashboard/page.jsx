import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // TODO: Read role from profiles table once it's set up
  // For now, default to client
  const role = user.user_metadata?.role || "client";

  redirect(`/dashboard/${role}`);
}
