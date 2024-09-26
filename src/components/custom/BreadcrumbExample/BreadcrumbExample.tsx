import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

interface Props {
  data: { label: string; href: string }[];
}

function BreadcrumbExample(props: Props) {
  const {} = props;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {props.data.map((item, idx) => {
          return (
            <React.Fragment key={item.href}>
              {idx === 0 ? <></> : <BreadcrumbSeparator />}

              <BreadcrumbItem>
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadcrumbExample;
