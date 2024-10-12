import React from "react";
import Questionnaire from "../components/Questionnaire";
import NavBar from "../components/NavBar";
import myBg from "../public/images/maritime-grid.png";
import Image from "next/image";
const HomePage = () => {
  return (
    <div className="flex h-screen">
      <NavBar></NavBar>
      <Image
        src={myBg}
        alt="bg"
        className="w-full h-full object-cover object-center -z-10 absolute opacity-30"
      />
      <main className="flex-grow flex items-center justify-center mx-4">
        <Questionnaire />
      </main>
    </div>
  );
};

export default HomePage;
