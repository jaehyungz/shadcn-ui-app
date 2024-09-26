import React from "react";
import Header from "../Header";

interface Props {
  children: React.ReactNode;
}

function LayoutSection({ children }: Props) {
  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="mx-auto w-full sm:w-96">
        <Header />
        <div className="px-4 bg-background pt-20 min-h-screen pb-5">
          {children}
        </div>
      </div>
    </div>
  );
}

export default LayoutSection;
