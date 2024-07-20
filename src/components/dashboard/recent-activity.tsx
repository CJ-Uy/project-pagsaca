"use client";

import { Avatar } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { CustomIcon } from "@/components/dashboard/custom-icon";
import dayjs from "dayjs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function RecentActivity() {
  const [recentActivity, setRecentActivity] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getRecentActivity = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/dashboard/recentActivity?page=${page}&limit=10`
      );
      const data = await response.json();
      setRecentActivity(data.recentActivity);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRecentActivity();
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      getRecentActivity(newPage);
    }
  };

  const renderPaginationItems = () => {
    const items = [];
    const rangeAround = 2; // Number of pages to show around the current page

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - rangeAround && i <= currentPage + rangeAround)
      ) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (
        i === currentPage - rangeAround - 1 ||
        i === currentPage + rangeAround + 1
      ) {
        items.push(
          <PaginationItem key={i}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }
    return items;
  };

  return (
    <div className="space-y-8">
      {isLoading ? (
        <p>Loading...</p>
      ) : recentActivity.length > 0 ? (
        <>
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center">
              <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                <CustomIcon details={activity} />
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.action} - {activity.module.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {dayjs(activity.createdAt).format("MMM DD, YYYY hh:mm")}
                </p>
              </div>
              <div className="ml-auto font-medium">{activity.description}</div>
            </div>
          ))}
          <Pagination>
            <PaginationContent>
              {currentPage > 1 ? (
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                  />
                </PaginationItem>
              ) : (
                <PaginationItem>
                  <PaginationPrevious className="pointer-events-none opacity-50" />
                </PaginationItem>
              )}
              {renderPaginationItems()}
              {currentPage < totalPages ? (
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                  />
                </PaginationItem>
              ) : (
                <PaginationItem>
                  <PaginationNext className="pointer-events-none opacity-50" />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </>
      ) : (
        <p>No recent activity.</p>
      )}
    </div>
  );
}
