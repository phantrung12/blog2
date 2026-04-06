"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "antd";

interface ProfilePostPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export function ProfilePostPagination({
  currentPage,
  totalPages,
  totalItems,
}: ProfilePostPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <div className="flex justify-center mt-4">
      <Pagination
        current={currentPage}
        total={totalItems}
        pageSize={Number(searchParams.get("limit")) || 10}
        onChange={(page) => {
          router.push(
            `/profile?page=${page}&limit=${searchParams.get("limit")}&status=${searchParams.get("status")}`,
          );
        }}
        showSizeChanger={false}
      />
    </div>
  );
}
