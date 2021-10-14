import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import tw from "twin.macro";
import styled from "styled-components";

import Button from "../components/Button";

const menuItems = [
  { name: "Profile", icon: "fi fi-rs-user", path: "/" },
  { name: "Top Tracks", icon: "fi fi-rs-music", path: "/top-tracks" },
  { name: "Recent", icon: "fi fi-rs-time-past", path: "/recent" },
  { name: "Playlists", icon: "fi fi-rs-record-vinyl", path: "/playlists" },
];

const Menu = () => {
  const router = useRouter();
  console.log(router.pathname);
  return (
    <Styled.Layout>
      {menuItems.map((item, index) => (
        <Link href={item.path} key={index}>
          <a>
            <Styled.MenuButton
              className={router.pathname == item.path ? "active" : ""}
            >
              <i className={item.icon}></i>
              <div>{item.name}</div>
            </Styled.MenuButton>
          </a>
        </Link>
      ))}
    </Styled.Layout>
  );
};

const Styled = {
  Layout: styled.div`
    ${tw`grid grid-cols-4 gap-x-10p w-full absolute bottom-0 left-0 bg-black77-dark text-12p`}

    @media (min-width: 768px) {
      ${tw`flex flex-col gap-y-10p justify-center`}
      height: 100%;
      width: 80px;
    }
  `,
  MenuButton: styled(Button)`
    ${tw`w-full h-60p bg-black77-dark border-t-4 border-black hover:border-green-500 hover:bg-black77-light focus:border-t-4 focus:border-green-500 focus:bg-black77-light`}

    max-height: 100px;

    @media (min-width: 768px) {
      ${tw`border-t-0 border-l-4 focus:border-t-0 focus:border-l-4 h-70p`}
    }

    &.active {
      ${tw`bg-black77-light border-green-500`}
    }
  `,
};

export default Menu;
