import React from "react";
import Header from "../Header";

interface Props {
  children: React.ReactNode;
}

function LayoutSection({ children }: Props) {
  return (
    <div className="container mx-auto">
      <Header />
      <div className="mt-4 sm:px-0 px-4">{children}</div>
    </div>
  );
}

export default LayoutSection;
