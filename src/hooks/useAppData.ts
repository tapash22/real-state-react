import { useQuery } from "@tanstack/react-query";
import { getAppData } from "../api/dataApi";

export const appDataQueryKey = ["app-data"];

export const useAppData = () => {
  return useQuery({
    queryKey: appDataQueryKey,
    queryFn: getAppData,

    // Static/mock data rarely changes
    staleTime: Infinity,

    // Don't refetch local data
    refetchOnWindowFocus: false,
  });
};
