"use client";

import type React from "react";

import { memo, useState } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import {
  Clock,
  MoreVertical,
  Edit,
  Trash2,
  Play,
  Pause,
  CheckCircle,
} from "lucide-react";
import {
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

interface TopicNodeProps {
  id: string;
  data: {
    label: string;
    description: string;
    estimatedTime: string;
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

export const TopicNode = memo(({ id, data, isConnectable }: TopicNodeProps) => {
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
      data.onNodeUpdate(id, formData);
    }
    onEditClose();
  };

  return (
    <Card
      width="280px"
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
        <Heading size="md" color="indigo.800">
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
                isDisabled={status === "in-progress" || status === "completed"}
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
          <Text fontSize="sm" color="gray.700" mb={3} noOfLines={3}>
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
          <Flex direction="column" gap={1}>
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
        </div>
      </CardBody>

      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-indigo-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-indigo-500"
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
            <FormControl>
              <FormLabel>Estimated Time</FormLabel>
              <Input
                name="estimatedTime"
                value={formData.estimatedTime}
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
});

TopicNode.displayName = "TopicNode";
