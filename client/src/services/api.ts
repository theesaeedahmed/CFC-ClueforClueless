// API service for roadmap-related operations

import type { LearningPath, SavedRoadmap, NodeData } from "@/lib/types";
import type { Edge } from "reactflow";

const ROADMAP_SVC_BASE_URL = "http://localhost:5001";

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

// Define a modified SavedRoadmap type for API operations
export interface ApiSavedRoadmap extends Omit<SavedRoadmap, "nodes"> {
  nodes?: NodeData[];
}

// Generic fetch function with error handling
async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${ROADMAP_SVC_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: data.message || "An error occurred",
        status: response.status,
      };
    }

    return {
      data,
      status: response.status,
    };
  } catch (error) {
    console.error("API error:", error);
    return {
      error: error instanceof Error ? error.message : "Network error",
      status: 500,
    };
  }
}

// Roadmap API functions
export const roadmapApi = {
  // Generate a roadmap
  generateRoadmap: async (prompt: string, userId?: string) => {
    return fetchApi("/roadmap", {
      method: "POST",
      body: JSON.stringify({ prompt, userId }),
    });
  },

  // Get all roadmaps for a user
  getUserRoadmaps: async (userId: string) => {
    return fetchApi(`/roadmaps?userId=${userId}`);
  },

  // Get a specific roadmap
  getRoadmap: async (roadmapId: string) => {
    return fetchApi(`/roadmaps/${roadmapId}`);
  },

  // Save a new roadmap
  saveRoadmap: async (
    userId: string,
    learningPath: LearningPath,
    prompt?: string
  ) => {
    return fetchApi("/roadmaps", {
      method: "POST",
      body: JSON.stringify({ userId, learningPath, prompt }),
    });
  },

  // Update an existing roadmap
  updateRoadmap: async (
    roadmapId: string,
    data: { nodes?: NodeData[]; edges?: Edge[] }
  ) => {
    return fetchApi(`/roadmaps/${roadmapId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  // Delete a roadmap
  deleteRoadmap: async (roadmapId: string) => {
    return fetchApi(`/roadmaps/${roadmapId}`, {
      method: "DELETE",
    });
  },
};
