import React from "react";
import Header from "../header/Header";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <>
      <Header />
      <div className="container">{children}</div>
    </>
  );
};

export default BaseLayout;
