import { useGetCompaniesService } from "@/services/api/services/companies";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { createQueryKeys } from "@/services/react-query/query-key-factory";
import { useInfiniteQuery } from "@tanstack/react-query";

export const companiesQueryKeys = createQueryKeys(["companies"], {
  list: () => ({
    key: [],
  }),
});

export const useGetCompaniesQuery = () => {
  const fetch = useGetCompaniesService();

  const query = useInfiniteQuery({
    queryKey: companiesQueryKeys.list().key,
    initialPageParam: 1,
    queryFn: async ({ pageParam, signal }) => {
      const { status, data } = await fetch(
        {
          page: pageParam,
          limit: 10,
        },
        { signal }
      );

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
    gcTime: 0,
  });

  return query;
};
