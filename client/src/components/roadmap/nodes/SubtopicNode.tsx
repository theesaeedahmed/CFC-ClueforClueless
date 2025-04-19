"use client";

import type React from "react";

import { memo, useState } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import {
  Clock,
  ChevronDown,
  ChevronUp,
  BookOpen,
  CheckCircle2,
  MoreVertical,
  Edit,
  Trash2,
  Play,
  Pause,
  CheckCircle,
} from "lucide-react";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Button,
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
  Flex,
  Badge,
  Collapse,
  Progress,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useRef } from "react";
import type { NodeData } from "@/lib/types";

interface SubtopicNodeProps {
  id: string;
  data: {
    label: string;
    description: string;
    estimatedTime: string;
    resources?: string[];
    prerequisites?: string[];
    technologiesAndConcepts?: string[];
    status?: "not-started" | "in-progress" | "completed";
    progress?: number;
    onStatusChange?: (
      id: string,
      status: "not-started" | "in-progress" | "completed"
    ) => void;
    onNodeUpdate?: (id: string, data: NodeData) => void;
  };
  isConnectable: boolean;
}

export const SubtopicNode = memo(
  ({ id, data, isConnectable }: SubtopicNodeProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { setNodes, setEdges } = useReactFlow();
    const {
      isOpen: isDeleteOpen,
      onOpen: onDeleteOpen,
      onClose: onDeleteClose,
    } = useDisclosure();
    const {
      isOpen: isEditOpen,
      onOpen: onEditOpen,
      onClose: onEditClose,
    } = useDisclosure();
    const cancelRef = useRef<HTMLButtonElement>(null);

    // Form state
    const [formData, setFormData] = useState({
      label: data.label,
      description: data.description,
      estimatedTime: data.estimatedTime,
      resources: data.resources?.join("\n") || "",
      prerequisites: data.prerequisites?.join("\n") || "",
      technologiesAndConcepts: data.technologiesAndConcepts?.join(", ") || "",
    });

    // Status colors
    const statusColors = {
      "not-started": {
        bg: "gray.50",
        border: "gray.300",
        text: "Not Started",
        badge: "gray",
      },
      "in-progress": {
        bg: "blue.50",
        border: "blue.300",
        text: "In Progress",
        badge: "blue",
      },
      completed: {
        bg: "green.50",
        border: "green.300",
        text: "Completed",
        badge: "green",
      },
    };

    // Default to not-started if no status is provided
    const status = data.status || "not-started";
    const progress =
      data.progress !== undefined
        ? data.progress
        : status === "completed"
        ? 100
        : 0;

    // Handle node deletion
    const handleDelete = () => {
      setNodes((nodes) => nodes.filter((node) => node.id !== id));
      setEdges((edges) =>
        edges.filter((edge) => edge.source !== id && edge.target !== id)
      );
      onDeleteClose();
    };

    // Handle status change
    const handleStatusChange = (
      newStatus: "not-started" | "in-progress" | "completed"
    ) => {
      if (data.onStatusChange) {
        data.onStatusChange(id, newStatus);
      }
    };

    // Handle form change
    const handleFormChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submit
    const handleFormSubmit = () => {
      if (data.onNodeUpdate) {
        const updatedData = {
          ...formData,
          resources: formData.resources
            ? formData.resources.split("\n").filter(Boolean)
            : [],
          prerequisites: formData.prerequisites
            ? formData.prerequisites.split("\n").filter(Boolean)
            : [],
          technologiesAndConcepts: formData.technologiesAndConcepts
            ? formData.technologiesAndConcepts
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
            : [],
        };
        data.onNodeUpdate(id, updatedData);
      }
      onEditClose();
    };

    return (
      <Card
        width="300px"
        borderWidth="2px"
        borderStyle="solid"
        borderColor={statusColors[status].border}
        bg={statusColors[status].bg}
        boxShadow="md"
        borderRadius="lg"
        overflow="hidden"
      >
        <CardHeader
          pb={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading size="md" color="purple.800">
            {data.label}
          </Heading>
          <div className="nodrag">
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<MoreVertical size={16} />}
                variant="ghost"
                size="sm"
              />
              <MenuList>
                <MenuItem icon={<Edit size={16} />} onClick={onEditOpen}>
                  Edit
                </MenuItem>
                <MenuItem
                  icon={<Trash2 size={16} />}
                  onClick={onDeleteOpen}
                  color="red.500"
                >
                  Delete
                </MenuItem>
                <MenuItem
                  icon={<Play size={16} />}
                  onClick={() => handleStatusChange("in-progress")}
                  isDisabled={
                    status === "in-progress" || status === "completed"
                  }
                >
                  Start
                </MenuItem>
                <MenuItem
                  icon={<Pause size={16} />}
                  onClick={() => handleStatusChange("not-started")}
                  isDisabled={status === "not-started"}
                >
                  Pause
                </MenuItem>
                <MenuItem
                  icon={<CheckCircle size={16} />}
                  onClick={() => handleStatusChange("completed")}
                  isDisabled={status === "completed"}
                >
                  Complete
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </CardHeader>

        <CardBody py={2}>
          <div className="nodrag">
            <Text
              fontSize="sm"
              color="gray.700"
              mb={3}
              noOfLines={isExpanded ? undefined : 2}
            >
              {data.description}
            </Text>
            <Flex
              alignItems="center"
              gap={2}
              fontSize="xs"
              color="gray.600"
              bg="gray.100"
              p={2}
              rounded="md"
              mb={3}
            >
              <Clock size={14} />
              <Text>{data.estimatedTime}</Text>
            </Flex>

            {/* Status and Progress */}
            <Flex direction="column" gap={1} mb={3}>
              <Flex justifyContent="space-between" alignItems="center">
                <Badge colorScheme={statusColors[status].badge}>
                  {statusColors[status].text}
                </Badge>
                <Text fontSize="xs" color="gray.600">
                  {progress}% Complete
                </Text>
              </Flex>
              <Progress
                value={progress}
                size="sm"
                colorScheme={status === "completed" ? "green" : "blue"}
                borderRadius="full"
              />
            </Flex>

            {data.technologiesAndConcepts &&
              data.technologiesAndConcepts.length > 0 && (
                <Flex flexWrap="wrap" gap={1} mb={3}>
                  {data.technologiesAndConcepts
                    .slice(0, 3)
                    .map((tech, index) => (
                      <Badge key={index} variant="outline" colorScheme="purple">
                        {tech}
                      </Badge>
                    ))}
                  {data.technologiesAndConcepts.length > 3 && (
                    <Badge variant="outline" colorScheme="purple">
                      +{data.technologiesAndConcepts.length - 3} more
                    </Badge>
                  )}
                </Flex>
              )}

            <Collapse in={isExpanded} animateOpacity>
              <Box mt={3} mb={3}>
                {data.prerequisites && data.prerequisites.length > 0 && (
                  <Box mb={3}>
                    <Text
                      fontSize="xs"
                      fontWeight="bold"
                      color="purple.800"
                      mb={1}
                      display="flex"
                      alignItems="center"
                    >
                      <CheckCircle2 size={14} style={{ marginRight: "4px" }} />
                      Prerequisites
                    </Text>
                    <Box as="ul" pl={4} fontSize="xs" color="gray.700">
                      {data.prerequisites.map((prereq, index) => (
                        <Box as="li" key={index}>
                          {prereq}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}

                {data.resources && data.resources.length > 0 && (
                  <Box>
                    <Text
                      fontSize="xs"
                      fontWeight="bold"
                      color="purple.800"
                      mb={1}
                      display="flex"
                      alignItems="center"
                    >
                      <BookOpen size={14} style={{ marginRight: "4px" }} />
                      Resources
                    </Text>
                    <Box as="ul" pl={4} fontSize="xs" color="gray.700">
                      {data.resources.map((resource, index) => (
                        <Box as="li" key={index}>
                          {resource}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            </Collapse>

            <Button
              size="xs"
              width="100%"
              variant="ghost"
              colorScheme="purple"
              leftIcon={
                isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />
              }
              onClick={() => setIsExpanded(!isExpanded)}
              mb={2}
            >
              {isExpanded ? "Show Less" : "Show More"}
            </Button>
          </div>
        </CardBody>

        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
          className="w-3 h-3 bg-purple-500"
        />

        {/* Delete Confirmation Dialog */}
        <AlertDialog
          isOpen={isDeleteOpen}
          leastDestructiveRef={cancelRef}
          onClose={onDeleteClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Node
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to delete this node? This will also remove
                any connections to this node.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onDeleteClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleDelete} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

        {/* Edit Node Modal */}
        <Modal isOpen={isEditOpen} onClose={onEditClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Node</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb={3}>
                <FormLabel>Title</FormLabel>
                <Input
                  name="label"
                  value={formData.label}
                  onChange={handleFormChange}
                />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>Estimated Time</FormLabel>
                <Input
                  name="estimatedTime"
                  value={formData.estimatedTime}
                  onChange={handleFormChange}
                />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>Technologies & Concepts (comma separated)</FormLabel>
                <Input
                  name="technologiesAndConcepts"
                  value={formData.technologiesAndConcepts}
                  onChange={handleFormChange}
                />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>Prerequisites (one per line)</FormLabel>
                <Textarea
                  name="prerequisites"
                  value={formData.prerequisites}
                  onChange={handleFormChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Resources (one per line)</FormLabel>
                <Textarea
                  name="resources"
                  value={formData.resources}
                  onChange={handleFormChange}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onEditClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handleFormSubmit}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Card>
    );
  }
);

SubtopicNode.displayName = "SubtopicNode";
