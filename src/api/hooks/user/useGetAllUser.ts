import { useQuery, UseQueryOptions } from "@tanstack/react-query";
// import { useGetUserInfoReponse } from "../../types";
import { fetcher, queryKeys } from "@/api";
import { getAllUserResponse } from "@/api/types";

const useGetAllUser = (
  options?: Omit<UseQueryOptions<getAllUserResponse, any, any>, "queryKey">
) => {
  return useQuery<getAllUserResponse>({
    queryKey: queryKeys.user.list()["queryKey"],
    queryFn: getAllUser,
    ...options,
    // staleTime: Infinity, // 데이터가 항상 신선하게 유지되어 네트워크 요청을 하지 않음
    // gcTime: Infinity,
  });
};

const getAllUser = async () => {
  const response = await fetcher("/users");

  const data: getAllUserResponse = await response.json();

  console.log("total", data.total);
  return data;
};

export { useGetAllUser, getAllUser };
