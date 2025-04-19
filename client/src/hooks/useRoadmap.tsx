"use client";

import { useContext } from "react";
import {
  RoadmapContext,
  type RoadmapContextType,
} from "@/context/RoadmapContext";

export const useRoadmap = (): RoadmapContextType => {
  const context = useContext(RoadmapContext);

  if (context === undefined) {
    throw new Error("useRoadmap must be used within a RoadmapProvider");
  }

  return context;
};
