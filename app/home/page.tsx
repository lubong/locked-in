import React from "react";
import Questionnaire from "../components/Questionnaire";
import NavBar from "../components/NavBar";

const HomePage = () => {
  return (
    <div className="flex h-screen">
      <NavBar></NavBar>
      <main className="flex-grow flex items-center justify-center mx-4">
        <Questionnaire />
      </main>
    </div>
  );
};

export default HomePage;
