"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RoadmapVisualization from "../components/roadmap/RoadmapVisualization";
import { useRoadmap } from "@/hooks/useRoadmap";
import {
  Box,
  Flex,
  IconButton,
  Button,
  useToast,
  Spinner,
  Text,
  Heading,
  Badge,
  Tooltip,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import {
  ArrowLeft,
  Download,
  Share2,
  Info,
  Clock,
  MoreVertical,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Moon,
  Sun,
  MenuIcon,
} from "lucide-react";
import { format } from "date-fns";

export default function RoadmapFullscreen() {
  const { roadmapId } = useParams<{ roadmapId: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const { state, loadRoadmap } = useRoadmap();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const loadAttemptedRef = useRef(false);
  const [loading, setLoading] = useState(true);

  // Add debouncing to prevent multiple API calls when loading fails
  useEffect(() => {
    let timer: number | undefined;

    const loadRoadmapData = () => {
      if (!roadmapId) return;

      setLoading(true);
      console.log("Attempting to load roadmap:", roadmapId);

      // Check if we already have the roadmap in state
      if (state.currentRoadmap && state.currentRoadmap.id === roadmapId) {
        console.log("Roadmap already loaded in state");
        setLoading(false);
        return;
      }

      // Try to load the roadmap
      const roadmap = loadRoadmap(roadmapId);
      console.log("Load roadmap result:", roadmap);

      if (!roadmap) {
        toast({
          title: "Roadmap not found",
          description: "The requested roadmap could not be found",
          status: "error",
          duration: 3000,
          isClosable: true,
        });

        // Short delay before redirecting
        timer = window.setTimeout(() => {
          navigate("/roadmap");
        }, 1000);
      }

      setLoading(false);
    };

    if (!loadAttemptedRef.current) {
      loadAttemptedRef.current = true;
      loadRoadmapData();
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [roadmapId, state.currentRoadmap, loadRoadmap, navigate, toast]);

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch((err) => {
          toast({
            title: "Fullscreen error",
            description: `Error attempting to enable fullscreen: ${err.message}`,
            status: "error",
            duration: 3000,
          });
        });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        });
      }
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // If no roadmap data, show loading
  if (loading) {
    return (
      <Box
        height="100vh"
        width="100vw"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg={colorMode === "dark" ? "gray.900" : "gray.50"}
        color={colorMode === "dark" ? "white" : "gray.800"}
      >
        <Flex direction="column" align="center">
          <Spinner size="xl" color="blue.500" mb={4} />
          <Text>Loading roadmap...</Text>
        </Flex>
      </Box>
    );
  }

  if (
    !state.currentRoadmap ||
    (roadmapId && state.currentRoadmap.id !== roadmapId)
  ) {
    return (
      <Box
        height="100vh"
        width="100vw"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg={colorMode === "dark" ? "gray.900" : "gray.50"}
        color={colorMode === "dark" ? "white" : "gray.800"}
      >
        <Flex direction="column" align="center">
          <Text>No roadmap data found. Please go back and try again.</Text>
          <Button
            mt={4}
            leftIcon={<ArrowLeft size={16} />}
            onClick={() => navigate("/roadmap")}
            colorScheme="blue"
          >
            Back to Roadmaps
          </Button>
        </Flex>
      </Box>
    );
  }

  const roadmap = state.currentRoadmap;
  const learningPath = roadmap.learningPath;

  // Calculate progress
  const calculateProgress = () => {
    if (!roadmap.nodes) return 0;

    const totalNodes = roadmap.nodes.length;
    if (totalNodes === 0) return 0;

    // Fixed: Access status directly from the node data
    const completedNodes = roadmap.nodes.filter((node) => {
      // Check if status exists directly on the node or in the data property
      return node.status === "completed";
    }).length;

    return Math.round((completedNodes / totalNodes) * 100);
  };

  const progress = calculateProgress();

  return (
    <Box
      height="100vh"
      width="100vw"
      bg={colorMode === "dark" ? "gray.900" : "gray.50"}
      position="relative"
      className="fullscreen-roadmap"
      overflow="hidden"
    >
      {/* Top navigation bar */}
      <Flex
        position="absolute"
        top={0}
        left={0}
        right={0}
        zIndex={10}
        p={3}
        bg={colorMode === "dark" ? "gray.800" : "white"}
        boxShadow="md"
        justify="space-between"
        align="center"
      >
        <Flex align="center">
          <IconButton
            aria-label="Back to roadmap"
            icon={<ArrowLeft size={18} />}
            onClick={() => navigate(`/roadmap/${roadmap.id}`)}
            size="md"
            variant="ghost"
            mr={3}
          />

          <IconButton
            aria-label="Open info panel"
            icon={<MenuIcon size={18} />}
            onClick={onOpen}
            size="md"
            variant="ghost"
            mr={3}
            display={{ base: "flex", md: "none" }}
          />

          <Box display={{ base: "none", md: "block" }}>
            <Heading size="md" noOfLines={1}>
              {learningPath.name}
            </Heading>
            <Flex align="center" mt={1}>
              <Clock size={14} />
              <Text
                ml={1}
                fontSize="sm"
                color={colorMode === "dark" ? "gray.400" : "gray.600"}
              >
                {learningPath.estimatedTime}
              </Text>
              <Badge
                ml={3}
                colorScheme={
                  progress >= 75 ? "green" : progress >= 25 ? "blue" : "gray"
                }
              >
                {progress}% Complete
              </Badge>
            </Flex>
          </Box>
        </Flex>

        <Flex>
          <Tooltip label={colorMode === "dark" ? "Light mode" : "Dark mode"}>
            <IconButton
              aria-label="Toggle color mode"
              icon={
                colorMode === "dark" ? <Sun size={18} /> : <Moon size={18} />
              }
              onClick={toggleColorMode}
              size="md"
              variant="ghost"
              mr={2}
            />
          </Tooltip>

          <Tooltip
            label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            <IconButton
              aria-label="Toggle fullscreen"
              icon={
                isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />
              }
              onClick={toggleFullscreen}
              size="md"
              variant="ghost"
              mr={2}
            />
          </Tooltip>

          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="More options"
              icon={<MoreVertical size={18} />}
              variant="ghost"
            />
            <MenuList>
              <MenuItem icon={<Download size={16} />}>Export as PNG</MenuItem>
              <MenuItem icon={<Share2 size={16} />}>Share roadmap</MenuItem>
              <MenuItem icon={<Info size={16} />}>View details</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {/* Fullscreen roadmap visualization */}
      <Box pt="60px" height="100%" width="100%">
        <RoadmapVisualization
          learningPath={learningPath}
          roadmapId={roadmap.id}
          controlPosition="bottom-right"
          showBackButton={false}
          fullscreen={true}
        />
      </Box>

      {/* Info Drawer (for mobile) */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Roadmap Details</DrawerHeader>
          <DrawerBody>
            <Heading size="md" mb={2}>
              {learningPath.name}
            </Heading>
            <Text mb={4}>{learningPath.description}</Text>

            <Flex align="center" mb={2}>
              <Clock size={16} />
              <Text ml={2}>{learningPath.estimatedTime}</Text>
            </Flex>

            <Flex align="center" mb={4}>
              <Text mr={2}>Progress:</Text>
              <Badge
                colorScheme={
                  progress >= 75 ? "green" : progress >= 25 ? "blue" : "gray"
                }
              >
                {progress}% Complete
              </Badge>
            </Flex>

            <Divider my={4} />

            <Text fontSize="sm" color="gray.500">
              Created: {format(new Date(roadmap.createdAt), "MMM d, yyyy")}
            </Text>
            <Text fontSize="sm" color="gray.500">
              Last modified:{" "}
              {format(new Date(roadmap.lastModified), "MMM d, yyyy")}
            </Text>

            <Divider my={4} />

            <Button
              leftIcon={<ChevronLeft />}
              onClick={() => navigate(`/roadmap/${roadmap.id}`)}
              width="full"
            >
              Back to Roadmap
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
