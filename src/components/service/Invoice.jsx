import { Download, FileText } from "lucide-react";
import { Button } from "../common/Button";
import { fetchStripeInvoices } from "@/lib/queries/billing";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";

const Invoice = ({ customerId }) => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      if (!customerId) {
        setError("Stripe customer ID is required to load invoices.");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchStripeInvoices(customerId);
        setInvoices(
          Array.isArray(data)
            ? data.map((item) => ({
                id: item.id || item.number || "--",
                plan: item.lines?.data?.[0]?.plan?.nickname || item.subscription_plan || "Unknown",
                date: item.created
                  ? new Date(item.created * 1000).toLocaleDateString()
                  : item.date || "--",
                amount: item.amount_paid
                  ? `$${(item.amount_paid / 100).toFixed(2)}`
                  : item.total
                  ? `$${(item.total / 100).toFixed(2)}`
                  : "$0.00",
                status: item.status || "unknown",
              }))
            : []
        );
      } catch (err) {
        console.error(err);
        setError("Unable to load invoices. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  if (loading) return <Loader />;

  if (error) {
    return <p className="text-red-600 text-sm">{error}</p>;
  }

  return (
    <section className="max-w-5xl mx-auto overflow-hidden md:rounded-3xl">
      <div className="flex flex-col items-center md:gap-2 p-2 md:flex-row md:items-center md:justify-between md:p-8 md:bg-tertiary">
        <div>
          <h2 className="text-center md:text-left text-accent text-xl font-bold md:text-2xl md:font-semibold mb-2">
            Billing History
          </h2>
          <p className="text-slate-600 text-sm md:text-base text-center md:text-left">
            Download previous invoices and receipts.
          </p>
        </div>

        <Button
          onClick={() => alert("Download all invoices not yet implemented")}
          className="hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow text-sm font-medium text-accent hover:bg-gray-300"
        >
          <Download size={16} />
          Download All
        </Button>
      </div>

      <div className="hidden md:grid grid-cols-6 px-6 py-4 text-xs font-semibold uppercase text-slate-600 bg-white">
        <span>Invoice</span>
        <span>Plan</span>
        <span>Date</span>
        <span>Amount</span>
        <span>Status</span>
        <span>Action</span>
      </div>

      {/* Desktop */}
      <div className="bg-tertiary hidden md:block">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="grid grid-cols-6 items-center px-5 py-6 font-medium text-accent border-slate-300 border-b-2 hover:bg-gray-300"
          >
            <div className="flex gap-3 items-center">
              <FileText size={16} className="text-slate-800" />
              <span>{invoice.id}</span>
            </div>

            <span>{invoice.plan}</span>
            <span>{invoice.date}</span>
            <span>{invoice.amount}</span>

            <span>
              <span className="inline-flex items-center px-3 py-1 text-xs font-semibold text-green-500 bg-green-100 rounded-full">
                {invoice.status}
              </span>
            </span>

            <div className="flex">
              <Button
                onClick={() => alert(`Download invoice ${invoice.id} not yet implemented`)}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-300 hover:bg-white"
              >
                <Download size={16} className="text-accent" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-3">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="bg-tertiary rounded-lg p-3 shadow-sm flex flex-col gap-3"
          >
            <div className="flex justify-between gap-3">
              <div className="flex items-center text-accent gap-2">
                <FileText size={16} />
                <p className="font-semibold text-accent">{invoice.id}</p>
              </div>
              <p className="font-semibold text-accent">{invoice.amount}</p>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <p className="text-xs text-slate-500">{invoice.date}</p>

                <span className="inline-block px-2 py-0.5 text-xs font-semibold text-green-600 bg-green-100 rounded-full">
                  {invoice.status}
                </span>
              </div>

              <Button
                onClick={() => alert(`Download invoice ${invoice.id} not yet implemented`)}
                className="flex items-center justify-center gap-2 bg-white px-2 py-2 rounded-lg shadow font-medium text-accent text-xs"
              >
                <Download size={14} />
                Download
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Invoice;
