import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useGetUserInfoReponse } from "../../types";
import { fetcher, queryKeys } from "@/api";

const useGetUserInfo = (
  // pathName: string,
  options?: Omit<UseQueryOptions<useGetUserInfoReponse, any, any>, "queryKey">
) => {
  return useQuery<useGetUserInfoReponse>({
    queryKey: queryKeys.user.info()["queryKey"],
    queryFn: () => getUserInfo(),
    ...options,
  });
};

const getUserInfo = async (cookie?: string) => {
  const response = await fetcher("/auth/me", {}, cookie);

  const data: useGetUserInfoReponse = await response.json();

  return data;
};

export { useGetUserInfo, getUserInfo };
