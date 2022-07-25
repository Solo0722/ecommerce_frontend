import React from "react";
import Footer from "./Footer";
import HeadDoc from "./HeadDoc";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <HeadDoc />
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
