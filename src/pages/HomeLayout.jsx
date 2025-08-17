import React from "react";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div>
      {/* <nav>Navbar HomeLayout</nav> */}
      <Outlet /> {/* Whatever we have in the child pages, gonna be displayed */}
    </div>
  );
};

export default HomeLayout;
