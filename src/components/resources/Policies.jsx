"use client";

import { useEffect, useMemo, useState } from "react";
import { FileText, Signature, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmptyPolicy from "./EmptyPolicy";

const filters = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Legal",
    value: "legal",
  },
  {
    label: "Editorial",
    value: "editorial",
  },
  {
    label: "Privacy",
    value: "privacy",
  },
];

const policies = [
  {
    id: 1,
    title: "Content Security Policy",
    description: "Protect sensitive value of policy and related policies.",
    updated: "March 5, 2024",
    file: "pdf",
    type: "legal",
  },
  {
    id: 2,
    title: "Contractor Agreement",
    description: "Keep out what cut over confirms and different data.",
    updated: "April 2, 2024",
    file: "pdf",
    type: "legal",
  },
  {
    id: 3,
    title: "Data Privacy Policy",
    description: "Create clear place to security review.",
    updated: "January 23, 2024",
    file: "doc",
    type: "privacy",
  },
  {
    id: 4,
    title: "Editorial Guidelines",
    description: "Review & diverse key competing general primary rules.",
    updated: "February 17, 2024",
    file: "doc",
    type: "editorial",
  },
  {
    id: 5,
    title: "Payment & Invoicing Terms",
    description: "Ensure processes, safe and secure your organization",
    updated: "February 17, 2024",
    file: "pdf",
    type: "privacy",
  },
  {
    id: 6,
    title: "Review & Revision Protocols",
    description: "Understand & reassure your security risk.",
    updated: "February 17, 2024",
    file: "doc",
    type: "editorial",
  },
];

const Policies = () => {
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  const [filterItem, setFilterItem] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPolicies = useMemo(() => {
    return policies.filter((policy) => {
      const matchesFilter = filterItem === "all" || policy.type === filterItem;

      const matchesSearch = policy.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [filterItem, searchTerm]);

  useEffect(() => {
    if (
      selectedPolicy &&
      !filteredPolicies.find((p) => p.id === selectedPolicy.id)
    ) {
      setSelectedPolicy(null);
    }
  }, [filteredPolicies, selectedPolicy]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-accent">Policy Library</h2>
      <div className="">
        <div className="lg:grid lg:grid-cols-12 pb-4 bg-tertiary/70 rounded-2xl">
          <div className="lg:col-span-8 p-3">
            <div className="flex justify-between items-center border-b flex-col md:flex-row">
              <div className="flex flex-row gap-2 px-2 pb-2">
                {filters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setFilterItem(filter.value)}
                    className={`px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition cursor-pointer ${
                      filterItem === filter.value
                        ? "bg-white text-primary font-bold shadow-md"
                        : "text-accent hover:bg-accent/30"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              <div className="pb-2">
                <div className="bg-white shadow-md flex gap-2 items-center rounded-full px-3 md:py-1">
                  <Search className="w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={searchTerm}
                    placeholder="Search"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-8 text-sm text-slate-500 outline-none transition"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2 mt-2">
              {filteredPolicies.map((policy) => (
                <div
                  key={policy.id}
                  className="bg-white rounded-xl shadow-lg transition p-4"
                >
                  <div className="space-y-4">
                    <div className="flex gap-3 pb-3 border-b border-gray-300">
                      <div className="flex items-start">
                        {policy.file === "pdf" ? (
                          <span className="bg-red-500 shadow-md text-white rounded px-3 py-2 flex flex-col items-center">
                            <Signature className="w-4 h-4" />
                            <p className="text-[10px] uppercase font-semibold mt-0.5">
                              {policy.file}
                            </p>
                          </span>
                        ) : (
                          <span className="bg-blue-500 shadow-md text-white rounded px-3 py-2 flex flex-col items-center">
                            <FileText className="w-4 h-4" />
                            <p className="text-[10px] uppercase font-semibold mt-0.5">
                              {policy.file}
                            </p>
                          </span>
                        )}
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-accent">
                          {policy.title}
                        </h2>
                        <p className="text-sm text-accent/90">
                          {policy.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs md:text-sm text-gray-600">
                      <span>Last Updated {policy.updated}</span>
                      <Button
                        className="text-white cursor-pointer"
                        onClick={() => setSelectedPolicy(policy)}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedPolicy ? (
            <div className="hidden lg:grid lg:col-span-4 space-y-4 relative bg-tertiary p-4 rounded-2xl shadow-lg">
              <X
                className="w-4 h-4 text-slate-900 cursor-pointer absolute right-3 top-6"
                onClick={() => setSelectedPolicy(null)}
              />

              <h3 className="text-accent text-2xl font-semibold">
                {selectedPolicy.title}
              </h3>
              <p className="text-sm text-accent">
                Last updated {selectedPolicy.updated}
              </p>

              <div className="h-[420px] bg-secondary rounded-lg overflow-hidden">
                <iframe src="/sample.pdf" className="w-full h-full" />
              </div>

              <div className="flex justify-between gap-2">
                <Button
                  className="flex-1 bg-gray-300 text-accent hover:bg-gray-400/60 shadow-md"
                  onClick={() => setSelectedPolicy(null)}
                >
                  Back to Library
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => window.open("/sample.pdf", "_blank")}
                >
                  Download
                </Button>
              </div>
            </div>
          ) : (
            <EmptyPolicy />
          )}
        </div>

        {selectedPolicy && (
          <div className="fixed inset-0 z-50 flex items-end transition-transform duration-300 ease-out lg:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setSelectedPolicy(null)}
            />

            <div className="relative bg-tertiary w-full rounded-t-3xl p-5 max-h-[85vh] overflow-y-auto shadow-2xl animate-slideUp">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-accent">
                    {selectedPolicy.title}
                  </h3>
                  <p className="text-sm text-accent/70">
                    Last updated {selectedPolicy.updated}
                  </p>
                </div>

                <button onClick={() => setSelectedPolicy(null)}>
                  <X className="w-5 h-5 text-slate-900 cursor-pointer" />
                </button>
              </div>

              <div className="h-[350px] w-full bg-secondary rounded-lg overflow-hidden mt-4">
                <iframe src="/sample.pdf" className="w-full h-full" />
              </div>

              <div className="flex gap-3 mt-4">
                <Button
                  className="flex-1 bg-gray-300 text-accent hover:bg-gray-400/70"
                  onClick={() => setSelectedPolicy(null)}
                >
                  Back to Library
                </Button>

                <Button
                  className="flex-1"
                  onClick={() => window.open("/sample.pdf", "_blank")}
                >
                  Download
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Policies;
