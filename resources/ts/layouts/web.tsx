import Header from "@/components/header";
import Menu from "@/components/menu";
import React from "react";

const LayoutWeb = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="main">
        {children}
        <Menu />
      </div>
    </>
  );
};

export default LayoutWeb;
