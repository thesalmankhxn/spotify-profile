import React from "react";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

import { AppProvider } from "../lib/context";

import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <AppProvider theme="dark">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </SessionProvider>
  );
}

export default MyApp;
