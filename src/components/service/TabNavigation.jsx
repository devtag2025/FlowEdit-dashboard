import { Button } from "../common/Button";

const TabNavigation = ({ activeTab, onChange }) => {
  const tabs = [
    {
      label: "Overview",
      value: "overview",
    },
    {
      label: "Invoices",
      value: "invoices",
    },
    {
      label: "Payment",
      value: "payment",
    },
  ];

  return (
    <div className="flex justify-center mx-auto mb-4 md:mb-10">
      <div className="flex border border-tertiary md:bg-tertiary rounded-full p-1 w-5xl justify-around">
        {tabs.map((tab) => (
          <Button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`text-accent py-1 md:px-6 md:py-2 rounded-full transition font-semibold flex-1 cursor-pointer text-lg
        ${
          activeTab === tab.value
            ? "bg-white text-accent shadow-lg"
            : "text-slate-500"
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
