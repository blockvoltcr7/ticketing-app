// course page
"use client";

import CourseForm from "./CourseForm";

const course_data = [
  {
    id: 1,
    name: "you vs you",
    duration: "1 hour",
  },
  {
    id: 2,
    name: "stay ready",
    duration: "2 hours",
  },
  {
    id: 3,
    name: "me vs me",
    duration: "3 hours",
  },
];

const Course = () => {
  return (
    <div>
      <h1>Course</h1>
      {course_data.map((course) => (
        <div key={course.id}>
          <h2>{course.name}</h2>
          <p>{course.duration}</p>
        </div>
      ))}

      <CourseForm />
    </div>
  );
};


export default Course;
