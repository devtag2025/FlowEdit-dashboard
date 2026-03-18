import { Button } from "./Button";

const TabNavigation = ({ tabs, activeTab, onChange, containerClassName = "", buttonClassName = "" }) => {
  return (
    <div className="flex justify-center mx-auto mb-4 md:mb-10">
      <div className={`flex bg-white/50 rounded-full p-1 w-xl justify-around ${containerClassName}`}>
        {tabs.map((tab) => (
          <Button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`py-2 rounded-full transition flex-1 cursor-pointer
              ${activeTab === tab.value
                ? "bg-white text-primary font-bold shadow-lg"
                : "text-slate-700"
              } ${buttonClassName}`}
          >
            {tab.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
