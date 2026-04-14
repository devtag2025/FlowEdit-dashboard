// src/app/dashboard/client/service/page.jsx
import { Suspense } from "react";
import ServicePageClient from "./ServicePageClient"; // Import the child component

export default function ServicePage() {
  return (
    // 👇 Wrap the client component in Suspense
    <Suspense fallback={<div className="min-h-screen bg-secondary flex items-center justify-center">Loading services...</div>}>
      <ServicePageClient />
    </Suspense>
  );
}
