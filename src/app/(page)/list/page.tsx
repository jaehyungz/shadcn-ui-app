import BreadcrumbExample from "@/components/custom/BreadcrumbExample";
import { WithAuth } from "@/components/custom/hocs";
import { paths } from "@/lib/paths";
import React from "react";

interface Props {}

function Page(props: Props) {
  const {} = props;

  return (
    <>
      <BreadcrumbExample data={[{ ...paths.home }, { ...paths.list }]} />
    </>
  );
}

export default WithAuth(Page);
