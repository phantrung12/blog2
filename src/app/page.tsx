import { Container } from "@/components/layout/container";
import { CategoryFilter } from "@/components/posts/category-filter";
import { PostCard } from "@/components/posts/post-card";
import { categoryService } from "@/services/category.service";
import { postService } from "@/services/post.service";
import { tagService } from "@/services/tag.service";
import { PostStatus } from "@/types/post.type";

export default async function FeedPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { data: posts } = await postService.getPosts({
    page: Number(searchParams.page) || 1,
    limit: Number(searchParams.limit) || 10,
    categoryId: searchParams.categoryId?.toString(),
    tagId: searchParams.tagId?.toString(),
    search: searchParams.search?.toString(),
    status: searchParams.status?.toString() as PostStatus,
  });

  const { data: tags } = await tagService.getTags();
  const { data: categories } = await categoryService.getCategories();
  // // Get featured post (first post with cover image)
  // const featuredPost = posts.find((post) => post.coverImage);

  // // Get remaining posts (excluding featured)
  // const remainingPosts = posts.filter((post) => post.id !== featuredPost?.id);

  // // Filter posts based on search and category
  // const filteredPosts = remainingPosts.filter((post) => {
  //   const query = searchQuery.toLowerCase();
  //   const matchesSearch =
  //     post.title.toLowerCase().includes(query) ||
  //     post.excerpt.toLowerCase().includes(query) ||
  //     post.tags.some((tag) => tag.toLowerCase().includes(query));

  //   const matchesCategory =
  //     selectedCategory === null || post.tags.includes(selectedCategory);

  //   return matchesSearch && matchesCategory;
  // });

  return (
    <div className="min-h-screen">
      {/* Featured Post Section */}
      {/* {featuredPost && (
        <section className="px-4 pt-8 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <FeaturedPost post={featuredPost} />
        </section>
      )} */}

      <Container className="max-w-6xl py-10">
        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search */}
          <div className="max-w-md">
            {/* <SearchInput placeholder="Search posts..." /> */}
          </div>

          {/* Category Filter */}
          <CategoryFilter
            categories={categories?.data || []}
            selectedCategory={searchParams?.categoryId?.toString() || null}
          />
        </div>

        {/* Posts Grid - 2 Columns */}
        <section>
          {posts?.data?.items.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {posts?.data?.items.map((post) => (
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
      </Container>
    </div>
  );
}
