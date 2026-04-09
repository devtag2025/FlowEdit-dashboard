"use client";
import { useState, useEffect, useCallback } from "react";
import EmptyClientDetail from "@/components/clients/EmptyClient";
import ClientDetail from "@/components/clients/ClientDetail";
import { fetchClients } from "@/lib/queries/clients";
import { Search, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ActionButton } from "@/components/Dashboard/StatusBadge";
import { Eye } from "lucide-react";
import Loader from "@/components/common/Loader";

const filters = ["All", "New", "Inactive"];

const AVATAR_COLORS = [
  "bg-primary",    "bg-blue-500",  "bg-purple-400",
  "bg-indigo-500", "bg-pink-500",  "bg-green-500", "bg-orange-500",
];

function planColor(plan) {
  if (!plan || plan === "launch") return "bg-slate-100 text-slate-600";
  if (plan === "agency")          return "bg-yellow-100 text-yellow-700";
  if (plan === "pro")             return "bg-primary/10 text-primary";
  if (plan === "starter")         return "bg-green-100 text-green-700";
  return "bg-slate-100 text-slate-600";
}

function planLabel(plan) {
  if (!plan || plan === "launch") return "No plan";
  if (plan === "starter")         return "Starter";
  if (plan === "pro")             return "Pro";
  if (plan === "agency")          return "Agency";
  return plan;
}

function formatTenure(dateStr) {
  if (!dateStr) return "—";
  const months =
    (new Date().getFullYear() - new Date(dateStr).getFullYear()) * 12 +
    (new Date().getMonth() - new Date(dateStr).getMonth());
  if (months < 1)  return "This month";
  if (months < 12) return `${months} month${months > 1 ? "s" : ""}`;
  const years = Math.floor(months / 12);
  const rem   = months % 12;
  return rem > 0
    ? `${years}y ${rem}mo`
    : `${years} year${years > 1 ? "s" : ""}`;
}

function deriveStatus(subscriptionStatus) {
  if (subscriptionStatus === "active") return "New";
  return "Inactive";
}

export default function ClientsPage() {
  const [clients, setClients]                   = useState([]);
  const [loading, setLoading]                   = useState(true);
  const [activeFilter, setActiveFilter]         = useState("All");
  const [searchQuery, setSearchQuery]           = useState("");
  const [selectedClient, setSelectedClient]     = useState(null);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchClients();
      setClients(
        data.map((c, i) => ({
          ...c,
          avatarColor: AVATAR_COLORS[i % AVATAR_COLORS.length],
          planColor:   planColor(c.plan),
          planLabel:   planLabel(c.plan),
          tenure:      formatTenure(c.memberSince),
          status:      deriveStatus(c.status),
        }))
      );
    } catch (err) {
      console.error("Failed to load clients:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = clients.filter((c) => {
    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "New"      && c.status === "New") ||
      (activeFilter === "Inactive" && c.status === "Inactive");
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSelect = (client) => {
    setSelectedClient(client);
    setMobileDetailOpen(true);
  };

  const handleBack = () => {
    setSelectedClient(null);
    setMobileDetailOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        <h1 className="text-2xl sm:text-3xl font-bold text-accent">Clients</h1>

        {/* Desktop detail panel */}
        <div className="hidden lg:block">
          {selectedClient ? (
            <ClientDetail client={selectedClient} onBack={handleBack} />
          ) : (
            <EmptyClientDetail />
          )}
        </div>

        <div className="space-y-4">
          {/* Filters + Search */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === f
                      ? "bg-primary text-white"
                      : "bg-white text-accent hover:bg-accent/5"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-80 bg-white rounded-2xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
              <Input
                placeholder="Search clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 bg-white border-accent/10 text-accent placeholder:text-accent focus:border-primary focus:ring-primary"
              />
            </div>
          </div>

          {/* Desktop table */}
          <div className="hidden lg:block bg-tertiary rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-accent/10">
                  <th className="text-left p-4 text-accent/70 font-semibold uppercase text-xs">Client</th>
                  <th className="text-left p-4 text-accent/70 font-semibold uppercase text-xs">Plan</th>
                  <th className="text-left p-4 text-accent/70 font-semibold uppercase text-xs">Status</th>
                  <th className="text-left p-4 text-accent/70 font-semibold uppercase text-xs">Projects</th>
                  <th className="text-left p-4 text-accent/70 font-semibold uppercase text-xs">Member since</th>
                  <th className="text-right p-4 text-accent/70 font-semibold uppercase text-xs">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((client) => (
                  <tr
                    key={client.id}
                    onClick={() => handleSelect(client)}
                    className={`border-b border-accent/10 hover:bg-accent/5 transition-colors cursor-pointer ${
                      selectedClient?.id === client.id ? "bg-primary/5" : ""
                    }`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          {client.avatar_url ? (
                            <AvatarImage src={client.avatar_url} />
                          ) : (
                            <AvatarFallback className={`${client.avatarColor} text-white text-xs font-bold`}>
                              {client.initials}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <p className="font-semibold text-accent text-sm">{client.name}</p>
                          <p className="text-xs text-accent/50">{client.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className={`${client.planColor} border-0 text-xs font-semibold`}>
                        {client.planLabel}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge className={`border-0 text-xs font-semibold ${
                        client.status === "New"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {client.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-accent/70">
                      {client.activeProjects} active · {client.completed} done
                    </td>
                    <td className="p-4 text-sm text-accent/70">{client.tenure}</td>
                    <td className="p-4">
                      <div className="flex justify-end">
                        <ActionButton
                          icon={Eye}
                          label="View"
                          onClick={(e) => { e.stopPropagation(); handleSelect(client); }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="p-12 text-center">
                <p className="text-accent/60">
                  {clients.length === 0 ? "No clients yet." : "No clients match your search."}
                </p>
              </div>
            )}
          </div>

          {/* Mobile cards */}
          <div className="lg:hidden space-y-4">
            {filtered.map((client) => (
              <div
                key={client.id}
                className="bg-tertiary rounded-2xl p-4 space-y-3 cursor-pointer"
                onClick={() => handleSelect(client)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-9 h-9">
                      {client.avatar_url ? (
                        <AvatarImage src={client.avatar_url} />
                      ) : (
                        <AvatarFallback className={`${client.avatarColor} text-white text-sm font-bold`}>
                          {client.initials}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <p className="font-semibold text-accent text-sm">{client.name}</p>
                      <p className="text-xs text-accent/60">{client.email}</p>
                    </div>
                  </div>
                  <Badge className={`${client.planColor} border-0 text-xs font-semibold`}>
                    {client.planLabel}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-accent/60">
                  <span>{client.activeProjects} active · {client.completed} done</span>
                  <span>Since {client.tenure}</span>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="bg-tertiary rounded-2xl p-12 text-center">
                <p className="text-accent/60">
                  {clients.length === 0 ? "No clients yet." : "No clients match your search."}
                </p>
              </div>
            )}
          </div>

          {/* Mobile slide-up detail panel */}
          <div
            className={`lg:hidden fixed inset-x-0 bottom-0 z-40 bg-white rounded-t-2xl shadow-2xl transition-transform duration-300 ${
              mobileDetailOpen ? "translate-y-0" : "translate-y-full"
            }`}
            style={{ maxHeight: "80vh" }}
          >
            <div className="h-full overflow-y-auto">
              {selectedClient && (
                <ClientDetail client={selectedClient} onBack={handleBack} isMobile />
              )}
            </div>
          </div>

          {mobileDetailOpen && (
            <div
              className="lg:hidden fixed inset-0 bg-black/60 z-30"
              onClick={handleBack}
            />
          )}

          {selectedClient && !mobileDetailOpen && (
            <button
              onClick={() => setMobileDetailOpen(true)}
              className="lg:hidden fixed bottom-6 right-6 z-20 p-4 rounded-full bg-primary shadow-lg"
            >
              <ChevronUp className="w-5 h-5 text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}