"use client";

import { useEffect, useState } from "react";
import {
  Table,
  Avatar,
  Chip,
  Button,
  Input,
  Pagination,
  Spinner,
} from "@heroui/react";
import {
  Magnifier,
  CircleCheck,
  CircleXmark,
  TrashBin,
} from "@gravity-ui/icons";

const ROWS_PER_PAGE = 5;

export default function ManageStartupsTable() {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Fetch startups from backend API
  const fetchStartups = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/startups");
      const data = await res.json();
      setStartups(data || []);
    } catch (err) {
      console.error("Failed to load startups:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStartups();
  }, []);

  // Filter startups based on search input
  const filteredStartups = startups.filter((startup) => {
    const term = search.toLowerCase();
    return (
      startup.name?.toLowerCase().includes(term) ||
      startup.FounderEmail?.toLowerCase().includes(term) ||
      startup.state?.toLowerCase().includes(term)
    );
  });

  // Reset to page 1 when search query changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredStartups.length / ROWS_PER_PAGE) || 1;
  const start = (page - 1) * ROWS_PER_PAGE;
  const paginatedItems = filteredStartups.slice(start, start + ROWS_PER_PAGE);

  // Status Badge Styling Helper
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

  // Status Action Handler
  const handleUpdateStatus = async (startupId, newStatus) => {
    try {
      await fetch(`/api/admin/startups/${startupId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchStartups();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  return (
    <div className="w-full space-y-4 p-4">
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Manage Startups</h2>
          <span className="text-xs text-slate-400">
            Total Startups: {startups.length}
          </span>
        </div>

        <div className="w-full sm:w-72">
          <Input
            placeholder="Search startup or founder..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            startContent={<Magnifier className="text-slate-400 size-4" />}
            size="sm"
          />
        </div>
      </div>

      {/* Startups Table */}
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
              {loading ? (
                <Table.Row>
                  <Table.Cell colSpan={6} className="text-center py-8">
                    <Spinner size="md" />
                  </Table.Cell>
                </Table.Row>
              ) : paginatedItems.length === 0 ? (
                <Table.Row>
                  <Table.Cell
                    colSpan={6}
                    className="text-center py-8 text-slate-400"
                  >
                    No startups found matching search filter.
                  </Table.Cell>
                </Table.Row>
              ) : (
                paginatedItems.map((item) => (
                  <Table.Row key={item._id}>
                    {/* Startup Info */}
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

                    {/* State / Industry Category */}
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

                    {/* Current Status */}
                    <Table.Cell>{getStatusChip(item.status)}</Table.Cell>

                    {/* Action Buttons */}
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        {item.status !== "approved" && (
                          <Button
                            size="sm"
                            variant="success"
                            onClick={() =>
                              handleUpdateStatus(item._id, "approved")
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
                              handleUpdateStatus(item._id, "rejected")
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
              Showing {filteredStartups.length === 0 ? 0 : start + 1} to{" "}
              {Math.min(start + ROWS_PER_PAGE, filteredStartups.length)} of{" "}
              {filteredStartups.length} entries
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
