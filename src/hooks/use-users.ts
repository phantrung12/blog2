import { useMutation, useQuery } from "@tanstack/react-query";
import { userService } from "@/services/user.service";
import { IFilterUser, IUserCreate, IUserUpdate } from "@/types/user.type";

export function useUsers(filter?: IFilterUser, enabledList?: boolean) {
  const getUserList = useQuery({
    queryKey: ["users", filter],
    queryFn: () => userService.getUsers(filter || {}),
    enabled: enabledList,
  });

  const createUser = useMutation({
    mutationFn: (data: IUserCreate) => userService.createUser(data),
  });

  const updateUser = useMutation({
    mutationFn: ({ id, data }: { id: string; data: IUserUpdate }) =>
      userService.updateUser(id, data),
  });

  return {
    getUserList,
    updateUser,
    createUser,
  };
}

export function useUserById(id: string) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => userService.getUserById(id),
    enabled: !!id,
  });
}
