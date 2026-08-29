import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/auth";

export const currentUserQueryKey = ["currentUser"];

export const useCurrentUser = () => {
  return useQuery({
    queryKey: currentUserQueryKey,
    queryFn: getCurrentUser,

    staleTime: 5 * 60 * 1000,

    retry: false,
  });
};
