"use client";

import type React from "react";

import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  useToast,
} from "@chakra-ui/react";
import type { NodeData } from "../../lib/types";

interface AddNodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNode: (nodeData: NodeData) => void;
}

export default function AddNodeDialog({
  isOpen,
  onClose,
  onAddNode,
}: AddNodeDialogProps) {
  const [formData, setFormData] = useState<NodeData>({
    label: "",
    description: "",
    estimatedTime: "",
    status: "not-started",
    type: "custom",
  });
  const toast = useToast();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.label) {
      toast({
        title: "Title required",
        description: "Please provide a title for the node",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    onAddNode(formData);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setFormData({
      label: "",
      description: "",
      estimatedTime: "",
      status: "not-started",
      type: "custom",
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Node</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={3} isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              name="label"
              value={formData.label}
              onChange={handleChange}
              placeholder="Node title"
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe this node"
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Estimated Time</FormLabel>
            <Input
              name="estimatedTime"
              value={formData.estimatedTime}
              onChange={handleChange}
              placeholder="e.g., 2 weeks, 3 hours"
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Status</FormLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="not-started">Not Started</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Add Node
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
