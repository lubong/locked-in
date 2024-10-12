"use client";
import React from "react";
import {
  User,
  BarChart,
  Briefcase,
  BookOpen,
  Clipboard,
  Settings,
  Globe,
} from "lucide-react";
import logo from "../public/images/psa-logo.png";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-fit h-full bg-gradient-to-b from-blue-200 to-blue-500 shadow-lg p-4">
      <div className="flex flex-col items-center">
        <Image
          src={logo}
          alt="PSA Logo"
          className="filter brightness-150 contrast-125 invert mb-4 w-11"
        />

        {/* Navigation Cards */}
        <div className="flex flex-col justify-between">
          <div className="flex flex-col space-y-4">
            <NavItem icon={<User className="w-5 h-5" />} label="Profile" />
            <NavItem icon={<BarChart className="w-5 h-5" />} label="Progress" />
            <NavItem icon={<Briefcase className="w-5 h-5" />} label="Jobs" />
            <NavItem icon={<BookOpen className="w-5 h-5" />} label="Courses" />
            <NavItem
              icon={<Clipboard className="w-5 h-5" />}
              label="Performance Review"
            />
          </div>
          <div className="flex flex-col space-y-4">
            <NavItem icon={<Globe className="w-5 h-5" />} label="Language" />
            <NavItem icon={<Settings className="w-5 h-5" />} label="Settings" />
          </div>
        </div>
      </div>
    </nav>
  );
}

// Navigation Item Component
const NavItem = ({ icon }: { icon: React.ReactElement; label: string }) => {
  return (
    <div className="bg-blue-100 hover:bg-white rounded-lg shadow p-3 flex items-center space-x-2 transition-transform transform hover:scale-105">
      {icon}
    </div>
  );
};
