import React from "react";
import NavBar from "../components/NavBar";
import myBg from "../public/images/maritime-grid.png";
import Image from "next/image";

const performancereview = () => {
  return (
    <div className="flex h-screen">
      <NavBar></NavBar>
      <Image
        src={myBg}
        alt="bg"
        className="h-full w-full object-cover object-center -z-10 fixed opacity-30"
      />
      <main className="ml-20 w-full"></main>
    </div>
  );
};

export default performancereview;
