import React from "react";
import Nav from "./Nav";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full min-h-screen">
      <Nav />
      <main className="flex-grow min-sm:pl-[90px]">{children}</main>
    </div>
  );
};

export default Layout;
