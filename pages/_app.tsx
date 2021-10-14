import React from "react";
import Layout from "../components/Layout";
import Login from "../components/Login";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Login />
    </Layout>
  );
}

export default MyApp;
