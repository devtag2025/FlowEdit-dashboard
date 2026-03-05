import { CreditCard, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "../common/Button";
import { useState } from "react";
import BillingEditModal from "./EditModal/EditModal";

const PaymentDetail = () => {
  const [billing, setBilling] = useState({
    companyName: "Acme Inc.",
    billingEmail: "billing@acme.com",
    address: "123 Market Street",
    city: "San Francisco, CA 94105",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <section className="max-w-5xl mx-auto bg-tertiary rounded-lg md:rounded-3xl p-3 md:p-6 mb-8 text-accent">
        <div className="space-y-6 ">
          <div>
            <h3 className="text-lg font-semibold mb-1">Payment Methods</h3>
            <p className="text-slate-600 text-sm md:text-base">
              Manage your credit cards and billing preferences.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:items-center md:justify-between bg-white rounded-lg md:rounded-2xl p-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg shadow-xl">
                <CreditCard className="text-blue-700" />
              </div>

              <div>
                <h3 className="font-medium text-sm md:text-base mb-1">
                  Visa ending in 4242
                </h3>
                <p className="text-sm text-slate-500">Expires 12/25</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-slate-600 font-medium px-3 py-1 rounded-lg bg-slate-200 text-xs md:text-sm">
                Default
              </span>

              <Button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg border md:border-2 border-slate-300 hover:bg-gray-300">
                <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </Button>
            </div>
          </div>

          <Button className="flex items-center justify-center w-full bg-white text-accent border md:border-2 border-dashed rounded-xl p-4 gap-2 border-slate-300  font-semibold hover:border-primary">
            <Plus className="text-accent w-4 h-4 md:w-6 md:h-6" />
            Add New Payment Method
          </Button>
        </div>
      </section>

      <section className="max-w-5xl mx-auto bg-tertiary rounded-lg md:rounded-3xl p-6 text-accent">
        <div className="flex items-center justify-between bg-tertiary mb-5 gap-2">
          <div>
            <h3 className="text-lg font-semibold mb-1">Billing Address</h3>
            <p className="text-slate-600 text-sm md:text-base">
              This address appears on your monthly invoices.
            </p>
          </div>

          <Button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center w-12 md:w-10 h-10 border md:border-2 border-slate-300 rounded-lg text-accent hover:bg-gray-300"
          >
            <Pencil className="w-4 h-4" />
          </Button>
        </div>

        <BillingEditModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          billing={billing}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 md:bg-white md:p-6 rounded-2xl font-semibold gap-3 md:gap-4 text-accent">
          <div>
            <p className="text-accent text-xs md:text-base mb-1">
              Company Name
            </p>
            <p className="text-slate-600 font-medium text-sm md:text-base">
              {billing.companyName}
            </p>
          </div>

          <div>
            <p className="text-accent text-xs md:text-base mb-1">
              Billing Email
            </p>
            <p className="text-slate-600 font-medium text-sm md:text-base">
              {billing.billingEmail}
            </p>
          </div>

          <div>
            <p className="text-accent mb-1 text-xs md:text-base">Address</p>
            <p className="text-slate-600 font-medium text-sm md:text-base">
              {billing.address}
            </p>
          </div>

          <div>
            <p className="text-accent mb-1 text-xs md:text-base">City/State</p>
            <p className="text-slate-600 font-medium text-sm md:text-base">
              {billing.city}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentDetail;
