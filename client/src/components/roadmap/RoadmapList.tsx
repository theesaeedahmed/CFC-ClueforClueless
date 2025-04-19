"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRoadmap } from "@/hooks/useRoadmap";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import {
  MoreVertical,
  Trash2,
  ExternalLink,
  Clock,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";
import React from "react";

export default function RoadmapList() {
  const { state, deleteRoadmap, loading, error } = useRoadmap();
  const navigate = useNavigate();
  const toast = useToast();
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string | null>(
    null
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  // Handle opening a roadmap
  const handleOpenRoadmap = (id: string) => {
    navigate(`/roadmap/${id}`);
  };

  // Handle deleting a roadmap
  const handleDeleteClick = (id: string) => {
    setSelectedRoadmapId(id);
    onOpen();
  };

  const confirmDelete = async () => {
    if (!selectedRoadmapId) return;

    try {
      await deleteRoadmap(selectedRoadmapId);
      toast({
        title: "Roadmap deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
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
    } finally {
      onClose();
    }
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" height="200px">
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" p={5} color="red.500">
        <Text>Error loading roadmaps: {error}</Text>
      </Box>
    );
  }

  if (state.savedRoadmaps.length === 0) {
    return (
      <Box textAlign="center" p={5}>
        <Text color="gray.500">You don't have any saved roadmaps yet.</Text>
        <Button
          colorScheme="blue"
          mt={4}
          onClick={() => navigate("/roadmap/new")}
        >
          Create Your First Roadmap
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Heading size="lg" mb={6}>
        Your Roadmaps
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {state.savedRoadmaps.map((roadmap) => (
          <Card
            key={roadmap.id}
            boxShadow="md"
            borderRadius="lg"
            overflow="hidden"
          >
            <CardHeader pb={2}>
              <Flex justify="space-between" align="center">
                <Heading size="md" noOfLines={1}>
                  {roadmap.learningPath.name}
                </Heading>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<MoreVertical size={16} />}
                    variant="ghost"
                  />
                  <MenuList>
                    <MenuItem
                      icon={<ExternalLink size={16} />}
                      onClick={() => handleOpenRoadmap(roadmap.id)}
                    >
                      Open
                    </MenuItem>
                    <MenuItem
                      icon={<Trash2 size={16} />}
                      color="red.500"
                      onClick={() => handleDeleteClick(roadmap.id)}
                    >
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </CardHeader>

            <CardBody py={2}>
              <Text fontSize="sm" color="gray.600" noOfLines={2} mb={3}>
                {roadmap.learningPath.description}
              </Text>

              <Flex
                align="center"
                gap={2}
                fontSize="xs"
                color="gray.500"
                mb={2}
              >
                <Clock size={14} />
                <Text>{roadmap.learningPath.estimatedTime}</Text>
              </Flex>

              <Flex align="center" gap={2} fontSize="xs" color="gray.500">
                <Calendar size={14} />
                <Text>
                  Last modified:{" "}
                  {format(new Date(roadmap.lastModified), "MMM d, yyyy")}
                </Text>
              </Flex>
            </CardBody>

            <CardFooter pt={2}>
              <Button
                width="full"
                colorScheme="blue"
                size="sm"
                onClick={() => handleOpenRoadmap(roadmap.id)}
                rightIcon={<ExternalLink size={16} />}
              >
                Open Roadmap
              </Button>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Roadmap
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this roadmap? This action cannot
              be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
