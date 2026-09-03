"use client";

import { useEffect, useState } from "react";
import { Table, Avatar, Chip, Button, Input, Pagination } from "@heroui/react";
import { Magnifier, CircleCheck, CircleXmark } from "@gravity-ui/icons";
import { useRouter, useSearchParams } from "next/navigation";

const ROWS_PER_PAGE = 8;

export default function StartupsTable({ startups = [] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [page, setPage] = useState(1);

  const handleFilterChange = (setter, value) => {
    setter(value);
    setPage(1);
  };

  const handleApprove = async (startupId) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URI}/api/admin/startups/${startupId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "approved" }),
      },
    );
    if (response.ok) {
      router.refresh();
    }
  };

  const handleRemove = async (startupId) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URI}/api/admin/startups/${startupId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (response.ok) {
      router.refresh();
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      const sp = new URLSearchParams();
      if (search.trim()) {
        sp.set("search", search.trim());
      }
      const path = `?${sp.toString()}`;
      router.push(path, { scroll: false });
    }, 300);

    return () => clearTimeout(handler);
  }, [search, router]);

  // Calculate pagination boundaries
  const totalPages = Math.ceil(startups.length / ROWS_PER_PAGE) || 1;
  const start = (page - 1) * ROWS_PER_PAGE;
  const paginatedItems = startups.slice(start, start + ROWS_PER_PAGE);

  const getStatusChip = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return (
          <Chip size="sm" color="success" variant="soft">
            Approved
          </Chip>
        );
      case "rejected":
        return (
          <Chip size="sm" color="danger" variant="soft">
            Rejected
          </Chip>
        );
      case "pending":
      default:
        return (
          <Chip size="sm" color="warning" variant="soft">
            Pending
          </Chip>
        );
    }
  };

  return (
    <div className="w-full space-y-6 p-6 bg-[#0f172a]/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Manage <span className="text-[#8dd0f2]">Startups</span>
          </h2>
          <span className="text-xs text-gray-400">
            Total Startups: {startups.length}
          </span>
        </div>

        <div className="relative w-full sm:w-80">
          <Magnifier className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4 pointer-events-none z-10" />
          <Input
            placeholder="Search startup or founder..."
            value={search}
            onChange={(e) => handleFilterChange(setSearch, e.target.value)}
            className="pl-10 bg-[#001321]/50 backdrop-blur-sm border border-white/10 text-gray-200 placeholder:text-gray-500 rounded-xl focus:border-[#8dd0f2]/80 transition shadow-inner"
            size="sm"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#001321]/30 backdrop-blur-md">
        <Table className="w-full text-left">
          <Table.ScrollContainer>
            <Table.Content aria-label="Manage Startups Table">
              <Table.Header className="bg-[#0f172a]/60 border-b border-white/10">
                <Table.Column className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  STARTUP
                </Table.Column>
                <Table.Column className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  FOUNDER
                </Table.Column>
                <Table.Column className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  CATEGORY
                </Table.Column>
                <Table.Column className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  STAGE
                </Table.Column>
                <Table.Column className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  STATUS
                </Table.Column>
                <Table.Column className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  ACTIONS
                </Table.Column>
              </Table.Header>

              <Table.Body>
                {paginatedItems.length === 0 ? (
                  <Table.Row>
                    <Table.Cell
                      colSpan={6}
                      className="text-center py-12 text-gray-400"
                    >
                      No startups found matching your search.
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  paginatedItems.map((item) => (
                    <Table.Row
                      key={item._id}
                      className="border-b border-white/5 hover:bg-white/[0.03] transition-colors duration-200"
                    >
                      {/* Startup Logo & Details */}
                      <Table.Cell className="py-5 px-4">
                        <div className="flex items-center gap-4">
                          {/* Company Logo Badge */}
                          <div className="relative h-14 w-14 shrink-0 rounded-2xl border border-white/15 bg-[#0f172a]/80 p-1.5 shadow-md flex items-center justify-center overflow-hidden">
                            <Avatar className="h-full w-full rounded-xl object-cover">
                              <Avatar.Image
                                alt={item.name}
                                src={item.profileImage}
                                className="object-cover"
                              />
                              <Avatar.Fallback className="bg-[#204561] text-white font-bold text-lg rounded-xl flex items-center justify-center h-full w-full">
                                {item.name?.charAt(0).toUpperCase()}
                              </Avatar.Fallback>
                            </Avatar>
                          </div>

                          <div className="flex flex-col max-w-sm space-y-1">
                            <span className="font-bold text-base text-gray-100 truncate">
                              {item.name}
                            </span>
                            <span className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                              {item.description}
                            </span>
                          </div>
                        </div>
                      </Table.Cell>

                      {/* Founder Email */}
                      <Table.Cell className="py-5 px-4">
                        <span className="text-sm font-medium text-gray-300">
                          {item.FounderEmail}
                        </span>
                      </Table.Cell>

                      {/* Category State */}
                      <Table.Cell className="py-5 px-4">
                        <Chip
                          size="sm"
                          className="bg-[#001321]/60 border border-[#8dd0f2]/30 text-[#8dd0f2] text-xs font-medium"
                        >
                          {item.state}
                        </Chip>
                      </Table.Cell>

                      {/* Funding Stage */}
                      <Table.Cell className="py-5 px-4">
                        <Chip
                          size="sm"
                          className="bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs"
                        >
                          {item.FundingStage}
                        </Chip>
                      </Table.Cell>

                      {/* Status Badge */}
                      <Table.Cell className="py-5 px-4">
                        {getStatusChip(item.status)}
                      </Table.Cell>

                      {/* Action Buttons */}
                      <Table.Cell className="py-5 px-4">
                        <div className="flex items-center gap-2">
                          {item.status !== "approved" && (
                            <Button
                              size="sm"
                              className="border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500 transition duration-300"
                              onClick={() => handleApprove(item._id)}
                              title="Approve Startup"
                            >
                              <CircleCheck className="size-4" />
                            </Button>
                          )}

                          {item.status !== "rejected" && (
                            <Button
                              size="sm"
                              className="border border-rose-500/40 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 hover:border-rose-500 transition duration-300"
                              title="Remove Startup"
                            >
                              <CircleXmark className="size-4" />
                            </Button>
                          )}
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>

          {/* Footer Pagination */}
          <Table.Footer>
            <div className="flex items-center justify-between p-4 bg-[#0f172a]/60 border-t border-white/10">
              <span className="text-xs text-gray-400">
                Showing {startups.length === 0 ? 0 : start + 1} to{" "}
                {Math.min(start + ROWS_PER_PAGE, startups.length)} of{" "}
                {startups.length} entries
              </span>

              <Pagination size="sm">
                <Pagination.Content>
                  <Pagination.Item>
                    <Pagination.Previous
                      isDisabled={page === 1}
                      onPress={() => setPage((p) => Math.max(1, p - 1))}
                    />
                  </Pagination.Item>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <Pagination.Item key={p}>
                        <Pagination.Link
                          isActive={p === page}
                          onPress={() => setPage(p)}
                        >
                          {p}
                        </Pagination.Link>
                      </Pagination.Item>
                    ),
                  )}
                  <Pagination.Item>
                    <Pagination.Next
                      isDisabled={page === totalPages}
                      onPress={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                    />
                  </Pagination.Item>
                </Pagination.Content>
              </Pagination>
            </div>
          </Table.Footer>
        </Table>
      </div>
    </div>
  );
}
