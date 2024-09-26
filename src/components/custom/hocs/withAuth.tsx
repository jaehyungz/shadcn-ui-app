import { queryKeys } from "@/api";
import { getUserInfo } from "@/api/hooks/user";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React, { ComponentType } from "react";

const client = new QueryClient();

export const WithAuth =
  <P extends object>(Component: ComponentType<P>) =>
  async (props: P) => {
    const cookie = cookies().get("token")?.value;

    // const headersList = headers();
    // const referer = headersList.get("referer");

    try {
      await client.fetchQuery({
        queryKey: queryKeys.user.info()["queryKey"],
        queryFn: () => getUserInfo(cookie),
      });
    } catch (error) {
      console.log("error!!!!!!!!!!!!!!!!!!!!!!!!");
      redirect("/auth/sign-in");
    }

    return (
      <HydrationBoundary state={dehydrate(client)}>
        <Component {...props} />
      </HydrationBoundary>
    );
  };
