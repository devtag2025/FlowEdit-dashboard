
import { Suspense } from "react";
import LoginClient from "./loginClient";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-secondary flex items-center justify-center"><p>Loading...</p></div>}>
      <LoginClient />
    </Suspense>
  );
}
