import type { User } from "firebase/auth";
import type { Edge, Node } from "reactflow";

export interface UserModel {
  _id: string;
  uid: string;
  name: string;
  email: string;
  created_at: Date;
  phone_number?: string;
  account_type: "instructor" | "student" | "admin";
  summary?: string;
  profile_picture_url?: string;
  gender?: "male" | "female" | "other";
  location?: string;
  date_of_birth?: Date;
  subscribed_at?: Date;
  education_history?: Education[];
  skills?: Skill[];
  socials?: Social[];
  languages?: Language[];
  courses_enrolled_in?: Course[];
  roadmaps?: Roadmap[];
}

interface Education {
  institution: string;
  course: string;
  specialization: string;
  start_date: Date;
  end_date: Date;
  _score: number;
}

interface Skill {
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  years_of_experience?: number;
}

interface Social {
  name: string;
  url: string;
}

interface Language {
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "native";
}

interface Course {
  _id: string;
  _progress: number;
  started_at: Date;
  completed_at?: Date;
  course_type: "activated" | "bought" | null;
}

interface Roadmap {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  last_modified: Date;
  owner_id: string;
  is_public: boolean;
  is_template: boolean;
  tags: string[];
  learning_path: LearningPath;
  nodes?: Node[];
  edges?: Edge[];
  progress: number;
  status: "not-started" | "in-progress" | "completed";
  shared_with?: string[]; // Array of user IDs
}

export interface AuthContextType {
  userData: UserModel | User | null;
  isAuthenticated: boolean;
  logout: () => void;
}

export interface Subtopic {
  name: string;
  description: string;
  estimatedTime: string;
  technologiesAndConcepts: string[];
  prerequisites: string[];
  resources: string[];
  status?: "not-started" | "in-progress" | "completed";
}

export interface Topic {
  name: string;
  description: string;
  estimatedTime: string;
  subtopics: Subtopic[];
  status?: "not-started" | "in-progress" | "completed";
}

export interface LearningPath {
  name: string;
  description: string;
  estimatedTime: string;
  topics: Topic[];
  status?: "not-started" | "in-progress" | "completed";
}

// Update the NodeData interface to include id and position properties
export interface NodeData {
  label: string;
  description: string;
  estimatedTime: string;
  resources?: string[];
  prerequisites?: string[];
  technologiesAndConcepts?: string[];
  status?: "not-started" | "in-progress" | "completed";
  type?: "main" | "topic" | "subtopic" | "custom";
  progress?: number;
  statusExplicitlySet?: boolean;
  // Add these properties to match ReactFlow Node structure
  id?: string;
  position?: { x: number; y: number };
}

// Update the SavedRoadmap interface to use NodeData[] instead of Node[]
export interface SavedRoadmap {
  id: string;
  learningPath: LearningPath;
  nodes?: NodeData[]; // Changed from Node[] to NodeData[]
  edges?: Edge[];
  createdAt: number;
  lastModified: number;
  prompt: string;
}

// Update RoadmapState to reflect the change
export interface RoadmapState {
  currentRoadmap: SavedRoadmap | null;
  savedRoadmaps: SavedRoadmap[];
  loading: boolean;
  error: string | null;
  prompt: string | null;
  owner_id?: string;
  is_public?: boolean;
  is_template?: boolean;
  tags?: string[];
  shared_with?: string[];
  progress?: number;
}
