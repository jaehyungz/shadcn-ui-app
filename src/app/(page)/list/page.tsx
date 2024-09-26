import { queryKeys } from "@/api";
import getQueryClient from "@/api/getQueryClient";
import { getAllUser } from "@/api/hooks/user";
import BreadcrumbExample from "@/components/custom/BreadcrumbExample";
import DataTable from "@/components/custom/DataTable";
import { WithAuth } from "@/components/custom/hocs";
import { paths } from "@/lib/paths";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

interface Props {}

async function Page(props: Props) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.user.list()["queryKey"],
    queryFn: getAllUser,
  });

  return (
    <>
      <BreadcrumbExample data={[{ ...paths.home }, { ...paths.list }]} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DataTable />
      </HydrationBoundary>
    </>
  );
}

// export default WithAuth(Page);
export default Page;
