"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Table, Avatar, Chip, Button, Spinner, Select } from "@heroui/react";
import {
  ChevronLeft,
  ChevronRight,
  Ban,
  CircleCheck,
  TrashBin,
} from "@gravity-ui/icons";

export default function ManageUsersTable() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const limit = 10;
  const totalPages = Math.ceil(total / limit) || 1;

  const fetchUsers = async () => {
    setLoading(true);
    const { data } = await authClient.admin.listUsers({
      query: {
        limit,
        offset: (page - 1) * limit,
        sortBy: "createdAt",
        sortDirection: "desc",
      },
    });

    if (data) {
      setUsers(data.users);
      setTotal(data.total);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleRoleChange = async (userId, newRole) => {
    await authClient.admin.setRole({
      userId,
      role: newRole,
    });
    fetchUsers();
  };

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
    alert("User sessions revoked successfully");
  };

  return (
    <div className="w-full space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Manage Users</h2>
        <span className="text-xs text-slate-400">Total Users: {total}</span>
      </div>

      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="User management table">
            <Table.Header>
              <Table.Column>USER</Table.Column>
              <Table.Column>ROLE</Table.Column>
              <Table.Column>STATUS</Table.Column>
              <Table.Column>ACTIONS</Table.Column>
            </Table.Header>
            <Table.Body>
              {loading ? (
                <Table.Row>
                  <Table.Cell colSpan={4} className="text-center py-8">
                    <Spinner size="md" />
                  </Table.Cell>
                </Table.Row>
              ) : (
                users.map((user) => (
                  <Table.Row key={user.id}>
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

                    <Table.Cell>
                      <Select
                        size="sm"
                        aria-label="Change Role"
                        value={user.role?.toLowerCase() || "collaborator"}
                        onChange={(e) =>
                          handleRoleChange(user.id, e.target.value)
                        }
                        className="w-32 text-xs"
                      >
                        <option value="collaborator">Collaborator</option>
                        <option value="founder">Founder</option>
                        <option value="admin">Admin</option>
                      </Select>
                    </Table.Cell>

                    <Table.Cell>
                      <Chip
                        size="sm"
                        color={user.banned ? "danger" : "success"}
                        variant="soft"
                      >
                        {user.banned ? "Banned" : "Active"}
                      </Chip>
                    </Table.Cell>

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
                          title="Revoke Sessions"
                        >
                          <TrashBin className="size-4 text-slate-400" />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
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
    </div>
  );
}
