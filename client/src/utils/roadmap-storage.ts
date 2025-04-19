import type { LearningPath, SavedRoadmap, RoadmapState } from "../lib/types";
import type { Edge } from "reactflow";

// Storage keys
const ROADMAP_STORAGE_KEY = "cfc-roadmap-data";
const ROADMAPS_COLLECTION_KEY = "cfc-roadmaps-collection";

// Generate a unique ID for a roadmap
export function generateRoadmapId(learningPath: LearningPath): string {
  const namePart = learningPath.name
    ? learningPath.name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .substring(0, 30)
    : "unnamed";
  const timePart = learningPath.estimatedTime
    ? learningPath.estimatedTime
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .substring(0, 10)
    : "notime";
  const randomPart = Math.random().toString(36).substring(2, 10);
  const timestamp = Date.now().toString(36);

  return `${namePart}-${timePart}-${randomPart}-${timestamp}`;
}

// Initialize roadmap state from localStorage
export function initRoadmapState(): RoadmapState {
  try {
    const storedData = localStorage.getItem(ROADMAP_STORAGE_KEY);
    if (storedData) {
      return JSON.parse(storedData);
    }
  } catch (error) {
    console.error("Error loading roadmap data from localStorage:", error);
  }

  return {
    currentRoadmap: null,
    savedRoadmaps: [],
    loading: false,
    error: null,
    prompt: null,
  };
}

// Save roadmap state to localStorage
export function saveRoadmapState(state: RoadmapState): void {
  try {
    localStorage.setItem(ROADMAP_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Error saving roadmap data to localStorage:", error);
  }
}

// Create a new roadmap
export function createRoadmap(learningPath: LearningPath): SavedRoadmap {
  console.log("Creating roadmap with learning path:", learningPath);

  // Ensure the learning path has all required properties
  if (!learningPath.name) {
    learningPath.name = "Unnamed Roadmap";
  }

  if (!learningPath.description) {
    learningPath.description = "No description provided";
  }

  if (!learningPath.estimatedTime) {
    learningPath.estimatedTime = "Unknown";
  }

  if (!learningPath.topics || !Array.isArray(learningPath.topics)) {
    learningPath.topics = [];
  }

  const now = Date.now();
  const newRoadmap = {
    id: generateRoadmapId(learningPath),
    learningPath,
    nodes: [],
    edges: [],
    createdAt: now,
    lastModified: now,
    prompt: "",
  };

  console.log("Created new roadmap:", newRoadmap);

  // Save to collection
  saveRoadmapToStorage(newRoadmap);

  return newRoadmap;
}

// Save current roadmap
export function saveCurrentRoadmap(
  state: RoadmapState,
  nodes?: any[],
  edges?: Edge[]
): RoadmapState {
  if (!state.currentRoadmap) return state;

  const now = Date.now();
  const updatedRoadmap: SavedRoadmap = {
    ...state.currentRoadmap,
    nodes: nodes || state.currentRoadmap.nodes,
    edges: edges || state.currentRoadmap.edges,
    lastModified: now,
  };

  // Remove any existing version of this roadmap
  const filteredRoadmaps = state.savedRoadmaps.filter(
    (roadmap) => roadmap.id !== updatedRoadmap.id
  );

  // Add the updated roadmap
  const newState: RoadmapState = {
    currentRoadmap: updatedRoadmap,
    savedRoadmaps: [...filteredRoadmaps, updatedRoadmap],
    loading: false,
    error: null,
    prompt: state.prompt,
  };

  // Save to collection
  saveRoadmapToStorage(updatedRoadmap);

  // Save state
  saveRoadmapState(newState);

  return newState;
}

// Get a roadmap by ID
export function getRoadmapById(
  state: RoadmapState,
  id: string
): SavedRoadmap | null {
  console.log("Getting roadmap by ID:", id);

  // First check current roadmap
  if (state.currentRoadmap && state.currentRoadmap.id === id) {
    console.log("Found roadmap in current roadmap");
    return state.currentRoadmap;
  }

  // Then check saved roadmaps in state
  const fromState = state.savedRoadmaps.find((roadmap) => roadmap.id === id);
  if (fromState) {
    console.log("Found roadmap in saved roadmaps");
    return fromState;
  }

  // Finally check localStorage
  try {
    const storedRoadmap = localStorage.getItem(
      `${ROADMAPS_COLLECTION_KEY}-${id}`
    );
    if (storedRoadmap) {
      console.log("Found roadmap in localStorage");
      const parsedRoadmap = JSON.parse(storedRoadmap);

      // Ensure the roadmap has all required properties
      if (!parsedRoadmap.learningPath) {
        console.error("Invalid roadmap data in localStorage:", parsedRoadmap);
        return null;
      }

      return parsedRoadmap;
    }
  } catch (error) {
    console.error(`Error loading roadmap ${id} from localStorage:`, error);
  }

  console.log("Roadmap not found");
  return null;
}

// Set current roadmap
export function setCurrentRoadmap(
  state: RoadmapState,
  roadmap: SavedRoadmap | null
): RoadmapState {
  console.log("Setting current roadmap:", roadmap);

  const newState = {
    ...state,
    currentRoadmap: roadmap,
  };

  saveRoadmapState(newState);
  return newState;
}

// Clear current roadmap
export function clearCurrentRoadmap(state: RoadmapState): RoadmapState {
  const newState = {
    ...state,
    currentRoadmap: null,
  };

  saveRoadmapState(newState);
  return newState;
}

// Save a roadmap to localStorage collection
export function saveRoadmapToStorage(roadmap: SavedRoadmap): void {
  try {
    console.log("Saving roadmap to localStorage:", roadmap);
    localStorage.setItem(
      `${ROADMAPS_COLLECTION_KEY}-${roadmap.id}`,
      JSON.stringify(roadmap)
    );

    // Update the index of all roadmaps
    const indexKey = `${ROADMAPS_COLLECTION_KEY}-index`;
    let index: string[] = [];
    try {
      const storedIndex = localStorage.getItem(indexKey);
      if (storedIndex) {
        index = JSON.parse(storedIndex);
      }
    } catch (e) {
      console.error("Error parsing roadmap index:", e);
    }

    if (!index.includes(roadmap.id)) {
      index.push(roadmap.id);
      localStorage.setItem(indexKey, JSON.stringify(index));
    }
  } catch (error) {
    console.error(`Error saving roadmap ${roadmap.id} to localStorage:`, error);
  }
}

// Remove a roadmap from localStorage collection
export function removeRoadmapFromStorage(id: string): void {
  try {
    localStorage.removeItem(`${ROADMAPS_COLLECTION_KEY}-${id}`);

    // Update the index
    const indexKey = `${ROADMAPS_COLLECTION_KEY}-index`;
    let index: string[] = [];
    try {
      const storedIndex = localStorage.getItem(indexKey);
      if (storedIndex) {
        index = JSON.parse(storedIndex);
      }
    } catch (e) {
      console.error("Error parsing roadmap index:", e);
    }

    index = index.filter((roadmapId) => roadmapId !== id);
    localStorage.setItem(indexKey, JSON.stringify(index));
  } catch (error) {
    console.error(`Error removing roadmap ${id} from localStorage:`, error);
  }
}

// Get all roadmaps from localStorage collection
export function getAllRoadmaps(): SavedRoadmap[] {
  const roadmaps: SavedRoadmap[] = [];

  try {
    const indexKey = `${ROADMAPS_COLLECTION_KEY}-index`;
    const storedIndex = localStorage.getItem(indexKey);

    if (storedIndex) {
      const index: string[] = JSON.parse(storedIndex);
      console.log("Found roadmap index:", index);

      for (const id of index) {
        const storedRoadmap = localStorage.getItem(
          `${ROADMAPS_COLLECTION_KEY}-${id}`
        );
        if (storedRoadmap) {
          roadmaps.push(JSON.parse(storedRoadmap));
        }
      }
    }

    console.log("Retrieved all roadmaps:", roadmaps);
  } catch (error) {
    console.error("Error loading roadmaps from localStorage:", error);
  }

  return roadmaps;
}
