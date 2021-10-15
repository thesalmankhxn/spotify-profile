import React from "react";
import Head from "next/head";
import Menu from "./Menu";
import Link from "next/link";

import styled from "styled-components";
import tw from "twin.macro";

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Spotify Profile</title>
        <meta name="description" content="Created by SK77" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/uicons-regular-straight/css/uicons-regular-straight.css"
        ></link>
      </Head>

      <main
        className="py-15p bg-black77-light w-full text-white relative"
        style={{ height: "100vh" }}
      >
        <Menu />
        {children}
      </main>

      <Styled.SK77>
        <Link href="https://mahmoodkhan.me">
          <a target="_blank" rel="noopener noreferrer">
            ⚡<div className="inline -m-2 p-1">K77</div>
          </a>
        </Link>
      </Styled.SK77>
    </div>
  );
};

const Styled = {
  SK77: styled.div`
    ${tw`bg-black w-full text-white text-center p-2 grid place-items-center fixed bottom-0 md:hidden`}

    @media (min-width: 768px) {
      ${tw`block top-0 bg-black text-white text-center p-2 grid place-items-center fixed`}
      bottom: auto;
      width: 80px;
    }
  `,
};

export default Layout;
