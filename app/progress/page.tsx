import React from "react";
import RoadMap from "../components/RoadMap";
import NavBar from "../components/NavBar";

const progress = () => {
  return (
    <div className="flex h-screen">
      <NavBar />
      <main className="h-screen">
        <RoadMap />
      </main>
    </div>
  );
};

export default progress;
