"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getUsersActiveStatus } from "@/actions/user-status"; // Adjust import path
import {
  Table,
  Avatar,
  Chip,
  Button,
  Spinner,
  Input,
  Modal,
} from "@heroui/react";
import {
  ChevronLeft,
  ChevronRight,
  Ban,
  CircleCheck,
  Magnifier,
  TrashBin,
  ArrowRotateLeft,
  TriangleExclamation,
} from "@gravity-ui/icons";

export default function ManageUsersTable() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Maps userId -> boolean (active session status)
  const [activeMap, setActiveMap] = useState({});

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const limit = 10;
  const totalPages = Math.ceil(total / limit) || 1;

  const fetchUsers = async () => {
    setLoading(true);

    const queryParams = {
      limit,
      offset: (page - 1) * limit,
      sortBy: "createdAt",
      sortDirection: "desc",
    };

    if (search.trim()) {
      queryParams.searchField = "name";
      queryParams.searchValue = search.trim();
      queryParams.searchOperator = "contains";
    }

    const { data } = await authClient.admin.listUsers({
      query: queryParams,
    });

    if (data) {
      setUsers(data.users);
      setTotal(data.total);

      // Fetch active session status for all fetched users
      const userIds = data.users.map((u) => u.id);
      const statuses = await getUsersActiveStatus(userIds);
      setActiveMap(statuses);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const handleBanToggle = async (user) => {
    if (user.banned) {
      await authClient.admin.unbanUser({ userId: user.id });
    } else {
      await authClient.admin.banUser({
        userId: user.id,
        banReason: "Suspended by admin",
      });
    }
    fetchUsers();
  };

  const handleRevokeSessions = async (userId) => {
    await authClient.admin.revokeUserSessions({ userId });
    alert("All sessions for this user have been revoked.");
    fetchUsers();
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) return;

    setIsDeleting(true);
    await authClient.admin.removeUser({ userId: selectedUser.id });
    setIsDeleting(false);
    setIsOpen(false);
    setSelectedUser(null);
    fetchUsers();
  };

  return (
    <div className="w-full space-y-4 p-4">
      {/* Header & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Manage Users</h2>
          <span className="text-xs text-slate-400">Total Users: {total}</span>
        </div>

        <div className="w-full sm:w-72">
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            startContent={<Magnifier className="text-slate-400 size-4" />}
            size="sm"
          />
        </div>
      </div>

      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="User management table">
            <Table.Header>
              <Table.Column>USER</Table.Column>
              <Table.Column>ROLE</Table.Column>
              <Table.Column>PLAN</Table.Column>
              <Table.Column>STATUS</Table.Column>
              <Table.Column>ACTIONS</Table.Column>
            </Table.Header>
            <Table.Body>
              {loading ? (
                <Table.Row>
                  <Table.Cell colSpan={5} className="text-center py-8">
                    <Spinner size="md" />
                  </Table.Cell>
                </Table.Row>
              ) : users.length === 0 ? (
                <Table.Row>
                  <Table.Cell
                    colSpan={5}
                    className="text-center py-8 text-slate-400"
                  >
                    No users found matching your query.
                  </Table.Cell>
                </Table.Row>
              ) : (
                users.map((user) => {
                  const isPremium =
                    user.plan?.toLowerCase() === "premium" ||
                    user.plan?.toLowerCase() === "pro";
                  const isOnline = Boolean(activeMap[user.id]);

                  return (
                    <Table.Row key={user.id}>
                      {/* User Info */}
                      <Table.Cell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <Avatar.Image alt={user.name} src={user.image} />
                            <Avatar.Fallback className="bg-[#204561] text-white">
                              {user.name?.charAt(0).toUpperCase()}
                            </Avatar.Fallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-semibold text-sm text-slate-200">
                              {user.name}
                            </span>
                            <span className="text-xs text-slate-400">
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </Table.Cell>

                      {/* Role */}
                      <Table.Cell>
                        <Chip
                          size="sm"
                          variant="secondary"
                          className="capitalize"
                        >
                          {user.role || "User"}
                        </Chip>
                      </Table.Cell>

                      {/* Plan Display */}
                      <Table.Cell>
                        <Chip
                          size="sm"
                          variant="soft"
                          className={
                            isPremium
                              ? "capitalize bg-amber-500/10 text-amber-300 border border-amber-500/40 shadow-xs"
                              : "capitalize bg-[#1e4360]/50 text-[#c4e1f0] border border-[#6998AB]/30"
                          }
                        >
                          {user.plan || "Free"}
                        </Chip>
                      </Table.Cell>

                      {/* Status Column: Banned > Online > Offline */}
                      <Table.Cell>
                        {user.banned ? (
                          <Chip size="sm" color="danger" variant="soft">
                            Banned
                          </Chip>
                        ) : isOnline ? (
                          <Chip
                            size="sm"
                            color="success"
                            variant="soft"
                            className="flex items-center gap-1.5"
                          >
                            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Online
                          </Chip>
                        ) : (
                          <Chip
                            size="sm"
                            variant="secondary"
                            className="text-slate-400"
                          >
                            Offline
                          </Chip>
                        )}
                      </Table.Cell>

                      {/* User Actions */}
                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant={user.banned ? "secondary" : "danger"}
                            onClick={() => handleBanToggle(user)}
                            title={user.banned ? "Unban User" : "Ban User"}
                          >
                            {user.banned ? (
                              <CircleCheck className="size-4" />
                            ) : (
                              <Ban className="size-4" />
                            )}
                            {user.banned ? "Unban" : "Ban"}
                          </Button>

                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRevokeSessions(user.id)}
                            title="Revoke All User Sessions"
                          >
                            <ArrowRotateLeft className="size-4 text-slate-400" />
                          </Button>

                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => openDeleteModal(user)}
                            title="Delete User"
                          >
                            <TrashBin className="size-4" />
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>

        <Table.Footer>
          <div className="flex items-center justify-between p-3 border-t border-[#224764]/40">
            <span className="text-xs text-slate-400">
              Page {page} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="secondary"
                disabled={page <= 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              >
                <ChevronLeft />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                disabled={page >= totalPages}
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
        </Table.Footer>
      </Table>

      {/* HeroUI Delete Modal */}
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop className="bg-black/60 backdrop-blur-xs">
          <Modal.Container>
            <Modal.Dialog className="bg-[#0f2434] border border-[#224764] text-white">
              <Modal.CloseTrigger />
              <Modal.Header className="flex items-center gap-2 text-red-400">
                <TriangleExclamation className="size-5" />
                <Modal.Heading>Confirm User Deletion</Modal.Heading>
              </Modal.Header>
              <Modal.Body className="py-4 text-sm text-slate-300">
                Are you sure you want to permanently delete{" "}
                <span className="font-bold text-white">
                  {selectedUser?.name || selectedUser?.email}
                </span>
                ? This action cannot be undone.
              </Modal.Body>
              <Modal.Footer className="flex justify-end gap-2 pt-2 border-t border-[#224764]/40">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? <Spinner size="sm" /> : "Delete Permanently"}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}
