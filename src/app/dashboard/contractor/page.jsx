"use client";
import { useState, useEffect, useCallback } from "react";
import EmptyContractorDetail from "@/components/contractors/EmptyContractor";
import ContractorDetail from "@/components/contractors/ContractorDetail";
import { fetchContractors } from "@/lib/queries/contractors";
import {
  Search, Eye, MessageSquare, MoreVertical, ChevronUp,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ActionButton } from "@/components/Dashboard/StatusBadge";
import Loader from "@/components/common/Loader";

const filters = ["All", "New", "Inactive"];

const AVATAR_COLORS = [
  "bg-purple-500", "bg-blue-500", "bg-pink-500",
  "bg-green-500",  "bg-orange-500", "bg-indigo-500",
];

function statusColor(status) {
  if (status === "Active")   return "bg-green-100 text-green-700";
  if (status === "New")      return "bg-blue-100 text-blue-700";
  if (status === "Inactive") return "bg-gray-100 text-gray-700";
  return "bg-yellow-100 text-yellow-700";
}

export default function ContractorsPage() {
  const [contractors, setContractors]               = useState([]);
  const [loading, setLoading]                       = useState(true);
  const [activeFilter, setActiveFilter]             = useState("All");
  const [searchQuery, setSearchQuery]               = useState("");
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [mobileDetailOpen, setMobileDetailOpen]     = useState(false);

  // ── declare load BEFORE useEffect that calls it ────────────────────────────
  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchContractors();
      setContractors(
        data.map((c, i) => ({
          ...c,
          avatarColor: AVATAR_COLORS[i % AVATAR_COLORS.length],
          statusColor: statusColor(c.status),
        }))
      );
    } catch (err) {
      console.error("Failed to load contractors:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // ── derived state ──────────────────────────────────────────────────────────
  const filteredContractors = contractors.filter((contractor) => {
    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "New"      && contractor.status === "New") ||
      (activeFilter === "Inactive" && contractor.status === "Inactive");
    const matchesSearch =
      contractor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contractor.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleContractorSelect = (contractor) => {
    setSelectedContractor(contractor);
    setMobileDetailOpen(true);
  };

  const handleBackToList = () => {
    setSelectedContractor(null);
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
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-accent mb-1">Contractors</h1>
        </div>

        <div className="hidden lg:block">
          {selectedContractor ? (
            <ContractorDetail contractor={selectedContractor} onBack={handleBackToList} />
          ) : (
            <EmptyContractorDetail />
          )}
        </div>

        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === filter
                      ? "bg-primary text-white"
                      : "bg-white text-accent hover:bg-accent/5"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-80 bg-white rounded-2xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
              <Input
                type="text"
                placeholder="Search contractors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 bg-white border-accent/10 text-accent placeholder:text-accent focus:border-primary focus:ring-primary"
              />
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block bg-tertiary rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-accent/10">
                  <th className="text-left p-4 text-accent/70 font-semibold uppercase text-xs">Contractor</th>
                  <th className="text-left p-4 text-accent/70 font-semibold uppercase text-xs">Email</th>
                  <th className="text-left p-4 text-accent/70 font-semibold uppercase text-xs">Status</th>
                  <th className="text-right p-4 text-accent/70 font-semibold uppercase text-xs">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredContractors.map((contractor) => (
                  <tr
                    key={contractor.id}
                    className="border-b border-accent/10 hover:bg-accent/5 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className={`${contractor.avatarColor} text-white text-xs font-bold`}>
                            {contractor.name?.[0]?.toUpperCase() || "?"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-semibold text-accent">{contractor.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-accent/70 text-sm">{contractor.email}</td>
                    <td className="p-4">
                      <Badge className={`${contractor.statusColor} border-0 text-xs font-semibold`}>
                        {contractor.status || "Active"}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <ActionButton
                          icon={Eye}
                          label="View"
                          onClick={() => handleContractorSelect(contractor)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {filteredContractors.map((contractor) => (
              <div
                key={contractor.id}
                className="bg-tertiary rounded-2xl p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-9 h-9">
                      <AvatarFallback className={`${contractor.avatarColor} text-white text-sm font-bold`}>
                        {contractor.name?.[0]?.toUpperCase() || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-accent text-sm">{contractor.name}</p>
                      <p className="text-xs text-accent/60">{contractor.email}</p>
                    </div>
                  </div>
                  <Badge className={`${contractor.statusColor} border-0 text-xs font-semibold`}>
                    {contractor.status || "Active"}
                  </Badge>
                </div>
                <div className="flex gap-2 pt-1">
                  <ActionButton
                    icon={Eye}
                    label="View"
                    onClick={() => handleContractorSelect(contractor)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Mobile detail panel */}
          {mobileDetailOpen && selectedContractor && (
            <div className="lg:hidden">
              <ContractorDetail
                contractor={selectedContractor}
                onBack={handleBackToList}
              />
            </div>
          )}

          {filteredContractors.length === 0 && !loading && (
            <div className="bg-tertiary rounded-2xl p-12 text-center">
              <p className="text-accent/60">
                {contractors.length === 0
                  ? "No contractors found."
                  : "No contractors match your search."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}