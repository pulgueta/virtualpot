import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { api } from "@/config/api";

export const useUsersQueryOptions = queryOptions({
  queryKey: ["users"],
  queryFn: async () => {
    const { data, error } = await api.users.get();

    if (error) {
      throw error;
    }

    return data;
  },
});

export function useUsers() {
  return useSuspenseQuery(useUsersQueryOptions);
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      const { data, error } = await api.users({ id }).get();
      if (error) {
        throw error;
      }
      return data;
    },
    enabled: !!id,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: { name: string; email: string; role: string }) => {
      const { data, error } = await api.users.post(user);
      if (error) {
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
