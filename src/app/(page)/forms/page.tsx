import BreadcrumbExample from "@/components/custom/BreadcrumbExample";
import FormExample from "@/components/custom/FormExample";
import { paths } from "@/lib/paths";
import React from "react";

function Page() {
  return (
    <>
      <BreadcrumbExample data={[{ ...paths.home }, { ...paths.Forms }]} />
      <FormExample />
    </>
  );
}

export default Page;
