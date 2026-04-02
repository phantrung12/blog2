"use client";

import { Container } from "@/components/layout/container";
import { PostCard } from "@/components/posts/post-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { postService } from "@/services/post.service";
import { IPost } from "@/types/post.type";
import { FileText, Loader2, PlusCircle, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!user?.id) return;
      try {
        setLoadingPosts(true);
        // Assuming the backend filters posts by authorId if passed
        const res = await postService.getPosts({
          authorId: user.id,
          page: 1,
          limit: 10, // Fetch a good number for the profile or implement pagination later
        });
        setPosts(res.data.data.items || []);
      } catch (error) {
        console.error("Failed to fetch user posts:", error);
      } finally {
        setLoadingPosts(false);
      }
    };

    if (user?.id) {
      fetchUserPosts();
    }
  }, [user?.id]);

  if (isLoading || (!isLoading && !isAuthenticated)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-zinc-50 pb-20 pt-10 dark:bg-zinc-950">
      <Container className="max-w-5xl space-y-10">
        {/* Profile Header Card */}
        <Card className="overflow-hidden border-none shadow-md">
          {/* Cover Area */}
          <div className="h-32 bg-linear-to-r from-emerald-500 to-teal-600 sm:h-48" />

          <CardContent className="relative px-6 pb-8 sm:px-10">
            <div className="flex flex-col items-center sm:flex-row sm:items-end sm:justify-between">
              {/* Avatar & Info */}
              <div className="relative -mt-16 sm:-mt-20 flex flex-col items-center sm:flex-row sm:items-end sm:space-x-5">
                <Avatar className="h-32 w-32 border-4 border-white shadow-lg dark:border-zinc-950 sm:h-40 sm:w-40 bg-zinc-100 dark:bg-zinc-800">
                  <AvatarFallback className="text-4xl bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                    {user.name?.charAt(0).toUpperCase() ||
                      user.email?.charAt(0).toUpperCase() ||
                      "U"}
                  </AvatarFallback>
                </Avatar>

                <div className="mt-4 text-center sm:mt-0 sm:pb-4 sm:text-left">
                  <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                    {user.name}
                  </h1>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex space-x-3 sm:mt-0 sm:pb-4">
                <Link href="/profile/edit">
                  <Button variant="outline" className="gap-2">
                    <Settings className="h-4 w-4" />
                    Edit Profile
                  </Button>
                </Link>
                <Link href="/posts/new">
                  <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
                    <PlusCircle className="h-4 w-4" />
                    New Post
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Posts Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-4 dark:border-zinc-800">
            <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              <FileText className="h-5 w-5 text-emerald-500" />
              My Posts
            </h2>
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
              {posts.length} {posts.length === 1 ? "post" : "posts"}
            </span>
          </div>

          {loadingPosts ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
            </div>
          ) : posts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-zinc-50 py-16 px-4 text-center dark:border-zinc-800 dark:bg-zinc-900/50">
              <div className="mb-4 rounded-full bg-emerald-100 p-3 dark:bg-emerald-900/30">
                <FileText className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="mb-1 text-lg font-semibold text-zinc-900 dark:text-white">
                No posts yet
              </h3>
              <p className="mb-6 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
                You haven't written any posts yet. Start sharing your thoughts
                and stories with the community!
              </p>
              <Link href="/posts/new">
                <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
                  <PlusCircle className="h-4 w-4" />
                  Create First Post
                </Button>
              </Link>
            </div>
          )}
        </section>
      </Container>
    </div>
  );
}
