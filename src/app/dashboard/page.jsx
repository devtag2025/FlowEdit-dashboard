import { redirect } from "next/navigation";

export default function DashboardPage() {
  // TODO: Read user role from auth and redirect accordingly
  redirect("/dashboard/client");
}
