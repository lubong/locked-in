import { CourseCard } from "./course-card";
import { Course } from "../../career/[id]/courses/page";

interface CareerCourseProps {
  courses: Course[];
}

export function RecommendedCourses({ courses }: CareerCourseProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-center">
        Recommended Courses
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </div>
  );
}
