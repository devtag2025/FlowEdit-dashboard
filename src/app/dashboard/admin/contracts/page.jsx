"use client";
import { useEffect, useState, useCallback } from "react";
import { fetchAllContracts, deleteContract } from "@/lib/queries/contracts";
import { downloadFile } from "@/lib/utils/download";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Download,
  FileText,
  Plus,
  Search,
  Trash2,
  FileX,
  Loader2,
} from "lucide-react";
import Loader from "@/components/common/Loader";
import CreateContractModal from "@/components/contracts/Createcontractmodal";

const FILTERS = ["All", "Pending", "Signed"];

function statusColor(status) {
  if (status === "signed" || status === "active")
    return "bg-green-100 text-green-700";
  if (status === "pending") return "bg-yellow-100 text-yellow-700";
  if (status === "expired") return "bg-gray-100 text-gray-600";
  return "bg-blue-100 text-blue-700";
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getInitials(name) {
  return (name || "?")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const AVATAR_COLORS = [
  "bg-purple-500", "bg-blue-500", "bg-pink-500",
  "bg-green-500", "bg-orange-500", "bg-indigo-500",
];

export default function AdminContractsPage() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAllContracts();
      setContracts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (contractId) => {
    if (!confirm("Are you sure you want to delete this contract?")) return;
    try {
      setDeletingId(contractId);
      await deleteContract(contractId);
      setContracts((prev) => prev.filter((c) => c.id !== contractId));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleDownload = (url, title) => {
    const filename = `${(title || "contract").replace(/\s+/g, "-").toLowerCase()}.pdf`;
    downloadFile(url, filename);
  };

  const filteredContracts = contracts.filter((contract) => {
    const matchesFilter =
      activeFilter === "All" || contract.status === activeFilter.toLowerCase();
    const contractorName = contract.contractor?.name || "";
    const contractorEmail = contract.contractor?.email || "";
    const matchesSearch =
      contractorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contractorEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (contract.title || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-secondary">
        <Loader />
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-2 px-3 md:px-8 md:py-5 pb-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-accent mb-1">
            Contracts
          </h1>
          <p className="text-sm text-accent/60">
            Create and manage contracts for your contractors
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-full font-semibold text-sm hover:bg-primary/90 shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          Create Contract
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Filters + Search */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter
                  ? "bg-primary text-white shadow-md"
                  : "bg-tertiary text-accent hover:bg-accent/5"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="relative w-full lg:w-80 bg-tertiary rounded-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
          <Input
            type="text"
            placeholder="Search by contractor or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 bg-tertiary border-accent/10 text-accent placeholder:text-accent focus:border-primary focus:ring-primary"
          />
        </div>
      </div>

      {/* Empty */}
      {filteredContracts.length === 0 && !error ? (
        <Card className="bg-tertiary rounded-xl md:rounded-3xl">
          <CardContent className="flex flex-col items-center text-center py-16 gap-4">
            <FileX className="w-10 h-10 text-accent/20" />
            <div>
              <h2 className="text-lg font-semibold text-accent">No contracts yet</h2>
              <p className="text-accent/50 text-sm mt-1">
                Click &quot;Create Contract&quot; to upload a PDF and assign it to a contractor.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Mobile cards */}
          <div className="lg:hidden space-y-4">
            {filteredContracts.map((contract, idx) => {
              const contractor = contract.contractor;
              return (
                <Card key={contract.id} className="bg-tertiary rounded-xl md:rounded-3xl">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className={`w-10 h-10 ${AVATAR_COLORS[idx % AVATAR_COLORS.length]}`}>
                          {contractor?.avatar_url ? (
                            <img src={contractor.avatar_url} alt={contractor.name} className="object-cover w-full h-full rounded-full" />
                          ) : (
                            <AvatarFallback className="text-white font-bold text-sm">
                              {getInitials(contractor?.name)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <p className="font-semibold text-accent text-sm">{contractor?.name || "Unknown"}</p>
                          <p className="text-xs text-accent/60">{contractor?.email}</p>
                        </div>
                      </div>
                      <Badge className={`${statusColor(contract.status)} border-0 font-semibold text-xs`}>
                        {contract.status}
                      </Badge>
                    </div>

                    <div>
                      <p className="font-medium text-accent text-sm">{contract.title || "Contractor Agreement"}</p>
                      <p className="text-xs text-accent/50 mt-1">
                        Created {formatDate(contract.created_at)}
                        {contract.signed_at && ` · Signed ${formatDate(contract.signed_at)}`}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      {contract.file_url ? (
                        <>
                          <a
                            href={contract.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                          >
                            <FileText className="w-4 h-4" />
                            View PDF
                          </a>
                          <button
                            onClick={() => handleDownload(contract.file_url, contract.title)}
                            className="flex items-center justify-center gap-2 px-3 py-2 border border-accent/20 text-accent rounded-lg text-sm font-medium hover:bg-accent/5 transition-colors"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <p className="text-xs text-accent/40 italic">No file uploaded</p>
                      )}
                      <button
                        onClick={() => handleDelete(contract.id)}
                        disabled={deletingId === contract.id}
                        className="flex items-center justify-center px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {deletingId === contract.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Desktop table */}
          <div className="hidden lg:block bg-tertiary rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-accent/10">
                  <th className="text-left p-4 text-accent/70 font-semibold uppercase text-xs">Contractor</th>
                  <th className="text-left p-4 text-accent/70 font-semibold uppercase text-xs">Title</th>
                  <th className="text-left p-4 text-accent/70 font-semibold uppercase text-xs">Status</th>
                  <th className="text-left p-4 text-accent/70 font-semibold uppercase text-xs">Created</th>
                  <th className="text-left p-4 text-accent/70 font-semibold uppercase text-xs">Signed</th>
                  <th className="text-right p-4 text-accent/70 font-semibold uppercase text-xs">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredContracts.map((contract, idx) => {
                  const contractor = contract.contractor;
                  return (
                    <tr key={contract.id} className="border-b border-accent/10 hover:bg-accent/5 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className={`w-9 h-9 ${AVATAR_COLORS[idx % AVATAR_COLORS.length]}`}>
                            {contractor?.avatar_url ? (
                              <img src={contractor.avatar_url} alt={contractor.name} className="object-cover w-full h-full rounded-full" />
                            ) : (
                              <AvatarFallback className="text-white font-bold text-xs">
                                {getInitials(contractor?.name)}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div>
                            <p className="font-semibold text-accent text-sm">{contractor?.name || "Unknown"}</p>
                            <p className="text-xs text-accent/60">{contractor?.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-accent">{contract.title || "Contractor Agreement"}</td>
                      <td className="p-4">
                        <Badge className={`${statusColor(contract.status)} border-0 font-semibold text-xs capitalize`}>
                          {contract.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-accent/70">{formatDate(contract.created_at)}</td>
                      <td className="p-4 text-sm text-accent/70">{contract.signed_at ? formatDate(contract.signed_at) : "—"}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          {contract.file_url && (
                            <>
                              <a
                                href={contract.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
                                title="View PDF"
                              >
                                <FileText className="w-4 h-4 text-primary" />
                              </a>
                              <button
                                onClick={() => handleDownload(contract.file_url, contract.title)}
                                className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
                                title="Download PDF"
                              >
                                <Download className="w-4 h-4 text-accent/60" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleDelete(contract.id)}
                            disabled={deletingId === contract.id}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500 disabled:opacity-50"
                            title="Delete"
                          >
                            {deletingId === contract.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {modalOpen && (
        <CreateContractModal
          onClose={() => setModalOpen(false)}
          onSuccess={() => load()}
        />
      )}
    </main>
  );
}
