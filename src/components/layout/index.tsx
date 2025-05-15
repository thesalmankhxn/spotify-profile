import React from "react";
import Nav from "./Nav";
import { useAuth } from "../../context/AuthContext";
import Show from "../Show";
import cn from "classnames";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { accessToken } = useAuth();

  return (
    <div className="h-full min-h-screen">
      <Show when={!!accessToken}>
        <Nav />
      </Show>
      <main
        className={cn("flex-grow min-sm:pl-[90px]", { "!pl-0": !accessToken })}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
