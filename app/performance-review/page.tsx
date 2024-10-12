import React from "react";
import NavBar from "../components/NavBar";
import PerformanceReview from "../components/PerformanceReview";

const performancereview = () => {
  return (
    <div className="flex h-screen">
      <NavBar></NavBar>
      <main className="ml-20 w-full">
        <PerformanceReview />
      </main>
    </div>
  );
};

export default performancereview;
