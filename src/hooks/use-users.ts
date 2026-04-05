import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/user.service";
import { IFilterUser } from "@/types/user.type";

export function useUsers({ filter, enabledList }: { filter: IFilterUser, enabledList: boolean }) {
  return useQuery({
    queryKey: ["users", filter],
    queryFn: () => userService.getUsers(filter),
    enabled: enabledList,
  });
}

export function useUserById(id: string) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => userService.getUserById(id),
    enabled: !!id,
  });
}