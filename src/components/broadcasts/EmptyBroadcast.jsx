import { Megaphone, Plus } from "lucide-react";

const EmptyBroadcastDetail = ({ onNew }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full min-h-125 select-none">
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-3xl bg-primary/8 flex items-center justify-center">
          <Megaphone className="w-9 h-9 text-primary/60" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-secondary border-2 border-tertiary flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
        </div>
      </div>

      <h3 className="text-lg font-bold text-accent mb-1.5">No broadcast selected</h3>
      <p className="text-sm text-accent/45 max-w-xs leading-relaxed">
        Pick a broadcast from the inbox to read it, or create a new one to reach your team.
      </p>

      {onNew && (
        <button
          onClick={onNew}
          className="mt-6 flex items-center gap-2 px-4 py-2 bg-primary/8 hover:bg-primary/12 text-primary rounded-xl text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Broadcast
        </button>
      )}
    </div>
  );
};

export default EmptyBroadcastDetail;
