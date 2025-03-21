import React from "react";
import Header from "../header/Header";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div id="base-layout-TEMP" style={{ height: "100vh" }}>
      <Header />
      <div className="container">{children}</div>
    </div>
  );
};

export default BaseLayout;
