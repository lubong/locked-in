import React from "react";
import RoadMap from "../components/RoadMap";
import NavBar from "../components/NavBar";
import Image from "next/image";
import myBg from "../public/images/maritime-grid.png";

const progress = () => {
  return (
    <div className="flex h-screen">
      <NavBar />
      <Image
        src={myBg}
        alt="bg"
        className="w-full h-full object-cover object-center -z-10 absolute opacity-30"
      />
      <main className="ml-20 w-full">
        <RoadMap />
      </main>
    </div>
  );
};

export default progress;
