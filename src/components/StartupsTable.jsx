"use client";

import { useEffect, useState } from "react";
import { Table, Avatar, Chip, Button, Input, Pagination } from "@heroui/react";
import { Magnifier, CircleCheck, CircleXmark } from "@gravity-ui/icons";
import { useRouter, useSearchParams } from "next/navigation";

const ROWS_PER_PAGE = 5;

export default function StartupsTable({ startups = [], onUpdateStatus }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [page, setPage] = useState(1);

  // Filter startups by search query
  //   const filteredStartups = startups.filter((item) => {
  //     const term = search.toLowerCase();
  //     return (
  //       item.name?.toLowerCase().includes(term) ||
  //       item.FounderEmail?.toLowerCase().includes(term) ||
  //       item.state?.toLowerCase().includes(term)
  //     );
  //   });

  useEffect(() => {
    const sp = new URLSearchParams();
    if (search) {
      console.log("Setting search param:", search);
      sp.set("search", search);
    }
    const path = `?${sp.toString()}`;
    console.log("Navigating to:", path);
    router.push(path);
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
    <div className="w-full space-y-4 p-4">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Manage Startups</h2>
          <span className="text-xs text-slate-400">
            Total Startups: {startups.length}
          </span>
        </div>

        <div className="relative w-full sm:w-72">
          <Magnifier className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4 pointer-events-none z-10" />
          <Input
            placeholder="Search startup or founder..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-9"
            size="sm"
          />
        </div>
      </div>

      {/* Table UI */}
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Manage Startups Table">
            <Table.Header>
              <Table.Column>STARTUP</Table.Column>
              <Table.Column>FOUNDER</Table.Column>
              <Table.Column>CATEGORY</Table.Column>
              <Table.Column>STAGE</Table.Column>
              <Table.Column>STATUS</Table.Column>
              <Table.Column>ACTIONS</Table.Column>
            </Table.Header>

            <Table.Body>
              {paginatedItems.length === 0 ? (
                <Table.Row>
                  <Table.Cell
                    colSpan={6}
                    className="text-center py-8 text-slate-400"
                  >
                    No startups found matching your search.
                  </Table.Cell>
                </Table.Row>
              ) : (
                paginatedItems.map((item) => (
                  <Table.Row key={item._id}>
                    {/* Startup Details */}
                    <Table.Cell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <Avatar.Image
                            alt={item.name}
                            src={item.profileImage}
                          />
                          <Avatar.Fallback className="bg-[#204561] text-white">
                            {item.name?.charAt(0).toUpperCase()}
                          </Avatar.Fallback>
                        </Avatar>
                        <div className="flex flex-col max-w-xs">
                          <span className="font-semibold text-sm text-slate-200 truncate">
                            {item.name}
                          </span>
                          <span className="text-xs text-slate-400 line-clamp-1">
                            {item.description}
                          </span>
                        </div>
                      </div>
                    </Table.Cell>

                    {/* Founder Email */}
                    <Table.Cell>
                      <span className="text-xs text-slate-300">
                        {item.FounderEmail}
                      </span>
                    </Table.Cell>

                    {/* Category State */}
                    <Table.Cell>
                      <Chip size="sm" variant="secondary">
                        {item.state}
                      </Chip>
                    </Table.Cell>

                    {/* Funding Stage */}
                    <Table.Cell>
                      <Chip
                        size="sm"
                        variant="soft"
                        className="bg-amber-500/10 text-amber-300 border border-amber-500/30"
                      >
                        {item.FundingStage}
                      </Chip>
                    </Table.Cell>

                    {/* Status Badge */}
                    <Table.Cell>{getStatusChip(item.status)}</Table.Cell>

                    {/* Placeholder Action Buttons */}
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        {item.status !== "approved" && (
                          <Button
                            size="sm"
                            variant="success"
                            onClick={() =>
                              onUpdateStatus?.(item._id, "approved")
                            }
                            title="Approve Startup"
                          >
                            <CircleCheck className="size-4" />
                          </Button>
                        )}

                        {item.status !== "rejected" && (
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() =>
                              onUpdateStatus?.(item._id, "rejected")
                            }
                            title="Reject Startup"
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
          <div className="flex items-center justify-between p-3 border-t border-[#224764]/40">
            <span className="text-xs text-slate-400">
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
                    onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
                  />
                </Pagination.Item>
              </Pagination.Content>
            </Pagination>
          </div>
        </Table.Footer>
      </Table>
    </div>
  );
}
