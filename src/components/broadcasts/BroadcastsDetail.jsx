import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const BroadcastDetail = ({
  broadcast,
  onBack,
  isMobile,
  activeFilter,
  setActiveFilter,
  sortOrder,
}) => {
  if (isMobile) {
    return (
      <div className="bg-tertiary rounded-t-3xl p-4 pb-6 space-y-4">
        <div className="flex justify-center -mt-2 mb-1">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-xl font-bold text-accent flex-1">
              {broadcast.title}
            </h2>
            <button
              onClick={onBack}
              className="p-2 hover:bg-accent/5 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-accent" />
            </button>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={`${broadcast.audienceColor} border-0`}>
              {broadcast.audience}
            </Badge>
            {broadcast.status === "scheduled" ? (
              <span className="text-sm text-accent/70">
                Scheduled for {broadcast.scheduledFor}
              </span>
            ) : (
              <span className="text-sm text-accent/70">
                Sent {broadcast.sentAt}
              </span>
            )}
          </div>
        </div>
        <div className="bg-accent/5 rounded-xl p-4">
          <div className="prose prose-sm max-w-none">
            <p className="text-accent/80 whitespace-pre-wrap">
              {broadcast.content}
            </p>

            {broadcast.agenda && (
              <div className="mt-4">
                <p className="font-semibold text-accent mb-2">Agenda:</p>
                <ul className="space-y-1 text-accent/70">
                  {broadcast.agenda.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {broadcast.additionalInfo && (
              <div className="mt-4">
                <p className="text-accent/70 italic">
                  {broadcast.additionalInfo}
                </p>
              </div>
            )}
          </div>
        </div>
        {broadcast.status === "sent" && (
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-accent/5 rounded-xl p-3">
              <p className="text-xs text-accent/60 mb-1">Views</p>
              <p className="text-2xl font-bold text-accent">
                {broadcast.views}
              </p>
            </div>
            <div className="bg-accent/5 rounded-xl p-3">
              <p className="text-xs text-accent/60 mb-1">Recipients</p>
              <p className="text-2xl font-bold text-accent">
                {broadcast.recipients || "All"}
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            className="flex-1 border-2 border-accent/20 text-accent hover:bg-accent/5 h-11 rounded-xl gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit
          </Button>
          <Button
            variant="ghost"
            className="flex-1 text-danger hover:bg-danger/10 hover:text-danger h-11 rounded-xl gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {["All", "Contractors", "Clients", "Management"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter && setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                activeFilter === filter
                  ? "bg-primary text-white shadow-md"
                  : "bg-tertiary text-accent hover:bg-accent/5"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-tertiary rounded-full text-sm font-medium text-accent hover:bg-accent/5 transition-all cursor-pointer">
          {sortOrder || "Newest First"}
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-tertiary rounded-2xl p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-accent mb-2">
              {broadcast.title}
            </h2>
            <div className="flex items-center gap-3">
              <Badge className={`${broadcast.audienceColor} border-0`}>
                {broadcast.audience}
              </Badge>
              {broadcast.status === "scheduled" ? (
                <span className="text-sm text-accent/70">
                  Scheduled for {broadcast.scheduledFor}
                </span>
              ) : (
                <span className="text-sm text-accent/70">
                  Sent {broadcast.sentAt}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <button className="p-2 hover:bg-accent/5 rounded-lg transition-colors cursor-pointer">
              <Edit className="w-5 h-5 text-accent" />
            </button>
            <button className="p-2 hover:bg-danger/10 rounded-lg transition-colors cursor-pointer">
              <Trash2 className="w-5 h-5 text-danger" />
            </button>
            <button
              onClick={onBack}
              className="p-2 hover:bg-accent/5 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 text-accent" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-tertiary rounded-2xl p-6">
        <div className="prose prose-lg max-w-none">
          <p className="text-accent/80 whitespace-pre-wrap leading-relaxed">
            {broadcast.content}
          </p>

          {broadcast.agenda && (
            <div className="mt-6">
              <p className="font-semibold text-accent text-lg mb-3">Agenda:</p>
              <ul className="space-y-2 text-accent/70">
                {broadcast.agenda.map((item, index) => (
                  <li key={index} className="text-base">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {broadcast.additionalInfo && (
            <div className="mt-6">
              <p className="text-accent/70 italic text-base">
                {broadcast.additionalInfo}
              </p>
            </div>
          )}
        </div>
      </div>

      {broadcast.status === "sent" && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-tertiary rounded-2xl p-6">
            <p className="text-sm text-accent/60 mb-2">Total Views</p>
            <p className="text-3xl font-bold text-accent">{broadcast.views}</p>
          </div>
          <div className="bg-tertiary rounded-2xl p-6">
            <p className="text-sm text-accent/60 mb-2">Recipients</p>
            <p className="text-3xl font-bold text-accent">
              {broadcast.recipients || "All"}
            </p>
          </div>
          <div className="bg-tertiary rounded-2xl p-6">
            <p className="text-sm text-accent/60 mb-2">Priority</p>
            <Badge
              className={`${broadcast.priorityColor} border-0 text-sm px-3 py-1`}
            >
              {broadcast.priority}
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
};

export default BroadcastDetail;
