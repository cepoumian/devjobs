import React from "react";
import Header from "../singles/Header";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div id="base-layout-TEMP" style={{ height: "100vh" }}>
      <Header />
      {children}
    </div>
  );
};

export default BaseLayout;
