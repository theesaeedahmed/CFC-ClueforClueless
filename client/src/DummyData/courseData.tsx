import resumeImage from "./courseImage.jpg"
import enrolledImage from "./EnrolledCourseImage.jpg"
import recommendedImage from "./recommend.jpg"
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: {
      name: string;
      image: string;
  };
  duration: string;
  level: string;
  rating: number;  // Rating field added
}

export interface Topic{
  id:number;
  title:string;
}

export const topicsData: Topic[] = [
  {id:1,title:"Artificial Intelligence"},
  {id:2,title:"System Design"},
  {id:3,title:"Web Development"},
  {id:4,title:"Python"},
]

export const resumeCoursesData: Course[] = [
  {
      id: "course1",
      title: "Mastering React for Frontend Development",
      description: "Dive deep into React and build powerful front-end applications with ease. Learn state management, hooks, and component-driven architecture.",
      instructor: {
          name: "Sarah Lee",
          image: resumeImage,
      },
      duration: "12 hours",
      level: "Intermediate",
      rating: 4.8
  },
  {
      id: "course2",
      title: "Data Science and Machine Learning with Python",
      description: "Learn how to analyze data, perform complex computations, and build machine learning models using Python libraries like NumPy, Pandas, and Scikit-learn.",
      instructor: {
          name: "Dr. John Smith",
          image: resumeImage,
      },
      duration: "18 hours",
      level: "Advanced",
      rating: 4.9
  },
  {
      id: "course3",
      title: "UI/UX Design Principles for Modern Web Applications",
      description: "A comprehensive guide to user interface and user experience design for web applications. Learn wireframing, prototyping, and user research.",
      instructor: {
          name: "Jessica Wong",
          image: resumeImage,
      },
      duration: "10 hours",
      level: "Beginner",
      rating: 4.7
  },]

  export const enrolledCoursesData: Course[] = [
  {
      id: "course4",
      title: "DevOps: From Continuous Integration to Deployment",
      description: "Master DevOps practices, including continuous integration, deployment pipelines, monitoring, and automated infrastructure.",
      instructor: {
          name: "Mark Johnson",
          image: enrolledImage,
      },
      duration: "15 hours",
      level: "Intermediate",
      rating: 4.6
  },
  {
      id: "course5",
      title: "Full-Stack Web Development with MERN",
      description: "Learn to build full-stack applications using MongoDB, Express.js, React, and Node.js with hands-on projects.",
      instructor: {
          name: "Rachel Adams",
          image: enrolledImage,
      },
      duration: "25 hours",
      level: "Advanced",
      rating: 4.9
  },
  {
    id: "course2",
    title: "Data Science and Machine Learning with Python",
    description: "Learn how to analyze data, perform complex computations, and build machine learning models using Python libraries like NumPy, Pandas, and Scikit-learn.",
    instructor: {
        name: "Dr. John Smith",
        image: resumeImage,
    },
    duration: "18 hours",
    level: "Advanced",
    rating: 4.9
  },
  {
      id: "course6",
      title: "JavaScript Essentials: ES6 to ES2021",
      description: "Master modern JavaScript and its latest features from ES6 to ES2021, including promises, async/await, and arrow functions.",
      instructor: {
          name: "David King",
          image: enrolledImage,
      },
      duration: "8 hours",
      level: "Beginner",
      rating: 4.8
  },
  {
      id: "course7",
      title: "Cloud Computing with AWS",
      description: "Understand cloud architecture, EC2, S3, RDS, and other AWS services to build scalable and highly available applications.",
      instructor: {
          name: "Emily Brown",
          image: enrolledImage,
      },
      duration: "20 hours",
      level: "Intermediate",
      rating: 4.7
  },

  {
      id: "course8",
      title: "Cybersecurity Fundamentals",
      description: "Explore the basics of cybersecurity, including threat modeling, risk assessment, and basic security tools and practices.",
      instructor: {
          name: "Robert Garcia",
          image: enrolledImage,
      },
      duration: "14 hours",
      level: "Beginner",
      rating: 4.6
  },
  {
      id: "course9",
      title: "Blockchain Development with Solidity",
      description: "Build decentralized applications and smart contracts using Solidity, and understand blockchain technologies.",
      instructor: {
          name: "Sophia Green",
          image: enrolledImage,
      },
      duration: "16 hours",
      level: "Advanced",
      rating: 4.9
  },
  {
    id: "course3",
    title: "UI/UX Design Principles for Modern Web Applications",
    description: "A comprehensive guide to user interface and user experience design for web applications. Learn wireframing, prototyping, and user research.",
    instructor: {
        name: "Jessica Wong",
        image: resumeImage,
    },
    duration: "10 hours",
    level: "Beginner",
    rating: 4.7
  },
]

export const RecommendCoursesData: Course[] = [
  

  {
      id: "course10",
      title: "Mobile App Development with Flutter",
      description: "Develop high-performance, cross-platform mobile applications using Flutter and Dart with this hands-on course.",
      instructor: {
          name: "Michael Harris",
          image: recommendedImage,
      },
      duration: "22 hours",
      level: "Intermediate",
      rating: 4.8
  },
  {
    id: "course11",
    title: "Cybersecurity for Beginners",
    instructor: {
      name: "Dr. Amanda Shields",
      image: recommendedImage,
    },
    description: "Understand the fundamentals of cybersecurity, including encryption, network security, threat detection, and risk management.",
    rating: 4.6,
    duration: "6 weeks",
    level: "Beginner",
  }
];

