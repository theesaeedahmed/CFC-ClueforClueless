"use client";

import type React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  Card,
  CardBody,
  Heading,
  Text,
  Flex,
  useToast,
} from "@chakra-ui/react";
import type { LearningPath } from "../lib/types";
import { useRoadmap } from "../context/RoadmapContext";
import { useAuth } from "@/hooks/useAuth";
import { roadmapApi } from "../services/api";

export default function RoadmapGenerator() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { createNewRoadmap } = useRoadmap();
  const { userData } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Call the backend API to generate a roadmap
      const response = await roadmapApi.generateRoadmap(prompt, userData?.id);

      if (response.error) {
        throw new Error(response.error);
      }

      // Create a new roadmap in the context (this doesn't save to backend yet)
      const roadmapData = (response.data as { learningPath: LearningPath })
        .learningPath;
      const roadmapId = createNewRoadmap(roadmapData);

      // Navigate to the roadmap visualization
      navigate(`/roadmap/${roadmapId}`);

      toast({
        title: "Roadmap generated",
        description: `Successfully created roadmap for "${prompt}"`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.error("Failed to generate roadmap:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to generate roadmap. Please try again."
      );

      toast({
        title: "Error",
        description: "Failed to generate roadmap. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="space-y-8">
      <Card bg="white" boxShadow="md" borderRadius="lg">
        <CardBody pt={6}>
          <form onSubmit={handleSubmit}>
            <Box mb={4}>
              <Heading as="h2" size="md" mb={2}>
                Generate Your Learning Roadmap
              </Heading>
              <Text fontSize="sm" color="gray.500">
                Enter a technology, skill, or career path you want to learn
              </Text>
            </Box>

            <Flex gap={2}>
              <Input
                placeholder="e.g., nextjs, python, machine learning"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                flex="1"
                isDisabled={loading}
              />
              <Button
                type="submit"
                colorScheme="blue"
                isDisabled={loading || !prompt.trim()}
                isLoading={loading}
                loadingText="Generating"
              >
                {!loading && "Generate"}
              </Button>
            </Flex>

            {error && (
              <Text fontSize="sm" color="red.500" mt={2}>
                {error}
              </Text>
            )}
          </form>
        </CardBody>
      </Card>
    </Box>
  );
}
