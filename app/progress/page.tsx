import React from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Anchor, Compass, Map } from "lucide-react";

// Define the Skill type
interface Skill {
  id: number;
  title: string;
  progress: number;
  children: number[];
}

const skills: Skill[] = [
  { id: 1, title: "Front-end Basics", progress: 100, children: [2, 3, 4] },
  { id: 2, title: "HTML", progress: 80, children: [5, 6, 7, 8, 9] },
  { id: 3, title: "CSS", progress: 60, children: [10, 11, 12] },
  {
    id: 4,
    title: "Internet",
    progress: 70,
    children: [13, 14, 15, 16, 17, 18],
  },
  { id: 5, title: "Learn the basics", progress: 100, children: [] },
  { id: 6, title: "Writing Semantic HTML", progress: 90, children: [] },
];

interface SkillIslandProps {
  skill: Skill; // Specify the type of skill
  level?: number;
}

const SkillIsland: React.FC<SkillIslandProps> = ({ skill, level = 0 }) => {
  const childSkills = skills.filter((s) => skill.children.includes(s.id));

  return (
    <div className="relative">
      <div
        className={`p-4 bg-blue-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-4 border-2 border-blue-300 ${
          level > 0 ? "ml-16" : ""
        }`}
      >
        <h3 className="text-lg font-semibold mb-2 text-blue-800">
          {skill.title}
        </h3>
        <Progress value={skill.progress} className="h-2 mb-2" />
        <div className="flex justify-between items-center">
          <Badge
            variant={skill.progress === 100 ? "default" : "secondary"}
            className="bg-blue-500"
          >
            {skill.progress}% Complete
          </Badge>
          {skill.progress === 100 && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-yellow-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
            </svg>
          )}
        </div>
      </div>
      {childSkills.length > 0 && (
        <div className="relative">
          {childSkills.map((childSkill) => (
            <React.Fragment key={childSkill.id}>
              <svg
                className="absolute top-0 left-8 -mt-4"
                width="32"
                height="48"
                viewBox="0 0 32 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 0V32C16 40.8366 23.1634 48 32 48"
                  stroke="#90CDF4"
                  strokeWidth="2"
                />
                <path
                  d="M14 16L18 20L14 24"
                  stroke="#3182CE"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <SkillIsland skill={childSkill} level={level + 1} />
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default function MaritimeSkillsRoadmap() {
  const rootSkills = skills.filter(
    (skill) => !skills.some((s) => s.children.includes(skill.id))
  );

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-800">
            Maritime Skills Voyage
          </h2>
          <div className="flex space-x-4">
            <Compass className="text-blue-500" />
            <Map className="text-blue-500" />
            <Anchor className="text-blue-500" />
          </div>
        </div>
        <div className="space-y-6">
          {rootSkills.map((skill) => (
            <SkillIsland key={skill.id} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}
