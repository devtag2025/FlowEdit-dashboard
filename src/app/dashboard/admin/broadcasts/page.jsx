"use client";
import { useState } from "react";
import EmptyBroadcastDetail from "@/components/broadcasts/EmptyBroadcast";
import BroadcastDetail from "@/components/broadcasts/BroadcastsDetail";
import { broadcasts, filters } from "@/data/broadcastpage";
import { Plus, Search, Eye, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import NewBroadcast from "@/components/broadcasts/NewBroadcast";

export default function BroadcastsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBroadcast, setSelectedBroadcast] = useState(null);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("Newest First");
  const [newBroadCast, setNewBroadCast] = useState(false);

  const filteredBroadcasts = broadcasts.filter((broadcast) => {
    const matchesFilter =
      activeFilter === "All" || activeFilter === broadcast.audience;
    const matchesSearch =
      broadcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      broadcast.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const scheduledBroadcasts = filteredBroadcasts.filter(
    (b) => b.status === "scheduled",
  );
  const sentBroadcasts = filteredBroadcasts.filter((b) => b.status === "sent");

  const handleNewBroadCast = () => {
    setSelectedBroadcast(null);
    setNewBroadCast(true);
    setMobileDetailOpen(true);
  };

  const handleBroadcastSelect = (broadcast) => {
    setSelectedBroadcast(broadcast);
    setMobileDetailOpen(true);
  };

  const handleBackToList = () => {
    setSelectedBroadcast(null);
    setMobileDetailOpen(false);
  };

  return (
    <div className="min-h-screen bg-secondary p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-accent">
            Broadcasts
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-tertiary rounded-3xl p-6 space-y-6">
              <div className="flex items-center justify-between flex-col md:flex-row gap-2">
                <h2 className="text-xl font-bold text-accent">Broadcasts</h2>
                <Button
                  className="bg-primary hover:bg-primary/90 text-white gap-2 rounded-xl w-full md:w-fit"
                  onClick={() => handleNewBroadCast()}
                >
                  <Plus className="w-4 h-4" />
                  New Broadcast
                </Button>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-accent/60 uppercase mb-3">
                  Scheduled
                </h3>
                <div className="space-y-3">
                  {scheduledBroadcasts.length > 0 ? (
                    scheduledBroadcasts.map((broadcast) => (
                      <div
                        key={broadcast.id}
                        onClick={() => handleBroadcastSelect(broadcast)}
                        className={`bg-tertiary rounded-2xl p-4 cursor-pointer transition-all hover:shadow-md ${
                          selectedBroadcast?.id === broadcast.id
                            ? "ring-2 ring-primary"
                            : ""
                        }`}
                      >
                        <h4 className="font-semibold text-accent mb-2">
                          {broadcast.title}
                        </h4>
                        <div className="flex gap-2 mb-2">
                          <Badge
                            className={`${broadcast.audienceColor} border-0 text-xs`}
                          >
                            {broadcast.audience}
                          </Badge>
                          <Badge
                            className={`${broadcast.priorityColor} border-0 text-xs`}
                          >
                            {broadcast.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-accent/60">
                          {broadcast.scheduledFor}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-accent/40 text-center py-4">
                      No scheduled broadcasts
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-accent/60 uppercase mb-3">
                  Sent
                </h3>
                <div className="space-y-3">
                  {sentBroadcasts.length > 0 ? (
                    sentBroadcasts.map((broadcast) => (
                      <div
                        key={broadcast.id}
                        onClick={() => handleBroadcastSelect(broadcast)}
                        className={`bg-tertiary rounded-2xl p-4 cursor-pointer transition-all hover:shadow-md ${
                          selectedBroadcast?.id === broadcast.id
                            ? "ring-2 ring-primary"
                            : ""
                        }`}
                      >
                        <h4 className="font-semibold text-accent mb-2">
                          {broadcast.title}
                        </h4>
                        <div className="flex gap-2 mb-2">
                          <Badge
                            className={`${broadcast.audienceColor} border-0 text-xs`}
                          >
                            {broadcast.audience}
                          </Badge>
                          <Badge
                            className={`${broadcast.priorityColor} border-0 text-xs`}
                          >
                            {broadcast.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-accent/60">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {broadcast.views} seen
                          </span>
                          <span>•</span>
                          <span>Sent {broadcast.sentAt}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-accent/40 text-center py-4">
                      No sent broadcasts
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-8">
            <div className="bg-tertiary rounded-3xl p-6 min-h-150">
              {newBroadCast ? (
                <NewBroadcast onCancel={() => setNewBroadCast(false)} />
              ) : selectedBroadcast ? (
                <BroadcastDetail
                  broadcast={selectedBroadcast}
                  onBack={handleBackToList}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                />
              ) : (
                <EmptyBroadcastDetail />
              )}
            </div>
          </div>

          <div className="lg:hidden space-y-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeFilter === filter
                      ? "bg-primary text-white shadow-md"
                      : "bg-tertiary text-accent hover:bg-accent/5"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="relative bg-tertiary rounded-2xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
              <Input
                type="text"
                placeholder="Search broadcasts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 bg-tertiary border-accent/10 text-accent placeholder:text-accent/50 focus:border-primary focus:ring-primary"
              />
            </div>

            <div className="space-y-3">
              {filteredBroadcasts.map((broadcast) => (
                <div
                  key={broadcast.id}
                  onClick={() => handleBroadcastSelect(broadcast)}
                  className="bg-tertiary rounded-2xl p-4 cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-accent flex-1">
                      {broadcast.title}
                    </h3>
                    <Badge
                      className={`${broadcast.priorityColor} border-0 text-xs ml-2`}
                    >
                      {broadcast.priority}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      className={`${broadcast.audienceColor} border-0 text-xs`}
                    >
                      {broadcast.audience}
                    </Badge>
                    {broadcast.status === "scheduled" ? (
                      <span className="text-xs text-accent/60">
                        {broadcast.scheduledFor}
                      </span>
                    ) : (
                      <span className="text-xs text-accent/60 flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {broadcast.views} seen • Sent {broadcast.sentAt}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-accent/70 line-clamp-2">
                    {broadcast.content}
                  </p>
                </div>
              ))}
            </div>

            {filteredBroadcasts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 bg-tertiary rounded-2xl">
                <Search className="w-6 h-6 text-accent/50 mb-2" />
                <p className="text-accent/60 text-sm">No broadcasts found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden fixed inset-x-0 bottom-0 z-40 bg-tertiary border-accent/10 rounded-t-3xl transition-transform duration-300 ease-out shadow-2xl h-[85vh] ${mobileDetailOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="flex justify-center py-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        <div className="h-[calc(85vh-24px)] overflow-y-auto overscroll-contain px-4 pb-6">
          {newBroadCast ? (
            <NewBroadcast
              onCancel={() => {
                setNewBroadCast(false);
                setMobileDetailOpen(false);
              }}
            />
          ) : (
            selectedBroadcast && (
              <BroadcastDetail
                broadcast={selectedBroadcast}
                onBack={() => setMobileDetailOpen(false)}
                isMobile={true}
              />
            )
          )}
        </div>
      </div>

      {mobileDetailOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-30"
          onClick={() => setMobileDetailOpen(false)}
        />
      )}

      {selectedBroadcast && !mobileDetailOpen && (
        <button
          onClick={() => setMobileDetailOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 z-20 p-4 rounded-full bg-primary shadow-lg hover:bg-primary/90 transition-colors"
        >
          <ChevronUp className="w-5 h-5 text-white" />
        </button>
      )}
    </div>
  );
}
