"use client";
import { useState, useEffect } from "react";
import { fetchAllClientsSocials } from "@/lib/queries/socials";
import { PLATFORMS } from "@/constants/admin/social";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Loader from "@/components/common/Loader";

const AVATAR_COLORS = [
  "bg-purple-500", "bg-blue-500", "bg-pink-500",
  "bg-green-500", "bg-orange-500", "bg-indigo-500",
];

function platformLabel(p) {
  return p.charAt(0).toUpperCase() + p.slice(1);
}

export default function AdminClientsPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchAllClientsSocials()
      .then((data) => {
        const map = new Map();
        data.forEach((row) => {
          const clientId = row.client?.id;
          if (!clientId) return;
          if (!map.has(clientId)) map.set(clientId, { client: row.client, platforms: [] });
          map.get(clientId).platforms.push(row);
        });
        setRows(Array.from(map.values()));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = rows.filter(({ client }) => {
    const q = searchQuery.toLowerCase();
    return (
      client?.name?.toLowerCase().includes(q) ||
      client?.email?.toLowerCase().includes(q)
    );
  });

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
          <h1 className="text-2xl sm:text-3xl font-bold text-accent mb-1">Client Socials</h1>
          <p className="text-sm text-accent/60">Connected social platforms for each client</p>
        </div>

        <div className="relative w-full lg:w-80 bg-tertiary rounded-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
          <Input
            type="text"
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 bg-tertiary border-accent/10 text-accent placeholder:text-accent focus:border-primary focus:ring-primary"
          />
        </div>

        {/* Mobile cards */}
        <div className="lg:hidden space-y-3">
          {filtered.map(({ client, platforms }, idx) => (
            <div key={client.id} className="bg-tertiary rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className={`w-10 h-10 ${AVATAR_COLORS[idx % AVATAR_COLORS.length]}`}>
                  {client.avatar_url ? <AvatarImage src={client.avatar_url} /> : (
                    <AvatarFallback className="text-white text-sm font-bold">
                      {client.name?.charAt(0)?.toUpperCase() || "?"}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="font-semibold text-accent text-sm">{client.name}</p>
                  <p className="text-xs text-accent/60">{client.email}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map((p) => {
                  const row = platforms.find((r) => r.platform === p);
                  return (
                    <span key={p} className={`text-xs px-3 py-1 rounded-full font-medium ${
                      row?.connected ? "bg-green-100 text-green-700" : "bg-accent/10 text-accent/40"
                    }`}>
                      {platformLabel(p)}{row?.connected && row?.handle ? ` · @${row.handle}` : ""}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 bg-tertiary rounded-2xl">
              <p className="text-accent/60 text-sm">No clients found</p>
            </div>
          )}
        </div>

        {/* Desktop table */}
        <div className="hidden lg:block bg-tertiary rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-accent/10">
                <th className="text-left p-4 text-accent/70 font-semibold uppercase text-xs">Client</th>
                {PLATFORMS.map((p) => (
                  <th key={p} className="text-left p-4 text-accent/70 font-semibold uppercase text-xs">
                    {platformLabel(p)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(({ client, platforms }, idx) => (
                <tr key={client.id} className="border-b border-accent/10 hover:bg-accent/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className={`w-9 h-9 ${AVATAR_COLORS[idx % AVATAR_COLORS.length]}`}>
                        {client.avatar_url ? <AvatarImage src={client.avatar_url} /> : (
                          <AvatarFallback className="text-white text-xs font-bold">
                            {client.name?.charAt(0)?.toUpperCase() || "?"}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <p className="font-semibold text-accent text-sm">{client.name}</p>
                        <p className="text-xs text-accent/50">{client.email}</p>
                      </div>
                    </div>
                  </td>
                  {PLATFORMS.map((p) => {
                    const row = platforms.find((r) => r.platform === p);
                    return (
                      <td key={p} className="p-4">
                        {row?.connected ? (
                          <div>
                            <span className="inline-block text-xs font-medium text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
                              Connected
                            </span>
                            {row?.handle && <p className="text-xs text-accent/50 mt-1">@{row.handle}</p>}
                          </div>
                        ) : (
                          <span className="text-xs text-accent/30">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-accent/60">No clients found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
