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

      <Styled.Main>
        <Styled.Contianer>
          <Menu />
          {children}
        </Styled.Contianer>
      </Styled.Main>

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
  SK77: styled.footer`
    ${tw`bg-black w-full text-white text-center p-2 grid place-items-center fixed bottom-0 md:hidden`}

    @media (min-width: 768px) {
      ${tw`block top-0 bg-black text-white text-center p-2 grid place-items-center fixed`}
      bottom: auto;
      width: 80px;
    }
  `,

  Contianer: styled.div`
    ${tw`py-15p bg-black77-light w-full text-white relative`}
    max-width: 1440px;
    height: 100vh;

    @media (max-width: 768px) {
      min-height: 100vh;
    }
  `,

  Main: styled.main`
    ${tw`bg-black77-light flex justify-center overflow-auto`}

    ::-webkit-scrollbar {
      width: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #ffffff;
      background-image: linear-gradient(315deg, #ffffff 0%, #fafafa 74%);
      border-radius: 10px;

      &:hover {
        background-color: #ffffff;
        background-image: linear-gradient(315deg, #e9e9e9 0%, #ececec 74%);
      }
    }

    ::-webkit-scrollbar-track {
      background: #000000;
    }

    scrollbar-width: thin;
    scrollbar-color: #ffffff #000000;
  `,
};

export default Layout;
