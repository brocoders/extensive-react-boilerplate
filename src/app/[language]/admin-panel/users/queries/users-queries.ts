import { useGetUsersService } from "@/services/api/services/users";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { createQueryKeys } from "@/services/react-query/query-key-factory";
import { useInfiniteQuery } from "@tanstack/react-query";

export const usersQueryKeys = createQueryKeys(["users"], {
  list: () => ({
    key: [],
  }),
});

export const useUserListQuery = () => {
  const fetch = useGetUsersService();

  const query = useInfiniteQuery({
    queryKey: usersQueryKeys.list().key,
    queryFn: async ({ pageParam = 1 }) => {
      const { status, data } = await fetch({
        page: pageParam,
        limit: 10,
      });

      if (status === HTTP_CODES_ENUM.OK) {
        return {
          data: data.data,
          nextPage: data.hasNextPage ? pageParam + 1 : undefined,
        };
      }
    },
    getNextPageParam: (lastPage) => {
      return lastPage?.nextPage;
    },
    cacheTime: 0,
  });

  return query;
};
