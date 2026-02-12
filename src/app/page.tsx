"use client";

import * as React from "react";
import { Container } from "@/components/layout/container";
import { FeaturedPost } from "@/components/posts/featured-post";
import { PostCard } from "@/components/posts/post-card";
import { CategoryFilter } from "@/components/posts/category-filter";
import { SearchInput } from "@/components/search/search-input";
import { posts } from "@/lib/mock-data";

export default function FeedPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null,
  );

  // Get all unique categories/tags
  const allCategories = React.useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort();
  }, []);

  // Get featured post (first post with cover image)
  const featuredPost = posts.find((post) => post.coverImage);

  // Get remaining posts (excluding featured)
  const remainingPosts = posts.filter((post) => post.id !== featuredPost?.id);

  // Filter posts based on search and category
  const filteredPosts = remainingPosts.filter((post) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some((tag) => tag.toLowerCase().includes(query));

    const matchesCategory =
      selectedCategory === null || post.tags.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      {/* Featured Post Section */}
      {featuredPost && (
        <section className="px-4 pt-8 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <FeaturedPost post={featuredPost} />
        </section>
      )}

      <Container className="max-w-6xl py-10">
        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search */}
          <div className="max-w-md">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search posts..."
            />
          </div>

          {/* Category Filter */}
          <CategoryFilter
            categories={allCategories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        {/* Posts Grid - 2 Columns */}
        <section>
          {filteredPosts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-lg text-muted-foreground">
                No posts found
                {searchQuery && ` matching "${searchQuery}"`}
                {selectedCategory && ` in "${selectedCategory}"`}
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(null);
                }}
                className="mt-4 text-sm text-emerald-600 hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </Container>
    </div>
  );
}
