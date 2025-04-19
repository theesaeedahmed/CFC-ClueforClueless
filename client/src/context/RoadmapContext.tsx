"use client";

import type React from "react";
import {
  createContext,
  useReducer,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
  useRef,
} from "react";
import type {
  LearningPath,
  SavedRoadmap,
  RoadmapState,
  NodeData,
} from "../lib/types";
import type { Edge } from "reactflow";
import {
  initRoadmapState,
  createRoadmap,
  saveCurrentRoadmap,
  getRoadmapById,
  setCurrentRoadmap,
  clearCurrentRoadmap,
  getAllRoadmaps,
  saveRoadmapToStorage,
  removeRoadmapFromStorage,
} from "../utils/roadmap-storage";

// Define action types
type RoadmapAction =
  | { type: "SET_CURRENT_ROADMAP"; payload: SavedRoadmap | null }
  | { type: "CREATE_ROADMAP"; payload: LearningPath }
  | {
      type: "SAVE_CURRENT_ROADMAP";
      payload?: { nodes?: NodeData[]; edges?: Edge[] };
    }
  | { type: "CLEAR_CURRENT_ROADMAP" }
  | { type: "LOAD_ROADMAP_BY_ID"; payload: string }
  | {
      type: "UPDATE_NODES_AND_EDGES";
      payload: { nodes: NodeData[]; edges: Edge[] };
    }
  | { type: "SET_USER_ROADMAPS"; payload: SavedRoadmap[] }
  | { type: "ADD_USER_ROADMAP"; payload: SavedRoadmap }
  | { type: "REMOVE_USER_ROADMAP"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

// Create context
export interface RoadmapContextType {
  state: RoadmapState;
  dispatch: React.Dispatch<RoadmapAction>;
  createNewRoadmap: (learningPath: LearningPath) => string;
  saveRoadmap: (nodes?: NodeData[], edges?: Edge[]) => Promise<void>;
  loadRoadmap: (id: string) => SavedRoadmap | null;
  clearRoadmap: () => void;
  updateNodesAndEdges: (nodes: NodeData[], edges: Edge[]) => void;
  fetchUserRoadmaps: () => Promise<void>;
  deleteRoadmap: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

// Create a default context value
const defaultRoadmapContext: RoadmapContextType = {
  state: initRoadmapState(),
  dispatch: () => {},
  createNewRoadmap: () => "",
  saveRoadmap: async () => {},
  loadRoadmap: () => null,
  clearRoadmap: () => {},
  updateNodesAndEdges: () => {},
  fetchUserRoadmaps: async () => {},
  deleteRoadmap: async () => {},
  loading: false,
  error: null,
};

// Create the context
export const RoadmapContext = createContext<RoadmapContextType>(
  defaultRoadmapContext
);

// Reducer function
function roadmapReducer(
  state: RoadmapState,
  action: RoadmapAction
): RoadmapState {
  switch (action.type) {
    case "SET_CURRENT_ROADMAP":
      return setCurrentRoadmap(state, action.payload);

    case "CREATE_ROADMAP": {
      const newRoadmap = createRoadmap(action.payload);
      return setCurrentRoadmap(state, newRoadmap);
    }

    case "SAVE_CURRENT_ROADMAP": {
      const { nodes, edges } = action.payload || {};
      return saveCurrentRoadmap(state, nodes, edges);
    }

    case "CLEAR_CURRENT_ROADMAP":
      return clearCurrentRoadmap(state);

    case "LOAD_ROADMAP_BY_ID": {
      const roadmap = getRoadmapById(state, action.payload);
      return setCurrentRoadmap(state, roadmap);
    }

    case "UPDATE_NODES_AND_EDGES": {
      if (!state.currentRoadmap) return state;

      const updatedRoadmap = {
        ...state.currentRoadmap,
        nodes: action.payload.nodes,
        edges: action.payload.edges,
        lastModified: Date.now(),
      };

      // Save to localStorage
      saveRoadmapToStorage(updatedRoadmap);

      return {
        ...state,
        currentRoadmap: updatedRoadmap,
      };
    }

    case "SET_USER_ROADMAPS":
      return {
        ...state,
        savedRoadmaps: action.payload,
      };

    case "ADD_USER_ROADMAP": {
      const filteredRoadmaps = state.savedRoadmaps.filter(
        (r) => r.id !== action.payload.id
      );

      // Save to localStorage
      saveRoadmapToStorage(action.payload);

      return {
        ...state,
        savedRoadmaps: [...filteredRoadmaps, action.payload],
      };
    }

    case "REMOVE_USER_ROADMAP": {
      // Remove from localStorage
      removeRoadmapFromStorage(action.payload);

      return {
        ...state,
        savedRoadmaps: state.savedRoadmaps.filter(
          (r) => r.id !== action.payload
        ),
        currentRoadmap:
          state.currentRoadmap?.id === action.payload
            ? null
            : state.currentRoadmap,
      };
    }

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}

// Provider component
interface RoadmapProviderProps {
  children: ReactNode;
}

export const RoadmapProvider: React.FC<RoadmapProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(roadmapReducer, initRoadmapState());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadAttemptedRef = useRef(false);

  const createNewRoadmap = (learningPath: LearningPath) => {
    // Ensure the roadmap has a unique name by adding a timestamp if not already present
    if (!learningPath.name.includes("(")) {
      const timestamp = new Date().toLocaleTimeString();
      learningPath = {
        ...learningPath,
        name: `${learningPath.name} (${timestamp})`,
      };
    }

    const newRoadmap = createRoadmap(learningPath);
    dispatch({ type: "SET_CURRENT_ROADMAP", payload: newRoadmap });

    // Also add to savedRoadmaps
    dispatch({ type: "ADD_USER_ROADMAP", payload: newRoadmap });

    return newRoadmap.id;
  };

  const saveRoadmap = async (nodes?: NodeData[], edges?: Edge[]) => {
    try {
      setLoading(true);
      setError(null);

      if (!state.currentRoadmap) {
        throw new Error("No current roadmap to save");
      }

      const currentRoadmap = state.currentRoadmap;
      const updatedNodes = nodes || currentRoadmap.nodes;
      const updatedEdges = edges || currentRoadmap.edges;

      // Update the current roadmap
      const updatedRoadmap = {
        ...currentRoadmap,
        nodes: updatedNodes,
        edges: updatedEdges,
        lastModified: Date.now(),
      };

      // Save to state
      dispatch({ type: "SET_CURRENT_ROADMAP", payload: updatedRoadmap });

      // Add to saved roadmaps
      dispatch({ type: "ADD_USER_ROADMAP", payload: updatedRoadmap });
    } catch (err) {
      console.error("Error saving roadmap:", err);
      setError(err instanceof Error ? err.message : "Failed to save roadmap");
    } finally {
      setLoading(false);
    }
  };

  const updateNodesAndEdges = (nodes: NodeData[], edges: Edge[]) => {
    if (!state.currentRoadmap) return;

    dispatch({ type: "UPDATE_NODES_AND_EDGES", payload: { nodes, edges } });
  };

  const fetchUserRoadmaps = useCallback(async () => {
    // Prevent multiple fetch attempts
    if (loadAttemptedRef.current) return;

    try {
      setLoading(true);
      setError(null);
      loadAttemptedRef.current = true;

      // Get all roadmaps from localStorage
      const roadmaps = getAllRoadmaps();

      dispatch({ type: "SET_USER_ROADMAPS", payload: roadmaps });
    } catch (err) {
      console.error("Error fetching roadmaps:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch roadmaps");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteRoadmap = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      // Remove from state (which also removes from localStorage)
      dispatch({ type: "REMOVE_USER_ROADMAP", payload: id });
    } catch (err) {
      console.error("Error deleting roadmap:", err);
      setError(err instanceof Error ? err.message : "Failed to delete roadmap");
    } finally {
      setLoading(false);
    }
  };

  const loadRoadmap = (id: string) => {
    console.log("Loading roadmap with ID:", id);

    // First check if it's already the current roadmap
    if (state.currentRoadmap && state.currentRoadmap.id === id) {
      console.log("Roadmap is already the current roadmap");
      return state.currentRoadmap;
    }

    // Then check local storage
    const roadmap = getRoadmapById(state, id);
    console.log("Roadmap from storage:", roadmap);

    if (roadmap) {
      // Explicitly set as current roadmap
      dispatch({ type: "SET_CURRENT_ROADMAP", payload: roadmap });
      return roadmap;
    }

    console.log("Roadmap not found");
    return null;
  };

  const clearRoadmap = () => {
    dispatch({ type: "CLEAR_CURRENT_ROADMAP" });
  };

  // Load all roadmaps on mount - only once
  useEffect(() => {
    if (!loadAttemptedRef.current) {
      fetchUserRoadmaps();
    }
  }, [fetchUserRoadmaps]);

  // Prevent unnecessary localStorage updates
  const prevStateRef = useRef<string>("");

  useEffect(() => {
    const stateString = JSON.stringify(state);
    if (stateString !== prevStateRef.current) {
      prevStateRef.current = stateString;
      localStorage.setItem("cfc-roadmap-data", stateString);
    }
  }, [state]);

  const value: RoadmapContextType = {
    state,
    dispatch,
    createNewRoadmap,
    saveRoadmap,
    updateNodesAndEdges,
    fetchUserRoadmaps,
    deleteRoadmap,
    loadRoadmap,
    clearRoadmap,
    loading,
    error,
  };

  return (
    <RoadmapContext.Provider value={value}>{children}</RoadmapContext.Provider>
  );
};
