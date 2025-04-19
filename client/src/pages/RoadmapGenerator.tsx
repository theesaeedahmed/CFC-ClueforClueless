"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import RoadmapForm from "../components/roadmap/RoadmapForm";
import RoadmapVisualization from "../components/roadmap/RoadmapVisualization";
import RoadmapList from "../components/roadmap/RoadmapList";
import { useRoadmap } from "@/hooks/useRoadmap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Button,
  Box,
  Heading,
  Text,
  Flex,
  Spinner,
  Center,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
} from "@chakra-ui/react";
import { ExternalLink, Save, Plus } from "lucide-react";

export default function RoadmapGenerator() {
  const { roadmapId } = useParams<{ roadmapId?: string }>();
  const {
    state,
    loadRoadmap,
    saveRoadmap,
    fetchUserRoadmaps,
    loading: contextLoading,
  } = useRoadmap();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();
  const loadAttemptedRef = useRef(false);

  // Load roadmap data if ID is provided
  useEffect(() => {
    const init = async () => {
      if (loading) {
        setLoading(true);

        if (roadmapId) {
          console.log("Loading roadmap with ID:", roadmapId);
          const roadmap = loadRoadmap(roadmapId);
          console.log("Loaded roadmap:", roadmap);

          if (!roadmap) {
            toast({
              title: "Roadmap not found",
              description: "The requested roadmap could not be found",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
            navigate("/roadmap");
          }
        } else if (!loadAttemptedRef.current) {
          // If no specific roadmap is requested, fetch all user roadmaps
          // But only do this once to prevent infinite loops
          loadAttemptedRef.current = true;
          await fetchUserRoadmaps();
        }

        setLoading(false);
      }
    };

    init();
  }, [roadmapId, loadRoadmap, navigate, toast, fetchUserRoadmaps, loading]);

  // Handle roadmap generation
  const handleRoadmapGenerated = (id: string) => {
    navigate(`/roadmap/${id}`);
  };

  // Handle saving roadmap
  const handleSaveRoadmap = async () => {
    try {
      await saveRoadmap();
      toast({
        title: "Roadmap saved",
        description: "Your roadmap has been saved successfully",
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
    }
  };

  if (loading || contextLoading) {
    return (
      <Center py={10}>
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <Heading as="h1" size="xl" mb={2}>
              Learning Roadmap Generator
            </Heading>
            <Text color="gray.600">
              Generate personalized learning roadmaps to guide your career path
            </Text>
          </div>

          {roadmapId && state.currentRoadmap ? (
            // Show specific roadmap if ID is provided and roadmap exists
            <Box>
              <Flex justifyContent="space-between" alignItems="center" mb={4}>
                <Box>
                  <Heading as="h2" size="lg" mb={2}>
                    {state.currentRoadmap.learningPath.name}
                  </Heading>
                  <Text mb={2} color="gray.600">
                    {state.currentRoadmap.learningPath.description}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Estimated Time:{" "}
                    {state.currentRoadmap.learningPath.estimatedTime}
                  </Text>
                </Box>
                <Flex gap={2}>
                  <Button
                    leftIcon={<Save size={16} />}
                    colorScheme="green"
                    onClick={handleSaveRoadmap}
                  >
                    Save Roadmap
                  </Button>
                  <Link
                    to={`/roadmap/${state.currentRoadmap.id}/fullscreen`}
                    state={{ roadmap: state.currentRoadmap.learningPath }}
                  >
                    <Button
                      rightIcon={<ExternalLink size={16} />}
                      colorScheme="blue"
                    >
                      Open Fullscreen
                    </Button>
                  </Link>
                </Flex>
              </Flex>

              <Box
                h="700px"
                w="100%"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                bg="white"
                boxShadow="md"
              >
                <RoadmapVisualization
                  learningPath={state.currentRoadmap.learningPath}
                  roadmapId={state.currentRoadmap.id}
                  controlPosition="top-right"
                />
              </Box>
            </Box>
          ) : (
            // Show roadmap list and generation form if no ID is provided
            <Tabs variant="enclosed" colorScheme="blue">
              <TabList>
                <Tab>Your Roadmaps</Tab>
                <Tab>Create New</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <RoadmapList />
                </TabPanel>
                <TabPanel>
                  <Box maxW="800px" mx="auto">
                    <RoadmapForm onRoadmapGenerated={handleRoadmapGenerated} />
                    <Divider my={8} />
                    <Flex justify="center">
                      <Button
                        leftIcon={<Plus size={16} />}
                        colorScheme="blue"
                        size="lg"
                        onClick={() => navigate("/roadmap/new")}
                      >
                        Create New Roadmap
                      </Button>
                    </Flex>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
