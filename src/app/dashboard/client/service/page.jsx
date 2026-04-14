
import { Suspense } from "react";
import ServicePageClient from "./servicePageClient";

export default function ServicePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-secondary flex items-center justify-center">Loading services...</div>}>
      <ServicePageClient />
    </Suspense>
  );
}
