import { Users } from "lucide-react";
const EmptyClientDetail = () => (
  <div className="bg-tertiary rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
      <Users className="w-8 h-8 text-primary/40" />
    </div>
    <h3 className="text-xl font-bold text-accent mb-2">
      Select a client to view details
    </h3>
    <p className="text-accent/60">
      Client information and actions will appear here.
    </p>
  </div>
);

export default EmptyClientDetail