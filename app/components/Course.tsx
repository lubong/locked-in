import { CareerHeader } from "./courses/career-header";
import { RecommendedCourses } from "./courses/recommended-courses";
import { Course } from "../career/[id]/courses/page";

interface CareerCourseProps {
  courses: Course[];
  title: string;
}
export default function CareerCoursePage({
  courses,
  title,
}: CareerCourseProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 text-white">
      <main className="container mx-auto px-4 py-8">
        <CareerHeader
          title={title}
          description={`Chart your course to becoming a skilled ${title}. Navigate through our comprehensive courses to master the seas.`}
          level={3}
          maxLevel={5}
        />
        <RecommendedCourses courses={courses} />
      </main>
    </div>
  );
}
