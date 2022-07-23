import React from "react";
import HeadDoc from "./HeadDoc";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <HeadDoc />
      <Navbar />
      {children}
    </>
  );
};

export default Layout;
