"use client";
import React, { useState, useRef, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

// Define Skill type
interface Skill {
  id: string;
  title: string;
  children: string[];
  parent: string | null;
}

async function customFetch(
  url: string,
  method: "GET" | "POST",
  bodyData?: Record<string, unknown>
) {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1]; // Retrieve the token from cookies

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // Add the Bearer token here
  };

  const options: RequestInit = {
    method,
    headers,
  };

  if (method === "POST" && bodyData) {
    options.body = JSON.stringify(bodyData);
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch from ${url}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

// Node properties
interface SkillNodeProps {
  skill: Skill;
  x: number;
  y: number;
  onToggle: (id: string) => void;
  isExpanded: boolean;
  expandedNodes: Set<string>;
  parentAngle?: number; // Optional prop to pass the angle from the parent
  skills: Skill[];
}

const SkillNode: React.FC<SkillNodeProps> = ({
  skill,
  x,
  y,
  onToggle,
  isExpanded,
  expandedNodes,
  parentAngle,
  skills,
}) => {
  const childSkills = skills.filter((s) => skill.children.includes(s.id));
  console.log(childSkills);
  const distributeChildrenEvenly = () => {
    const numChildren = childSkills.length;
    const angleStep = (2 * Math.PI) / numChildren;
    return childSkills.map((childSkill, index) => {
      const angle = index * angleStep;
      const radius = numChildren < 3 ? 240 : numChildren * 60;
      return {
        skill: childSkill,
        x: x + radius * Math.cos(angle),
        y: y + radius * Math.sin(angle),
        angle: angle,
      };
    });
  };

  const distributeChildrenInSector = () => {
    const numChildren = childSkills.length;
    const sectorAngle = (numChildren * 35 * Math.PI) / 180;
    const halfSector = sectorAngle / 2;
    const startAngle = (parentAngle ?? 0) - halfSector;
    const endAngle = (parentAngle ?? 0) + halfSector;
    const angleStep = (endAngle - startAngle) / (numChildren || 1);
    return childSkills.map((childSkill, index) => {
      const angle = startAngle + index * angleStep;
      const radius = numChildren < 3 ? 240 : numChildren * 80;
      return {
        skill: childSkill,
        x: x + radius * Math.cos(angle),
        y: y + radius * Math.sin(angle),
        angle: angle,
      };
    });
  };

  const childPositions =
    parentAngle === undefined
      ? distributeChildrenEvenly()
      : distributeChildrenInSector();

  return (
    <g>
      {/* Render lines first to place them behind nodes */}
      {isExpanded &&
        childPositions.map(({ skill: childSkill, x: childX, y: childY }) => (
          <line
            key={`${skill.id}-line-${childSkill.id}`}
            x1={x + 100}
            y1={y + 60}
            x2={childX + 100}
            y2={childY + 60}
            stroke="#90CDF4"
            strokeWidth={2}
          />
        ))}

      {/* Render the current node */}
      <foreignObject
        x={x}
        y={y}
        width={200}
        height={120}
        onClick={() => onToggle(skill.id)}
      >
        <div className="p-2 bg-blue-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-2 border-blue-300 cursor-pointer">
          <h3 className="text-sm font-semibold mb-1 text-blue-800">
            {skill.title}
          </h3>
          <Progress value={100} className="h-2 mb-1" />
          <div className="flex justify-between items-center">
            <Badge
              variant={100 === 100 ? "default" : "secondary"}
              className="bg-blue-500 text-xs"
            >
              {100}%
            </Badge>
            {100 === 100 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-yellow-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
              </svg>
            )}
          </div>
        </div>
      </foreignObject>

      {/* Recursively render child nodes */}
      {isExpanded &&
        childPositions.map(
          ({ skill: childSkill, x: childX, y: childY, angle }) => (
            <SkillNode
              key={childSkill.id}
              skill={childSkill}
              x={childX}
              y={childY}
              onToggle={onToggle}
              isExpanded={expandedNodes.has(childSkill.id)}
              expandedNodes={expandedNodes}
              parentAngle={angle}
              skills={skills}
            />
          )
        )}
    </g>
  );
};

// Main component
export default function MaritimeSkillsMindmap() {
  const [skills, setSkills] = useState<Skill[]>([]); // Use the Skill type here
  useEffect(() => {
    // Define the async function inside useEffect
    const fetchSkills = async () => {
      try {
        const data = await customFetch(
          "https://psacodesprint.vercel.app/progress",
          "GET"
        );
        setSkills(data.progress);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchSkills(); // Call the async function
  }, []); // Empty dependency array to run once when the component mounts

  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set(["33993654-5a89-4246-a34c-4e8691afba7a"]) // Example root node
  );
  const [viewBox, setViewBox] = useState("0 0 2000 1000");
  const svgRef = useRef<SVGSVGElement>(null);

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const rootSkill = skills.find((skill) => skill.parent === null);

  // Update the SVG viewBox to fit the nodes
  useEffect(() => {
    if (svgRef.current) {
      const bbox = svgRef.current.getBBox();
      setViewBox(`${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
    }
  }, [expandedNodes]);
  console.log(rootSkill);

  if (!rootSkill) return null;

  return (
    <div className="p-6  h-screen w-full overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-800 absolute mt-5">
          Your Voyages
        </h2>
      </div>
      {/* Adjust SVG size based on the viewBox */}
      <div>
        <svg
          ref={svgRef}
          width="100%"
          height="1000"
          viewBox={viewBox}
          xmlns="http://www.w3.org/2000/svg"
        >
          <SkillNode
            skill={rootSkill}
            x={1000} // Center node
            y={200} // Adjust y position
            onToggle={toggleNode}
            isExpanded={expandedNodes.has(rootSkill.id)}
            expandedNodes={expandedNodes}
            skills={skills}
          />
        </svg>
      </div>
    </div>
  );
}
