"use client";
import React, { useState, useRef, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

// Define Skill type
interface Skill {
  id: string;
  title: string;
  children: string[];
}

const skills: Skill[] = [
  {
    id: "ff317335-130a-4c9f-800b-78ab9670c987",
    title: "Load Test Engineer",
    children: [],
  },
  {
    id: "b1dc6137-f3d9-4a12-a803-bde8fee32d6b",
    title: "Engineering Manager",
    children: [],
  },
  {
    id: "cc237671-ffb2-44de-a650-3f070a409c7a",
    title: "Portfolio Manager",
    children: [],
  },
  {
    id: "be664c16-58d4-46ff-a689-2c057523a2af",
    title: "DevOps Manager",
    children: [],
  },
  {
    id: "48960f10-e620-4d5a-b1ea-55cb448147fb",
    title: "Technical Architect",
    children: [],
  },
  {
    id: "9c6b1018-bce5-441e-813b-062ef649e6ed",
    title: "Cloud Consultant",
    children: [],
  },
  {
    id: "9792b13d-dd37-47dc-a378-640dbb793ddd",
    title: "Lead Software Engineer",
    children: [],
  },
  {
    id: "eafb28bb-813d-4299-9543-960382d344f1",
    title: "DevOps Engineer",
    children: [
      "62272ac0-7f27-43bc-9228-3b0b1f0eb9bb",
      "25fea4eb-f5ce-45a0-84fd-a9d1e140aeb3",
      "ffeee091-379b-4dcb-930a-8f38f4824ab2",
    ],
  },
  {
    id: "843f53c9-2d22-4398-ae73-5d0853f36017",
    title: "Cloud Engineer",
    children: [
      "20c8c807-5d29-4b95-8bfa-3fa2e977d1a7",
      "80cd0ca7-3328-4b6c-8432-5eced5343e6c",
      "a8d6d79a-38d4-4111-b479-7ac54790cf34",
      "7e7ee8bb-2bed-4c76-8026-bab852a5bd67",
    ],
  },
  {
    id: "20c8c807-5d29-4b95-8bfa-3fa2e977d1a7",
    title: "Cloud Solutions Architect",
    children: [],
  },
  {
    id: "c03f0866-e887-414e-bbd7-f28183eb0235",
    title: "System Architect",
    children: [],
  },
  {
    id: "3b1ef0ee-c603-4366-b706-c5f957abe6e7",
    title: "Quality Assurance Engineer",
    children: [],
  },
  {
    id: "d9815141-af2e-403a-ac04-6d1824cb68ee",
    title: "Site Reliability Engineer",
    children: [
      "ede2e089-ecc2-403f-b026-09f544f94ab5",
      "6a25c984-072a-4659-b012-04c3f0b83f62",
      "7f5ab6ed-8288-45ba-8429-5bab985cd19b",
      "843f53c9-2d22-4398-ae73-5d0853f36017",
      "11e2959e-c892-4d2e-a1e5-007134fddd26",
    ],
  },
  {
    id: "6bce1aa2-8580-4248-aed7-f99e9a0cd009",
    title: "Platform Engineer",
    children: [],
  },
  {
    id: "6a25c984-072a-4659-b012-04c3f0b83f62",
    title: "DevOps Engineer",
    children: [
      "a7c3da2f-ee4d-48c8-adfe-63b7a09e95a5",
      "00d8e8a3-f268-46ba-a5cd-dc0239b2d7f1",
      "6bce1aa2-8580-4248-aed7-f99e9a0cd009",
      "0d88bf53-1ae1-4ce6-878e-3b459392e72c",
    ],
  },
  {
    id: "0d88bf53-1ae1-4ce6-878e-3b459392e72c",
    title: "Site Reliability Manager",
    children: [],
  },
  {
    id: "7f5ab6ed-8288-45ba-8429-5bab985cd19b",
    title: "Software Engineer",
    children: [
      "9792b13d-dd37-47dc-a378-640dbb793ddd",
      "5cd1570c-c2d5-4c76-8acd-0e5024f24966",
      "b1dc6137-f3d9-4a12-a803-bde8fee32d6b",
      "ae3eda7e-07ac-4251-87ec-d3bc9e22cc4e",
    ],
  },
  {
    id: "62272ac0-7f27-43bc-9228-3b0b1f0eb9bb",
    title: "Cloud Architect",
    children: [],
  },
  {
    id: "80af71dc-9acb-4317-8019-d61a1e4c755f",
    title: "Solutions Architect",
    children: [],
  },
  {
    id: "a7c3da2f-ee4d-48c8-adfe-63b7a09e95a5",
    title: "DevOps Lead",
    children: [],
  },
  {
    id: "2aa75891-04e3-448a-8fbb-b27c442ac75a",
    title: "Software Engineer",
    children: [
      "cc8bef8d-e24d-4c68-af3b-35f9546a3a49",
      "e62ef9d9-17be-4cef-942e-928fb016300a",
      "c03f0866-e887-414e-bbd7-f28183eb0235",
    ],
  },
  {
    id: "ede2e089-ecc2-403f-b026-09f544f94ab5",
    title: "Senior Site Reliability Engineer",
    children: [
      "48960f10-e620-4d5a-b1ea-55cb448147fb",
      "be664c16-58d4-46ff-a689-2c057523a2af",
      "19737827-f018-41a2-930a-4317a667182d",
      "bd938268-9617-4c8f-8805-a1e4ac60b26d",
    ],
  },
  {
    id: "33993654-5a89-4246-a34c-4e8691afba7a",
    title: "Site Reliability Engineer",
    children: [
      "eafb28bb-813d-4299-9543-960382d344f1",
      "5cf4f73a-a932-4a79-957e-af818048da0c",
      "2aa75891-04e3-448a-8fbb-b27c442ac75a",
      "763f987d-c180-4b82-b5fe-a80d26e17b85",
      "46f076f8-624b-49df-9058-b2b7da36e14a",
    ],
  },
];

// Node properties
interface SkillNodeProps {
  skill: Skill;
  x: number;
  y: number;
  onToggle: (id: string) => void;
  isExpanded: boolean;
  expandedNodes: Set<string>;
  parentAngle?: number; // Optional prop to pass the angle from the parent
}

const SkillNode: React.FC<SkillNodeProps> = ({
  skill,
  x,
  y,
  onToggle,
  isExpanded,
  expandedNodes,
  parentAngle,
}) => {
  const childSkills = skills.filter((s) => skill.children.includes(s.id));

  const distributeChildrenEvenly = () => {
    const numChildren = childSkills.length;
    const angleStep = (2 * Math.PI) / numChildren;
    return childSkills.map((childSkill, index) => {
      const angle = index * angleStep;
      const radius = 250;
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
    const sectorAngle = (240 * Math.PI) / 180;
    const halfSector = sectorAngle / 2;
    const startAngle = (parentAngle ?? 0) - halfSector;
    const endAngle = (parentAngle ?? 0) + halfSector;
    const angleStep = (endAngle - startAngle) / (numChildren || 1);
    return childSkills.map((childSkill, index) => {
      const angle = startAngle + index * angleStep;
      const radius = 250;
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
            />
          )
        )}
    </g>
  );
};

// Main component
export default function MaritimeSkillsMindmap() {
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

  const rootSkill = skills.find(
    (skill) => skill.id === "33993654-5a89-4246-a34c-4e8691afba7a"
  );

  // Update the SVG viewBox to fit the nodes
  useEffect(() => {
    if (svgRef.current) {
      const bbox = svgRef.current.getBBox();
      setViewBox(`${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
    }
  }, [expandedNodes]);

  if (!rootSkill) return null;

  return (
    <div className="p-6 bg-blue-50 h-screen w-fit overflow-auto">
      <div className="max-w-full mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-800">Your Voyages</h2>
        </div>
        {/* Adjust SVG size based on the viewBox */}
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
          />
        </svg>
      </div>
    </div>
  );
}
