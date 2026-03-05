import { Button } from "../common/Button";

const TabNavigation = ({ activeTab, onChange }) => {
  const tabs = [
    {
      label: "Payouts",
      value: "payout",
    },
    {
      label: "Wallet",
      value: "wallet",
    },
  ];

  return (
    <div className="flex justify-center mx-auto mb-4 md:mb-10">
      <div className="flex bg-white/50 rounded-full p-1 w-xl justify-around">
        {tabs.map((tab) => (
          <Button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`py-2 rounded-full transition flex-1 cursor-pointer
        ${
          activeTab === tab.value
            ? "bg-white text-primary font-bold shadow-lg"
            : "text-slate-700"
        }`}
          >
            {tab.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
