"use client";

import {
  ArrowUpRightFromSquare,
  CircleCheck,
  CircleExclamation,
  CircleLetterX,
  Clock,
} from "@gravity-ui/icons";
import { Chip, Spinner, Table, Link } from "@heroui/react";
import { useCallback, useRef, useState } from "react";

const statusConfig = {
  pending: {
    color: "warning",
    variant: "soft",
    icon: <Clock size={8} className="text-amber-500" />,
    className: "border-amber-500/30 bg-amber-500/10 text-amber-500",
  },
  rejected: {
    color: "danger",
    variant: "Primary",
    icon: <CircleLetterX size={8} className="text-rose-500" />,
    className: "border-rose-500/30 bg-rose-500/10 text-rose-500",
  },
  accepted: {
    color: "success",
    variant: "Primary",
    icon: <CircleCheck size={8} className="text-emerald-500" />,
    className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-500",
  },
  "Position Removed": {
    color: "default",
    icon: <CircleExclamation size={8} className="text-slate-500" />,
    className: "border-slate-500 text-slate-500 bg-slate-500/10",
  },
};
const ITEMS_PER_PAGE = 6;

const columns = [
  { id: "opportunity", name: "OPPORTUNITY" },
  { id: "startup", name: "STARTUP" },
  { id: "applied", name: "APPLIED" },
  { id: "portfolio", name: "Portfolio" },
  { id: "status", name: "Status" },
];

export function MyApplicationsTable({ applicationsData }) {
  console.log(applicationsData);

  const [items, setItems] = useState(() =>
    applicationsData.slice(0, ITEMS_PER_PAGE),
  );
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef(false);
  const hasMore = items.length < applicationsData.length;

  const loadMore = useCallback(() => {
    if (!hasMore || isLoadingRef.current) return;
    isLoadingRef.current = true;
    setIsLoading(true);
    setTimeout(() => {
      setItems((prev) =>
        applicationsData.slice(0, prev.length + ITEMS_PER_PAGE),
      );
      setIsLoading(false);
      requestAnimationFrame(() => {
        isLoadingRef.current = false;
      });
    }, 1500);
  }, [hasMore]);

  return (
    <Table className="bg-transparent text-slate-200 border-4 border-gray-900">
      <Table.ScrollContainer className="lg:h-150 overflow-y-auto">
        <Table.Content
          rowHeight={30}
          aria-label="Async loading table"
          className="min-w-[600px]"
        >
          <Table.Header className="sticky top-0 z-10  bg-transparent backdrop-sepia-25  border border-gray-600">
            {columns.map((col) => (
              <Table.Column
                key={col.id}
                id={col.id}
                isRowHeader={col.id === "opportunity"}
                className="text-xs font-semibold tracking-wider text-slate-500 py-4 border-b"
              >
                {col.name}
              </Table.Column>
            ))}
          </Table.Header>
          <Table.Body>
            <Table.Collection items={items}>
              {(app) => {
                return (
                  <Table.Row
                    className={"py-5 hover:bg-slate-900/40 transition-colors"}
                    key={app._id}
                  >
                    <Table.Cell className="py-5 font-medium text-sm bg-transparent">
                      {app.status === "Position Removed" ? (
                        <div>
                          <span className="text-slate-500 line-through decoration-slate-600 font-normal">
                            {app.opportunityTitle || "Unknown Position"}
                          </span>
                          <span className="text-[11px] font-light text-rose-400/80 bg-rose-950/30 px-1.5 py-0.5 rounded border border-rose-900/30 w-max">
                            ( Removed by Founder )
                          </span>
                        </div>
                      ) : (
                        <span> {app?.oppTitle || app?.opportunityTitle}</span>
                      )}
                    </Table.Cell>
                    <Table.Cell className="py-5 font-medium text-sm bg-transparent">
                      {app?.startupName || "---"}
                    </Table.Cell>
                    <Table.Cell className="py-5 font-medium text-sm bg-transparent">
                      {app?.createdAt}
                    </Table.Cell>
                    <Table.Cell className="py-5 font-medium text-sm bg-transparent">
                      {" "}
                      <Link
                        href={app?.gitubLink || "https//kdfvo//"}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="text-sm space-x-1.5 text-[#7dbad2]"
                      >
                        <ArrowUpRightFromSquare /> <span>View </span>
                      </Link>
                    </Table.Cell>
                    <Table.Cell className="py-5 bg-transparent">
                      <div className="flex items-center gap-1">
                        {statusConfig[app.status].icon}
                        <Chip
                          color={statusConfig[app.status].color}
                          size="md"
                          variant={"soft"}
                          className={`border font-extralight ${statusConfig[app.status].className}`}
                        >
                          {app.status}
                        </Chip>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              }}
            </Table.Collection>
            {hasMore && (
              <Table.LoadMore
                isLoading={isLoading}
                scrollOffset={0}
                onLoadMore={loadMore}
              >
                <Table.LoadMoreContent>
                  <Spinner size="md" />
                </Table.LoadMoreContent>
              </Table.LoadMore>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
