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
import type { LearningPath, Subtopic, Topic } from "../lib/types";
import { useRoadmap } from "@/hooks/useRoadmap";
// import { useAuth } from "@/hooks/useAuth";

// Mock function to generate a roadmap based on a prompt
function generateMockRoadmap(prompt: string): LearningPath {
  const timestamp = Date.now();
  const topics = [
    "Fundamentals",
    "Core Concepts",
    "Advanced Topics",
    "Best Practices",
    "Tools & Ecosystem",
  ];

  // Generate a unique name based on the prompt and timestamp
  const roadmapName = `${
    prompt.charAt(0).toUpperCase() + prompt.slice(1)
  } Learning Path (${timestamp})`;

  return {
    name: roadmapName,
    description: `A comprehensive learning path for ${prompt}. This roadmap covers everything from basics to advanced topics.`,
    estimatedTime: "3-6 months",
    topics: topics.map((topicName, topicIndex) => {
      return {
        name: `${topicName} of ${prompt}`,
        description: `Learn the ${topicName.toLowerCase()} of ${prompt} and how to apply them.`,
        estimatedTime: `${topicIndex + 2} weeks`,
        subtopics: Array(3)
          .fill(null)
          .map((_, subtopicIndex) => {
            return {
              name: `${topicName} - Subtopic ${subtopicIndex + 1}`,
              description: `Detailed exploration of ${topicName.toLowerCase()} subtopic ${
                subtopicIndex + 1
              } in ${prompt}.`,
              estimatedTime: `${subtopicIndex + 1} weeks`,
              technologiesAndConcepts: [
                `${prompt} concept ${subtopicIndex + 1}`,
                `${prompt} technique ${subtopicIndex + 1}`,
              ],
              prerequisites: [`Basic knowledge of ${prompt}`],
              resources: [`${prompt} documentation`, `${topicName} tutorial`],
              status: "not-started",
            } as Subtopic;
          }),
        status: "not-started",
      } as Topic;
    }),
    status: "not-started",
  };
}

export default function RoadmapGenerator() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { createNewRoadmap } = useRoadmap();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Generate a mock roadmap locally instead of calling API
      const roadmapData = generateMockRoadmap(prompt);

      // Create a new roadmap in the context
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
