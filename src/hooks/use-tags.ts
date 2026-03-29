import { useQuery } from "@tanstack/react-query";
import { tagService } from "@/services/tag.service";

export function useTags({enabledList}: {enabledList: boolean}) {
  return useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await tagService.getTags();
      return res.data;
    },
    enabled: enabledList,
  });
}