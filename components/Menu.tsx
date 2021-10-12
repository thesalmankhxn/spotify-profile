import React from "react";
import { useRouter } from "next/router";

import tw from "twin.macro";
import styled from "styled-components";

import Button from "../components/Button";
import Link from "next/link";

const menuItems = [
  { name: "Profile", icon: "", path: "/" },
  { name: "Top Tracks", icon: "", path: "/top-tracks" },
  { name: "Recent", icon: "", path: "/recent" },
  { name: "Playlists", icon: "", path: "/playlists" },
];

const Menu = () => {
  const router = useRouter();
  console.log(router.pathname);
  return (
    <Styled.Layout>
      {menuItems.map((item, index) => (
        <Styled.MenuButton
          key={index}
          className={router.pathname == item.path ? "active" : ""}
        >
          <Link href={item.path}>
            <a>{item.name}</a>
          </Link>
        </Styled.MenuButton>
      ))}
    </Styled.Layout>
  );
};

const Styled = {
  Layout: styled.div`
    ${tw`grid grid-cols-4 gap-x-10p w-full absolute bottom-0 left-0 bg-black77-dark text-11p`}
  `,
  MenuButton: styled(Button)`
    ${tw`w-full h-50p bg-black77-dark border-t-4 border-black hover:border-green-500 hover:bg-black77-light focus:border-t-4 focus:border-green-500 focus:bg-black77-light`}

    &.active {
      ${tw`bg-black77-light border-green-500`}
    }
  `,
};

export default Menu;
