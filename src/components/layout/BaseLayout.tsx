import React from "react";
import Header from "../header/Header";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <>
      <Header />
      <div className="container wrapper">{children}</div>
    </>
  );
};

export default BaseLayout;
