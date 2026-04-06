"use client";

import { Container } from "@/components/layout/container";
import { SearchInput } from "@/components/search/search-input";
import { useState } from "react";
import { PostFilterParams } from "@/types/post.type";
import { usePosts } from "@/hooks/use-posts";
import { useSearchParams } from "next/navigation";
import { PostCard } from "@/components/posts/post-card";
import { Pagination } from "antd";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [filterPost, setFilterPost] = useState<PostFilterParams>({
    search: searchParams.get("q") || "",
    page: 1,
    limit: 10,
  });
  const { searchPosts } = usePosts(filterPost);
  return (
    <div className="min-h-screen bg-zinc-50 pb-20 pt-10 dark:bg-zinc-950">
      <Container className="max-w-6xl space-y-10">
        <div>
          <h1 className="text-3xl font-bold">Search</h1>
        </div>
        <div>
          <SearchInput
            onSearch={(value) =>
              setFilterPost((prev) => ({ ...prev, search: value }))
            }
          />
        </div>
        <section>
          {Number(searchPosts?.data?.data?.data?.pagination?.totalItems) > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {searchPosts?.data?.data?.data?.items?.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-lg text-muted-foreground">No posts found</p>
              {/* <button
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedCategory(null);
                        }}
                        className="mt-4 text-sm text-emerald-600 hover:underline"
                      >
                        Clear filters
                      </button> */}
            </div>
          )}
        </section>
        <div className="flex justify-center">
          <Pagination
            current={
              Number(searchPosts?.data?.data?.data?.pagination?.currentPage) ||
              1
            }
            total={
              Number(searchPosts?.data?.data?.data?.pagination?.totalItems) || 0
            }
            pageSize={
              Number(searchPosts?.data?.data?.data?.pagination?.itemsPerPage) ||
              filterPost.limit
            }
            onChange={(page) => setFilterPost((prev) => ({ ...prev, page }))}
          />
        </div>
      </Container>
    </div>
  );
}
