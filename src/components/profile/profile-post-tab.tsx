"use client";

import { PostStatus } from "@/types/post.type";
import * as React from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";

export function ProfilePostTab() {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <div className="flex py-2">
      <Tabs
        defaultValue={PostStatus.PUBLISHED}
        value={searchParams.get("status") || PostStatus.PUBLISHED}
        onValueChange={(value) => {
          router.push(`/profile?status=${value}&page=1&limit=10`);
        }}
      >
        <TabsList variant="line">
          <TabsTrigger value={PostStatus.PUBLISHED}>Published</TabsTrigger>
          <TabsTrigger value={PostStatus.DRAFT}>Draft</TabsTrigger>
          <TabsTrigger value={PostStatus.ARCHIVED}>Archived</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
