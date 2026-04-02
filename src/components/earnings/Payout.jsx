"use client";
import { Download, Loader2 } from "lucide-react";
import { Button } from "../common/Button";
import { Card, CardContent } from "../ui/card";
import { useState, useEffect } from "react";
import { fetchMyPayments, fetchEarningsSummary } from "@/lib/queries/earnings";

function formatAmount(amount, currency = "gbp") {
  return new Intl.NumberFormat("en-GB", {
    style: "currency", currency: currency.toUpperCase(),
  }).format(amount / 100);
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });
}

const Payout = () => {
  const [payments, setPayments] = useState([]);
  const [summary, setSummary]   = useState(null);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [p, s] = await Promise.all([fetchMyPayments(), fetchEarningsSummary()]);
        setPayments(p);
        setSummary(s);
      } catch (err) {
        console.error("Failed to load earnings:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <Card className="bg-tertiary pt-8 md:rounded-3xl">
        <CardContent className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-primary w-8 h-8" />
        </CardContent>
      </Card>
    );
  }

  const currency = summary?.currency || "gbp";

  const earningSummary = [
    { title: "This Month's Earnings", earning: summary ? formatAmount(summary.thisMonth,   currency) : "£0.00" },
    { title: "Year-to-Date",          earning: summary ? formatAmount(summary.yearToDate,  currency) : "£0.00" },
    { title: "Total Paid Projects",   earning: summary?.totalProjects ?? 0 },
  ];

  return (
    <Card className="bg-tertiary pt-8 md:rounded-3xl">
      <CardContent className="flex flex-col gap-6">
        <h3 className="text-xl font-semibold md:text-2xl text-accent md:font-bold">
          Earnings Summary
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
          {earningSummary.map((earning) => (
            <Card key={earning.title} className="bg-white border-0 md:rounded-3xl">
              <CardContent className="flex flex-col gap-6">
                <p className="uppercase text-slate-700 text-xs md:text-sm font-semibold">{earning.title}</p>
                <h2 className="text-3xl md:text-5xl text-accent font-bold">{earning.earning}</h2>
              </CardContent>
            </Card>
          ))}
        </div>

        {payments.length > 0 ? (
          <div className="w-full overflow-x-auto">
            <div className="min-w-[700px]">
              <div className="grid grid-cols-5 px-6 py-4 text-xs font-semibold uppercase text-slate-700">
                <span>Description</span>
                <span>Status</span>
                <span>Amount</span>
                <span>Date Paid</span>
                <span>Transfer ID</span>
              </div>
              <div className="space-y-2">
                {payments.map((payment) => (
                  <div key={payment.id} className="text-sm md:text-base grid grid-cols-5 gap-x-6 px-6 py-4 font-bold text-accent border-white border-t-2 hover:bg-gray-200">
                    <span className="truncate">{payment.description || "—"}</span>
                    <span>
                      <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                        payment.status === "paid"   ? "bg-green-100 text-green-700" :
                        payment.status === "failed" ? "bg-red-100 text-red-600"    :
                        "bg-orange-200 text-orange-700"
                      }`}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </span>
                    <span>{formatAmount(payment.amount, payment.currency)}</span>
                    <span>{payment.status === "paid" ? formatDate(payment.updated_at) : "—"}</span>
                    <span className="truncate text-xs text-slate-500 font-normal">{payment.stripe_transfer_id || "—"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 text-slate-400">
            <p className="text-lg font-medium">No payments yet</p>
            <p className="text-sm mt-1">Payments from admin will appear here.</p>
          </div>
        )}

        {payments.length > 0 && (
          <div className="flex justify-center md:justify-end mt-3">
            <Button className="w-full md:w-fit flex items-center justify-center gap-2 bg-primary px-4 py-3 rounded-full shadow-lg font-bold text-white hover:shadow-xl">
              <Download className="w-4 h-4" />
              Download Statement
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Payout;