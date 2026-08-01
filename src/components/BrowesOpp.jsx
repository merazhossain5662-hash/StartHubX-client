"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Chip } from "@heroui/react";
import { Globe, Clock, Calendar, Magnifier } from "@gravity-ui/icons";
import getDateStatus from "@/lib/actions/getDateStatus";
import { useRouter } from "next/navigation";
import PaginationBar from "./PaginationBar"; // Import the pagination component

const WORK_TYPES = ["Remote", "Onsite", "Hybrid"];

const parseParamArray = (param) => {
  if (!param) return [];
  if (Array.isArray(param)) return param;
  return param.split(",").filter(Boolean);
};

const BrowesOpp = ({ oppData = [], searchQ }) => {
  const router = useRouter();

  // Initialize state from searchParams
  const [searchTerm, setSearchTerm] = useState(searchQ?.search || "");
  const [selectedWorkTypes, setSelectedWorkTypes] = useState(() =>
    parseParamArray(searchQ?.workType),
  );
  const [selectedIndustries, setSelectedIndustries] = useState(() =>
    parseParamArray(searchQ?.industry),
  );

  const [currentPage, setCurrentPage] = useState(Number(searchQ?.page) || 1);
  const [itemsPerPage, setItemsPerPage] = useState(
    Number(searchQ?.perPage) || 8,
  );

  const handleFilterChange = (setter, value) => {
    setter(value);
    setCurrentPage(1);
  };

  // Sync state with URL search parameters
  useEffect(() => {
    const sp = new URLSearchParams();
    if (searchTerm) sp.set("search", searchTerm);
    if (selectedWorkTypes.length > 0) {
      sp.set(
        "workType",
        Array.isArray(selectedWorkTypes)
          ? selectedWorkTypes.join(",")
          : selectedWorkTypes,
      );
    }
    if (selectedIndustries.length > 0) {
      sp.set(
        "industry",
        Array.isArray(selectedIndustries)
          ? selectedIndustries.join(",")
          : selectedIndustries,
      );
    }
    if (currentPage > 1) sp.set("page", String(currentPage));
    if (itemsPerPage !== 6) sp.set("perPage", String(itemsPerPage));

    const path = `?${sp.toString()}`;
    router.push(path, { scroll: false });
  }, [
    searchTerm,
    selectedWorkTypes,
    selectedIndustries,
    currentPage,
    itemsPerPage,
    router,
  ]);

  const INDUSTRIES = useMemo(() => {
    const extracted = Array.from(
      new Set(oppData.map((item) => item?.industry).filter(Boolean)),
    );
    return extracted.length > 0 ? extracted : [];
  }, [oppData]);

  // Toggle helper for checkbox selections
  const toggleSelection = (item, list, setList) => {
    const updatedList = list.includes(item)
      ? list.filter((i) => i !== item)
      : [...list, item];
    handleFilterChange(setList, updatedList);
  };

  // Clear all filters handler
  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedWorkTypes([]);
    setSelectedIndustries([]);
    setCurrentPage(1);
  };

  const hasActiveFilters = Boolean(
    searchTerm.trim() ||
    selectedWorkTypes.length > 0 ||
    selectedIndustries.length > 0,
  );

  const totalItems = oppData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  // // Slice opportunities for current page slice
  // const currentOppData = useMemo(() => {
  //   return oppData.slice(startIndex, startIndex + itemsPerPage);
  // }, [oppData, startIndex, itemsPerPage]);

  return (
    <div className="bg-[#001321] text-white min-h-screen py-10 px-4 sm:px-8 relative overflow-hidden">
      {/* Background glow spots */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#8dd0f2]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Browse <span className="text-[#8dd0f2]">Opportunities</span>
          </h1>
          <p className="text-sm text-gray-400">
            {totalItems} opportunities available · Find your perfect startup
            role
          </p>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Glassy Sidebar Filters */}
          <aside className="bg-[#0f172a]/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-6 shadow-xl lg:sticky lg:top-6">
            <h2 className="text-lg font-semibold text-gray-200">Filters</h2>

            {/* Glass Search Input */}
            <div className="relative">
              <Magnifier className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search roles, skills..."
                value={searchTerm}
                onChange={(e) =>
                  handleFilterChange(setSearchTerm, e.target.value)
                }
                className="w-full pl-9 pr-4 py-2 bg-[#001321]/50 backdrop-blur-sm border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-[#8dd0f2]/80 transition placeholder:text-gray-500 shadow-inner"
              />
            </div>

            {/* Work Type Checkboxes */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Work Type
              </h3>
              <div className="space-y-2">
                {WORK_TYPES.map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-3 text-sm text-gray-300 hover:text-white cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={selectedWorkTypes.includes(type)}
                      onChange={() =>
                        toggleSelection(
                          type,
                          selectedWorkTypes,
                          setSelectedWorkTypes,
                        )
                      }
                      className="rounded bg-[#001321]/60 border-gray-700 text-[#8dd0f2] focus:ring-[#8dd0f2]/50 accent-[#8dd0f2] size-4 cursor-pointer"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Dynamic Industry Checkboxes */}
            <div className="space-y-3 pt-2 border-t border-white/5">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Industry
              </h3>
              <div className="space-y-2">
                {INDUSTRIES.map((industry) => (
                  <label
                    key={industry}
                    className="flex items-center gap-3 text-sm text-gray-300 hover:text-white cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={selectedIndustries.includes(industry)}
                      onChange={() =>
                        toggleSelection(
                          industry,
                          selectedIndustries,
                          setSelectedIndustries,
                        )
                      }
                      className="rounded bg-[#001321]/60 border-gray-700 text-[#8dd0f2] focus:ring-[#8dd0f2]/50 accent-[#8dd0f2] size-4 cursor-pointer"
                    />
                    {industry}
                  </label>
                ))}
              </div>
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="w-full py-2 px-4 rounded-xl text-xs font-medium border border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition duration-300"
              >
                ✕ Clear Filters
              </button>
            )}
          </aside>

          {/* Cards Display Grid & Pagination */}
          <main className="lg:col-span-3 space-y-6">
            {oppData.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {oppData.map((role) => {
                  const expDate = getDateStatus(role.date);

                  return (
                    <div
                      key={role._id}
                      className="bg-[#0f172a]/40 backdrop-blur-md shadow-2xl border border-white/10 hover:border-[#8dd0f2]/40 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1 transition duration-300 space-y-6"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-semibold text-gray-100 text-base line-clamp-1">
                            {role.Title}
                          </h3>

                          <Chip
                            size="sm"
                            className={`text-xs border shrink-0 backdrop-blur-sm ${
                              expDate < 0
                                ? "border-rose-500/40 bg-rose-500/10 text-rose-400"
                                : expDate < 3
                                  ? "border-amber-500/40 bg-amber-500/10 text-amber-400"
                                  : "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                            }`}
                          >
                            {expDate < 0 ? "Expired" : `${expDate}d left`}
                          </Chip>
                        </div>

                        <p className="text-xs text-[#8dd0f2] font-light">
                          {role.startupName || "Startup"}
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                          {role.Skills?.map((skill, idx) => (
                            <Chip
                              key={idx}
                              size="sm"
                              variant="flat"
                              className="bg-[#001321]/50 text-[#8dd0f2] border border-[#8dd0f2]/30 text-[11px] font-medium backdrop-blur-sm"
                            >
                              {skill}
                            </Chip>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4 pt-2 border-t border-white/5">
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-400">
                          <div className="flex items-center gap-1">
                            <Globe size={14} className="text-gray-500" />
                            <span className="capitalize">
                              {role.state?.toLowerCase()}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <Clock size={14} className="text-gray-500" />
                            <span className="capitalize">
                              {role.CommitmentLevel?.toLowerCase()}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <Calendar size={14} className="text-gray-500" />
                            <span>{role.date}</span>
                          </div>
                        </div>

                        <button
                          disabled={expDate < 0}
                          className="w-full py-2 px-4 rounded-xl text-xs font-semibold border border-[#8dd0f2]/40 bg-[#8dd0f2]/10 backdrop-blur-md text-[#8dd0f2] hover:bg-[#8dd0f2]/20 hover:border-[#8dd0f2] hover:shadow-[0_0_15px_rgba(141,208,242,0.2)] transition duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          {expDate < 0
                            ? "Opportunity Expired"
                            : "Login to Apply"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-[#0f172a]/20 backdrop-blur-md border border-dashed border-white/10 rounded-2xl p-12 text-center">
                <p className="text-gray-400 text-sm">
                  No open positions match your current search/filters.
                </p>
              </div>
            )}

            {/* Reusable Pagination Component */}
            <PaginationBar
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              startIndex={startIndex}
              endIndex={endIndex}
              itemsPerPage={itemsPerPage}
              onPageChange={(page) => setCurrentPage(page)}
              onPageSizeChange={(size) => {
                setItemsPerPage(size);
                setCurrentPage(1);
              }}
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default BrowesOpp;
