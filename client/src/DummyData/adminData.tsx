interface Course { 
  id: number;
  title: string;
  thumbnail: string;
  category: string;
  price: string;
  description: string;
  moduleName: string;
  sectionName: string;
  isPublished: boolean;
}

const adminData: Course[] = [
  {
    id: 1,
    title: "React for Beginners",
    thumbnail: "https://img.icons8.com/color/480/react-native.png",
    category: "Web Development",
    price: "$49",
    description: "Learn the basics of React.js in this beginner-friendly course.",
    moduleName: "Module 1: Getting Started",
    sectionName: "Section 1: Introduction to React",
    isPublished: true,
  },
  {
    id: 2,
    title: "Advanced Node.js",
    thumbnail: "https://img.icons8.com/color/480/nodejs.png",
    category: "Backend Development",
    price: "$79",
    description: "Master Node.js with advanced topics and projects.",
    moduleName: "Module 3: Asynchronous Programming",
    sectionName: "Section 2: Async Await and Promises",
    isPublished: false,
  },
  {
    id: 3,
    title: "JavaScript Mastery",
    thumbnail: "https://img.icons8.com/color/480/javascript.png",
    category: "Frontend Development",
    price: "$59",
    description: "Become a JavaScript pro with in-depth modules and exercises.",
    moduleName: "Module 2: JavaScript Advanced Concepts",
    sectionName: "Section 4: Closure, Hoisting, and Scope",
    isPublished: false,
  },
  {
    id: 4,
    title: "Full-Stack Development Bootcamp",
    thumbnail: "https://img.icons8.com/color/480/stacked.png",
    category: "Full-Stack Development",
    price: "$99",
    description: "Learn how to build full-stack applications with MERN stack.",
    moduleName: "Module 5: Building RESTful APIs",
    sectionName: "Section 3: Integrating Frontend with Backend",
    isPublished: true,
  },
  {
    id: 5,
    title: "Python for Data Science",
    thumbnail: "https://img.icons8.com/color/480/python.png",
    category: "Data Science",
    price: "$89",
    description: "Understand Python and its libraries for data science applications.",
    moduleName: "Module 4: Data Analysis with Pandas",
    sectionName: "Section 2: Working with DataFrames",
    isPublished: false,
  },
  {
    id: 6,
    title: "Machine Learning A-Z",
    thumbnail: "https://img.icons8.com/color/480/machine-learning.png",
    category: "Artificial Intelligence",
    price: "$129",
    description: "Comprehensive course on machine learning from basic to advanced.",
    moduleName: "Module 6: Supervised Learning",
    sectionName: "Section 4: Regression Models",
    isPublished: true,
  },
  {
    id: 7,
    title: "UI/UX Design for Beginners",
    thumbnail: "https://img.icons8.com/color/480/ui-design.png",
    category: "Design",
    price: "$45",
    description: "Learn the basics of UI/UX design, wireframing, and prototyping.",
    moduleName: "Module 2: Designing User Interfaces",
    sectionName: "Section 3: Wireframes and Prototypes",
    isPublished: true,
  },
  {
    id: 8,
    title: "Cybersecurity Essentials",
    thumbnail: "https://img.icons8.com/color/480/cyber-security.png",
    category: "Security",
    price: "$75",
    description: "Fundamentals of cybersecurity, including network security and cryptography.",
    moduleName: "Module 1: Introduction to Security",
    sectionName: "Section 2: Encryption Basics",
    isPublished: false,
  },
  {
    id: 9,
    title: "Introduction to Cloud Computing",
    thumbnail: "https://img.icons8.com/color/480/cloud-computing.png",
    category: "Cloud Computing",
    price: "$65",
    description: "Learn about cloud service models, architecture, and deployment strategies.",
    moduleName: "Module 1: Cloud Basics",
    sectionName: "Section 1: Understanding Cloud Computing",
    isPublished: true,
  },
  {
    id: 10,
    title: "Digital Marketing Mastery",
    thumbnail: "https://img.icons8.com/color/480/digital-marketing.png",
    category: "Marketing",
    price: "$89",
    description: "Comprehensive course covering SEO, content marketing, and social media.",
    moduleName: "Module 4: Marketing Strategies",
    sectionName: "Section 3: Leveraging Social Media",
    isPublished: false,
  }
];

export default adminData;
