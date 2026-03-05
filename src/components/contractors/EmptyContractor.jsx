import { UserCircle } from "lucide-react";

const EmptyContractorDetail = () => {
  return (
    <div className="bg-tertiary rounded-3xl p-12 flex flex-col items-center justify-center text-center min-h-100">
      <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-4">
        <UserCircle className="w-10 h-10 text-accent/40" />
      </div>
      <h3 className="text-xl font-bold text-accent mb-2">
        Select a Contractor
      </h3>
      <p className="text-accent/60 max-w-md">
        Choose a contractor from the list below to view their details, onboarding progress, and manage their contracts.
      </p>
    </div>
  );
};

export default EmptyContractorDetail;