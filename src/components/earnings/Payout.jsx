import { Download } from "lucide-react";
import { Button } from "../common/Button";
import { Card, CardContent } from "../ui/card";

const Payout = () => {
  const earningSummary = [
    {
      title: "This Month's Earnings",
      earning: "$8,450",
    },
    {
      title: "Year-to-Date",
      earning: "$96,200",
    },
    {
      title: "Total Paid Projects",
      earning: "127",
    },
  ];
  const payouts = [
    {
      project: "Social Media Campaign",
      client: "Global Brands",
      status: "Paid",
      amount: "$ 2,500",
      date: "Jan 8, 2025",
      bonus: "+ $75 Quality Bonus",
    },
    {
      project: "Product Launch Video",
      client: "Acme Corp",
      status: "Pending",
      amount: "$ 3,200",
      date: "-",
      bonus: "-",
    },
    {
      project: "Brand Guidelines",
      client: "TechStart Inc",
      status: "Paid",
      amount: "$ 1,800",
      date: "Dec 28, 2024",
      bonus: "+ $50 Speed Bonus",
    },
    {
      project: "Website Redesign",
      client: "Startup Labs",
      status: "Pending",
      amount: "$ 4,500",
      date: "-",
      bonus: "+ $100 Exceptional Work Bonus",
    },
  ];
  return (
    <Card className="bg-tertiary pt-8 md:rounded-3xl">
      <CardContent className="flex flex-col gap-6">
        <h3 className="text-xl font-semibold md:text-2xl text-accent md:font-bold">
          Earnings Summary
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
          {earningSummary.map((earning) => (
            <Card className="bg-white border-0 md:rounded-3xl">
              <CardContent className="flex flex-col gap-6">
                <p className="uppercase text-slate-700  text-xs md:text-sm font-semibold">
                  {earning.title}
                </p>
                <h2 className="text-3xl md:text-5xl text-accent font-bold">
                  {earning.earning}
                </h2>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="w-full overflow-x-auto">
          <div className="min-w-225">
            <div className="grid grid-cols-6 px-6 py-4 text-xs font-semibold uppercase text-slate-700">
              <span>Project</span>
              <span>Client</span>
              <span>Status</span>
              <span>Amount</span>
              <span>Date Paid</span>
              <span>Bonuses Earned</span>
            </div>

            <div className="space-y-2">
              {payouts.map((payout, idx) => (
                <div
                  key={idx}
                  className="text-sm md:text-base grid grid-cols-6 gap-x-6 px-6 py-4 font-bold text-accent border-white border-t-2 hover:bg-gray-200"
                >
                  <span>{payout.project}</span>
                  <span>{payout.client}</span>
                  <span>
                    <span
                      className={`inline-flex px-4 py-1.5 text-xs font-bold rounded-full ${
                        payout.status === "Paid"
                          ? "bg-green-300 text-green-700"
                          : "bg-orange-200 text-orange-700"
                      }`}
                    >
                      {payout.status}
                    </span>
                  </span>
                  <span>{payout.amount}</span>
                  <span>{payout.date}</span>
                  <span className="text-green-600">{payout.bonus}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center md:justify-end mt-3">
          <Button className="w-full md:w-fit flex items-center justify-center gap-2 bg-primary px-4 py-3 rounded-full shadow-lg font-bold text-white hover:shadow-xl">
            <Download className="w-4 h-4" />
            Download Statement
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Payout;
