import { useMutation, useQuery } from "@tanstack/react-query";
import { postService } from "@/services/post.service";
import { IPostCreate, IPostUpdate, PostFilterParams } from "@/types/post.type";

export function usePosts(filter?: PostFilterParams) {
  const searchPosts = useQuery({
    queryKey: ["posts", filter],
    queryFn: () => postService.getPosts(filter || {}),
    enabled: !!filter,
  });

  const createPost = useMutation({
    mutationFn: async (data: IPostCreate) => {
      const res = await postService.createPost(data);
      return res.data;
    },
  });

  const updatePost = useMutation({
    mutationFn: async (data: IPostUpdate) => {
      const res = await postService.updatePost(data.id, data);
      return res.data;
    },
  });

  return {
    createPost,
    searchPosts,
    updatePost,
  };
}

export function useGetPostBySlug(slug: string) {
  return useQuery({
    queryKey: ["posts", slug],
    queryFn: () => postService.getPostBySlug(slug),
    enabled: !!slug,
  });
}
