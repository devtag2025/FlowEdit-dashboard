export const StatusBadge = ({ status }) => {
  const styles = {
    Active: "bg-primary text-white",
    "Not Granted": "bg-gray-300 text-slate-800",
    Pending: "border border-primary text-primary",
  };

  return (
    <div
      className={`w-fit rounded-full px-3 py-1 md:py-2 text-xs md:text-sm font-medium ${styles[status]}`}
    >
      {status}
    </div>
  );
};
