"use client";

import React from "react";
import { Pagination, Select, ListBox } from "@heroui/react";

const PAGE_SIZE_OPTIONS = [
  { label: "6", value: "6" },
  { label: "12", value: "12" },
  { label: "24", value: "24" },
  { label: "48", value: "48" },
];

const PaginationBar = ({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  itemsPerPage,
  onPageChange,
  onPageSizeChange,
}) => {
  if (totalItems === 0) return null;

  return (
    <div className="bg-[#0f172a]/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl">
      <Pagination className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Summary */}
        <Pagination.Summary className="text-xs text-gray-400 font-normal">
          Showing{" "}
          <strong className="text-gray-200">
            {startIndex + 1}-{endIndex}
          </strong>{" "}
          of <strong className="text-gray-200">{totalItems}</strong> results
        </Pagination.Summary>

        {/* Navigation Controls */}
        <Pagination.Content className="flex items-center gap-1">
          <Pagination.Item>
            <Pagination.Previous
              isDisabled={currentPage === 1}
              onPress={() => onPageChange(currentPage - 1)}
              className="bg-[#001321]/60 text-gray-300 border border-white/10 hover:bg-[#8dd0f2]/20 text-xs px-2.5 py-1 rounded-lg transition disabled:opacity-40"
            >
              <Pagination.PreviousIcon />
              <span>Previous</span>
            </Pagination.Previous>
          </Pagination.Item>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Pagination.Item key={page}>
              <Pagination.Link
                isActive={page === currentPage}
                onPress={() => onPageChange(page)}
                className={`text-xs px-3 py-1 rounded-lg border transition ${
                  page === currentPage
                    ? "bg-[#8dd0f2] text-[#001321] font-bold border-[#8dd0f2]"
                    : "bg-[#001321]/60 text-gray-300 border-white/10 hover:bg-[#8dd0f2]/20"
                }`}
              >
                {page}
              </Pagination.Link>
            </Pagination.Item>
          ))}

          <Pagination.Item>
            <Pagination.Next
              isDisabled={currentPage === totalPages}
              onPress={() => onPageChange(currentPage + 1)}
              className="bg-[#001321]/60 text-gray-300 border border-white/10 hover:bg-[#8dd0f2]/20 text-xs px-2.5 py-1 rounded-lg transition disabled:opacity-40"
            >
              <span>Next</span>
              <Pagination.NextIcon />
            </Pagination.Next>
          </Pagination.Item>
        </Pagination.Content>

        {/* Rows Per Page Dropdown using ListBox */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Rows per page:</span>
          <Select
            size="sm"
            aria-label="Rows per page"
            value={String(itemsPerPage)}
            className="w-20"
            onChange={(val) => {
              if (val) onPageSizeChange(Number(val));
            }}
          >
            <Select.Trigger className="bg-[#001321]/60 border border-white/10 min-h-8 h-8 rounded-lg text-xs text-gray-200">
              <Select.Value />
            </Select.Trigger>
            <ListBox className="bg-[#0f172a] border border-white/10 text-gray-200 text-xs rounded-lg p-1">
              {PAGE_SIZE_OPTIONS.map((option) => (
                <ListBox.Item
                  id={option.value}
                  className="px-3 py-1 hover:bg-[#8dd0f2]/20 rounded cursor-pointer text-xs"
                >
                  {option.label}
                </ListBox.Item>
              ))}
            </ListBox>
          </Select>
        </div>
      </Pagination>
    </div>
  );
};

export default PaginationBar;
