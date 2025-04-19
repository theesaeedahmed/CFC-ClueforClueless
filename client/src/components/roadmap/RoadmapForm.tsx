"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRoadmap } from "@/hooks/useRoadmap";
import { useAuth } from "@/hooks/useAuth";
import { roadmapApi } from "../../services/api";
import type { LearningPath } from "../../lib/types";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Loader2 } from "lucide-react";
import React from "react";

interface RoadmapFormProps {
  onRoadmapGenerated?: (id: string) => void;
}

export default function RoadmapForm({ onRoadmapGenerated }: RoadmapFormProps) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { state, createNewRoadmap, saveRoadmap } = useRoadmap();
  const { userData } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  // Store the generated roadmap temporarily
  // const [tempRoadmap, setTempRoadmap] = useState<LearningPath | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) return;

    // Check if there's an existing unsaved roadmap
    if (state.currentRoadmap) {
      // setTempRoadmap(null);
      onOpen();
      return;
    }

    await generateRoadmap();
  };

  const generateRoadmap = async () => {
    setLoading(true);
    setError(null);

    try {
      // Call the backend API to generate a roadmap
      const response = await roadmapApi.generateRoadmap(prompt, userData?.id);

      if (response.error) {
        throw new Error(response.error);
      }

      const roadmapData =
        (response.data as { learningPath: LearningPath }).learningPath ||
        ({} as LearningPath);

      // Create a new roadmap and get its ID
      const roadmapId = createNewRoadmap(roadmapData);

      // Navigate to the roadmap page with the ID
      navigate(`/roadmap/${roadmapId}`);

      if (onRoadmapGenerated) {
        onRoadmapGenerated(roadmapId);
      }

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
    } finally {
      setLoading(false);
    }
  };

  const handleDiscardAndGenerate = () => {
    onClose();
    // Clear the current roadmap
    navigate("/roadmap");
    // Generate a new one
    generateRoadmap();
  };

  const handleSaveAndGenerate = async () => {
    onClose();

    try {
      // Save the current roadmap
      await saveRoadmap();

      toast({
        title: "Roadmap saved",
        description: "Your current roadmap has been saved",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Generate a new one
      await generateRoadmap();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to save roadmap";
      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg="white" borderRadius="lg" shadow="md" p={6}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel fontWeight="semibold">
            Generate Your Learning Roadmap
          </FormLabel>
          <Text fontSize="sm" color="gray.500" mb={4}>
            Enter a technology, skill, or career path you want to learn
          </Text>

          <Box display="flex" gap={2}>
            <Input
              placeholder="e.g., nextjs, python, machine learning"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={loading}
            />
            <Button
              type="submit"
              colorScheme="blue"
              isLoading={loading}
              loadingText="Generating"
              spinner={<Loader2 className="animate-spin" />}
              isDisabled={!prompt.trim()}
            >
              Generate
            </Button>
          </Box>

          {error && (
            <Text color="red.500" fontSize="sm" mt={2}>
              {error}
            </Text>
          )}
        </FormControl>
      </form>

      {/* Confirmation Dialog */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Unsaved Roadmap
            </AlertDialogHeader>

            <AlertDialogBody>
              You have an unsaved roadmap. Would you like to save it before
              generating a new one?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDiscardAndGenerate}
                ml={3}
              >
                Discard & Generate New
              </Button>
              <Button colorScheme="blue" onClick={handleSaveAndGenerate} ml={3}>
                Save & Generate New
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
