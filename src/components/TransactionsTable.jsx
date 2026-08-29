"use client";

import React, { useState } from "react";
import { Table, Chip, Button, Tooltip } from "@heroui/react";
import { Copy, Check } from "@gravity-ui/icons";

export default function TransactionsTable({ transactions = [] }) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusChip = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return (
          <Chip
            size="sm"
            className="border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 backdrop-blur-md font-medium"
          >
            Paid
          </Chip>
        );
      case "unpaid":
      case "failed":
        return (
          <Chip
            size="sm"
            className="border border-rose-500/30 bg-rose-500/10 text-rose-400 backdrop-blur-md font-medium"
          >
            Failed
          </Chip>
        );
      default:
        return (
          <Chip
            size="sm"
            className="border border-amber-500/30 bg-amber-500/10 text-amber-400 backdrop-blur-md font-medium"
          >
            {status || "Pending"}
          </Chip>
        );
    }
  };

  return (
    <div className="w-full space-y-6 p-6 bg-[#0f172a]/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Payment <span className="text-[#8dd0f2]">Transactions</span>
          </h2>
          <span className="text-xs text-gray-400">
            Total Records: {transactions.length}
          </span>
        </div>
      </div>

      {/* Glassy Table Container */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#001321]/30 backdrop-blur-md">
        <Table className="w-full text-left">
          <Table.ScrollContainer>
            <Table.Content aria-label="Transactions Table">
              <Table.Header className="bg-[#0f172a]/60 border-b border-white/10">
                <Table.Column className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  USER EMAIL
                </Table.Column>
                <Table.Column className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  PLAN
                </Table.Column>
                <Table.Column className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  SESSION ID
                </Table.Column>
                <Table.Column className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  STATUS
                </Table.Column>
                <Table.Column className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  DATE & TIME
                </Table.Column>
              </Table.Header>

              <Table.Body>
                {transactions.length === 0 ? (
                  <Table.Row>
                    <Table.Cell
                      colSpan={5}
                      className="text-center py-12 text-gray-400"
                    >
                      No transactions found.
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  transactions.map((tx) => (
                    <Table.Row
                      key={tx._id}
                      className="border-b border-white/5 hover:bg-white/[0.03] transition-colors duration-200"
                    >
                      {/* User Email */}
                      <Table.Cell className="py-5 px-4">
                        <span className="font-semibold text-sm text-gray-100">
                          {tx.userEmail}
                        </span>
                      </Table.Cell>

                      {/* Subscription Plan */}
                      <Table.Cell className="py-5 px-4">
                        <Chip
                          size="sm"
                          className="bg-[#001321]/60 border border-[#8dd0f2]/30 text-[#8dd0f2] text-xs font-semibold uppercase tracking-wide"
                        >
                          {tx.plan}
                        </Chip>
                      </Table.Cell>

                      {/* Session ID with Copy Button */}
                      <Table.Cell className="py-5 px-4">
                        <div className="flex items-center gap-2 max-w-xs">
                          <span className="text-xs text-gray-400 font-mono truncate">
                            {tx.sessionId}
                          </span>
                          <Tooltip
                            content={
                              copiedId === tx.sessionId
                                ? "Copied!"
                                : "Copy Session ID"
                            }
                          >
                            <Button
                              size="sm"
                              isIconOnly
                              onClick={() => handleCopy(tx.sessionId)}
                              className="h-7 w-7 border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 transition"
                            >
                              {copiedId === tx.sessionId ? (
                                <Check className="size-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="size-3.5 text-gray-400" />
                              )}
                            </Button>
                          </Tooltip>
                        </div>
                      </Table.Cell>

                      {/* Payment Status */}
                      <Table.Cell className="py-5 px-4">
                        {getStatusChip(tx.paymentStatus)}
                      </Table.Cell>

                      {/* Creation Date */}
                      <Table.Cell className="py-5 px-4">
                        <span className="text-xs text-gray-400">
                          {tx.createdAt}
                        </span>
                      </Table.Cell>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>
    </div>
  );
}
