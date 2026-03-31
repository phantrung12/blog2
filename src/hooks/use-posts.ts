import { useMutation } from "@tanstack/react-query";
import { postService } from "@/services/post.service";
import { IPostCreate } from "@/types/post.type";

export function usePosts() {
  const createPost = useMutation({
    mutationFn: async (data: IPostCreate) => {
      const res = await postService.createPost(data);
      return res.data;
    },
  });

  return {
    createPost,
  };
}
