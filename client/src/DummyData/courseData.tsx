// Define interfaces for the data structure
import image from "./courseImage.jpg"
export interface Instructor {
    name: string;
    image: string;
  }
  
  export interface Lesson {
    lessonId: number;
    title: string;
    duration: string; // e.g., "15 min"
  }
  
  export interface Course {
    id: number;
    title: string;
    description: string;
    instructor: Instructor;
    rating: number; // e.g., 4.8
    totalRatings: number; // e.g., 1200
    price: number; // e.g., 49.99
    discountPrice: number; // e.g., 29.99
    duration: string; // e.g., "12 hours"
    level: string; // e.g., "Beginner"
    language: string; // e.g., "English"
    categories: string[]; // e.g., ["Web Development", "Programming"]
    lessons: Lesson[];
  }
  
  // Create dummy data for two courses
  export const coursesData: Course[] = [
    {
      id: 1,
      title: "Introduction to JavaScript",
      description: "A comprehensive course on JavaScript for beginners, covering the fundamentals of programming, syntax, and building interactive web pages.",
      instructor: {
        name: "John Doe",
        image: image,
      },
      rating: 4.8,
      totalRatings: 1200,
      price: 49.99,
      discountPrice: 29.99,
      duration: "12 hours",
      level: "Beginner",
      language: "English",
      categories: ["Web Development", "Programming"],
      lessons: [
        {
          lessonId: 1,
          title: "Introduction to JavaScript and Setup",
          duration: "15 min",
        },
        {
          lessonId: 2,
          title: "Variables and Data Types",
          duration: "20 min",
        },
        {
          lessonId: 3,
          title: "Functions and Scope",
          duration: "25 min",
        },
        {
          lessonId: 4,
          title: "DOM Manipulation",
          duration: "30 min",
        },
        {
          lessonId: 5,
          title: "Events and Event Handling",
          duration: "30 min",
        },
      ],
    },
    {
      id: 2,
      title: "Advanced CSS Techniques",
      description: "Learn advanced CSS techniques, including Flexbox, Grid, animations, and responsive design to create stunning websites.",
      instructor: {
        name: "Jane Smith",
        image: image,
      },
      rating: 4.7,
      totalRatings: 900,
      price: 59.99,
      discountPrice: 39.99,
      duration: "10 hours",
      level: "Intermediate",
      language: "English",
      categories: ["Web Development", "Design"],
      lessons: [
        {
          lessonId: 1,
          title: "CSS Flexbox Layout",
          duration: "20 min",
        },
        {
          lessonId: 2,
          title: "CSS Grid Layout",
          duration: "30 min",
        },
        {
          lessonId: 3,
          title: "CSS Animations and Transitions",
          duration: "25 min",
        },
        {
          lessonId: 4,
          title: "Responsive Design Principles",
          duration: "30 min",
        },
        {
          lessonId: 5,
          title: "Working with Pseudo-classes and Pseudo-elements",
          duration: "20 min",
        },
      ],
    },
    {
      id: 3,
      title: "React for Beginners",
      description: "This course introduces you to React, a popular JavaScript library for building user interfaces. You will learn about components, props, state, and lifecycle methods.",
      instructor: {
        name: "Emily Johnson",
        image: image,
      },
      rating: 4.9,
      totalRatings: 1500,
      price: 69.99,
      discountPrice: 49.99,
      duration: "15 hours",
      level: "Beginner",
      language: "English",
      categories: ["Web Development", "JavaScript"],
      lessons: [
        {
          lessonId: 1,
          title: "Getting Started with React",
          duration: "20 min",
        },
        {
          lessonId: 2,
          title: "Understanding Components",
          duration: "25 min",
        },
        {
          lessonId: 3,
          title: "Props and State",
          duration: "30 min",
        },
        {
          lessonId: 4,
          title: "Handling Events",
          duration: "30 min",
        },
        {
          lessonId: 5,
          title: "Lifecycle Methods in React",
          duration: "25 min",
        },
        {
          lessonId: 6,
          title: "Building a Simple Application",
          duration: "50 min",
        },
      ],
    },
  ];
  
  