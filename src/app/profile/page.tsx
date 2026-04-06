import { Container } from "@/components/layout/container";
import { PostCard } from "@/components/posts/post-card";
import { ProfileInfo } from "@/components/profile/profile-info";
import { ProfilePostTab } from "@/components/profile/profile-post-tab";
import { postService } from "@/services/post.service";
import { PostStatus } from "@/types/post.type";
import { cookies } from "next/headers";

export default async function ProfilePage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user")?.value;
  const user = userCookie ? JSON.parse(decodeURIComponent(userCookie)) : null;

  const { data: posts } = await postService.getPosts({
    page: Number(searchParams.page) || 1,
    limit: Number(searchParams.limit) || 10,
    status: (searchParams?.status?.toString() ||
      PostStatus.PUBLISHED) as PostStatus,
    ...(user?.id && { authorId: user.id }),
  });
  return (
    <div className="min-h-screen bg-zinc-50 pb-20 pt-10 dark:bg-zinc-950">
      <Container className="max-w-6xl space-y-10">
        <ProfileInfo />
        <div>
          <ProfilePostTab />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts?.data?.items.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
