import BreadcrumbExample from "@/components/custom/BreadcrumbExample";
import FormExample from "@/components/custom/FormExample";
import React from "react";

interface Props {}

function Page(props: Props) {
  const {} = props;

  return (
    <div>
      <BreadcrumbExample
        data={[
          { label: "home", href: "/" },
          { label: "forms", href: "/forms" },
        ]}
      />
      <FormExample />
    </div>
  );
}

export default Page;
