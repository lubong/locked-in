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
  List,
} from "lucide-react";
import logo from "../public/images/psa-logo.png";
import Image from "next/image";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Navbar() {
  return (
    <nav className="w-fit fixed h-screen bg-gradient-to-b from-blue-300 to-blue-500 shadow-lg p-4">
      <div className="flex flex-col items-center h-full">
        <Link href="/home">
          <Image
            src={logo}
            alt="PSA Logo"
            className="filter brightness-150 contrast-125 invert mb-4 w-11"
          />
        </Link>

        {/* Navigation Cards */}
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col space-y-4">
            <Link href="/profile">
              <NavItem icon={<User className="w-5 h-5" />} label="Profile" />
            </Link>
            <Link href="/progress">
              <NavItem
                icon={<BarChart className="w-5 h-5" />}
                label="Progress"
              />
            </Link>
            <Link href="/jobs">
              <NavItem icon={<Briefcase className="w-5 h-5" />} label="Jobs" />
            </Link>
            <Link href="/courses">
              <NavItem
                icon={<BookOpen className="w-5 h-5" />}
                label="Courses"
              />
            </Link>
            <Link href="/performance-review">
              <NavItem
                icon={<Clipboard className="w-5 h-5" />}
                label="Performance Review"
              />
            </Link>
          </div>
          <div className="flex flex-col space-y-4 items-end">
            <Link href="/questionnaire">
              <NavItem
                icon={<List className="w-5 h-5" />}
                label="Questionnaire"
              />
            </Link>
            <Link href="/language">
              <NavItem icon={<Globe className="w-5 h-5" />} label="Language" />
            </Link>
            <Link href="/settings">
              <NavItem
                icon={<Settings className="w-5 h-5" />}
                label="Settings"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Navigation Item Component with Tooltip
const NavItem = ({
  icon,
  label,
}: {
  icon: React.ReactElement;
  label: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <div className="bg-blue-100 hover:bg-white rounded-lg shadow p-3 flex items-center space-x-2 transition-transform transform hover:scale-105">
            {icon}
          </div>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
