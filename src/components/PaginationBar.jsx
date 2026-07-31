"use client";

import React from "react";
import { Pagination, Dropdown, Button, Label } from "@heroui/react";

const PAGE_SIZE_OPTIONS = [
  { label: "8", value: "8" },
  { label: "10", value: "10" },
  { label: "12", value: "12" },
  { label: "14", value: "14" },
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
    <div className="bg-[#0f172a]/50 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* 1. Summary */}
      <div className="text-xs text-gray-400 font-normal shrink-0">
        Showing{" "}
        <strong className="text-gray-200">
          {startIndex + 1}–{endIndex}
        </strong>{" "}
        of <strong className="text-gray-200">{totalItems}</strong> results
      </div>

      {/* 2. HeroUI Pagination with Ellipsis */}
      <Pagination
        showControls
        siblings={1}
        boundaries={1}
        total={totalPages}
        page={currentPage}
        onChange={onPageChange}
        classNames={{
          wrapper: "gap-2 flex-wrap justify-center items-center",
          item: "bg-[#001321]/60 text-gray-300 font-semibold text-xs border border-white/10 hover:bg-[#8dd0f2]/20 transition rounded-xl w-9 h-9 flex items-center justify-center",
          cursor:
            "bg-[#8dd0f2] text-[#001321] font-bold rounded-xl w-9 h-9 shadow-md",
          prev: "bg-[#001321]/60 text-gray-300 border border-white/10 hover:bg-[#8dd0f2]/20 rounded-xl px-3 h-9 text-xs font-medium",
          next: "bg-[#001321]/60 text-gray-300 border border-white/10 hover:bg-[#8dd0f2]/20 rounded-xl px-3 h-9 text-xs font-medium",
          ellipsis: "text-gray-400 font-bold px-1",
        }}
      />

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

      {/* 3. HeroUI Compound Dropdown */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs text-gray-400">Rows per page:</span>
        <Dropdown>
          <Dropdown.Trigger>
            <Button
              size="sm"
              className="bg-[#001321]/60 border border-white/10 text-gray-200 text-xs min-w-[60px] h-9 rounded-xl hover:border-[#8dd0f2]/60"
            >
              {itemsPerPage}
            </Button>
          </Dropdown.Trigger>

          <Dropdown.Popover className="bg-[#0f172a] border border-white/10 rounded-xl p-1 shadow-2xl z-50">
            <Dropdown.Menu
              selectionMode="single"
              selectedKeys={new Set([String(itemsPerPage)])}
              onSelectionChange={(keys) => {
                const selectedValue = Array.from(keys)[0];
                if (selectedValue) {
                  onPageSizeChange(Number(selectedValue));
                }
              }}
            >
              {PAGE_SIZE_OPTIONS.map((option) => (
                <Dropdown.Item
                  key={option.value}
                  id={option.value}
                  textValue={option.label}
                  className="px-3 py-1.5 hover:bg-[#8dd0f2]/20 text-gray-200 rounded-lg cursor-pointer text-xs"
                >
                  <Label>{option.label}</Label>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      </div>
    </div>
  );
};

export default PaginationBar;
