"use client";

import React from "react";
import Image from "next/image";
import myBg from "../public/images/maritime-bg.jpg";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <main className="grid grid-cols-3 min-h-screen">
      <div className="col-span-2">
        <Image
          src={myBg}
          alt="bg"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grow h-screen col-span-1 flex items-center justify-center shadow-lg bg-gradient-to-br from-orange-300 via-pink-100 to-blue-300">
        <div className="w-full lg:w-3/5 p-6 rounded">
          <LoginForm />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
