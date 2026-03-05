import React from "react";
import { Button } from "@/components/common/Button";
import { Card, CardContent } from "@/components/ui/card";
import { Link2 } from "lucide-react";

const WalletSection = () => {
  const payoutInfo = [
    {
      title: "Default Payout method",
      value: "-",
      desc: "Not configured",
    },
    {
      title: "Next scheduled payout",
      value: "JAN 15,2025",
      desc: "Bi-monthly schedule",
    },
    {
      title: "Minimum payout threshold",
      value: "$1.00",
      desc: "Auto-payout enabled",
    },
  ];
  return (
    <Card className="bg-tertiary pt-8 md:rounded-3xl">
      <CardContent className="flex flex-col space-y-8">
        <h1 className="text-accent font-semibold md:font-bold text-xl md:text-2xl mb-2">
          Wallet & Payment Details
        </h1>
        <p className="text-slate-700">
          Manage your payout method and connect your Stripe account to receive
          earnings.
        </p>

        <div className="flex flex-col space-y-4 md:space-y-3 bg-white rounded-xl p-4 md:p-6">
          <div className="flex md:items-center justify-between flex-col gap-2 md:flex-row">
            <div>
              <h3 className="text-lg md:text-xl text-accent font-bold">
                Stripe Connection Status
              </h3>
              <p className="text-slate-700 text-sm md:text-base">
                Connect your account to enable payouts
              </p>
            </div>
            <span className="w-fit text-xs py-1 bg-orange-200 text-orange-500 md:text-sm  md:py-2 px-4 rounded-full font-bold">
              Not Connected
            </span>
          </div>

          <Button className="md:w-fit flex items-center justify-center gap-2 bg-primary px-4 py-3 rounded-full shadow-lg font-bold text-white hover:shadow-xl">
            <Link2 className="w-4 h-4" />
            Connect Stripe Account
          </Button>

          <p className="text-slate-700 text-sm md:text-base">
            You'll be redirected to Stripe Connect to securely complete your
            payout setup.
          </p>
        </div>

        <div>
          <h1 className="text-accent font-bold text-xl md:text-2xl mb-8">
            Payout Information
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {payoutInfo.map((info) => (
              <Card className="bg-white border-0 rounded-3xl">
                <CardContent className="flex flex-col gap-5">
                  <p className="uppercase text-slate-700  text-xs md:text-sm font-bold">
                    {info.title}
                  </p>
                  <h2 className="text-2xl md:text-3xl text-accent font-bold">
                    {info.value}
                  </h2>
                  <p className="text-slate-700">{info.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletSection;
