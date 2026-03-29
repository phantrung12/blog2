import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services/category.service";

export function useCategories({enabledList}: {enabledList: boolean}) {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await categoryService.getCategories();
      return res.data;
    },
    enabled: enabledList,
  });
}