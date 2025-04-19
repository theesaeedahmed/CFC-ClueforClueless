"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import ReactFlow, {
  type Node,
  type Edge,
  ConnectionLineType,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  Panel,
  ReactFlowProvider,
  useReactFlow,
  addEdge,
  type Connection,
  MiniMap,
  BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";
import type { LearningPath, NodeData } from "../../lib/types";
import { TopicNode } from "./nodes/TopicNode";
import { SubtopicNode } from "./nodes/SubtopicNode";
import { MainNode } from "./nodes/MainNode";
import { CustomNode } from "./nodes/CustomNode";
import { useRoadmap } from "@/hooks/useRoadmap";
import AddNodeDialog from "./AddNodeDialog";
import {
  Box,
  Button,
  ButtonGroup,
  Tooltip,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  useToast,
  useDisclosure,
  Flex,
  Divider,
  Badge,
} from "@chakra-ui/react";
import {
  RotateCcw,
  Undo,
  Save,
  ZoomIn,
  ZoomOut,
  PlusCircle,
  Circle,
  Clock3,
  CheckCircle,
} from "lucide-react";

// IMPORTANT: Define nodeTypes outside of the component to avoid re-creation on each render
const nodeTypes = {
  main: MainNode,
  topic: TopicNode,
  subtopic: SubtopicNode,
  custom: CustomNode,
};

interface RoadmapVisualizationProps {
  learningPath: LearningPath;
  roadmapId: string;
  controlPosition?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  showBackButton?: boolean;
  fullscreen?: boolean;
  onSave?: () => void;
}

// Inner component that uses ReactFlow hooks
function RoadmapFlow({
  learningPath,
  roadmapId,
  controlPosition = "top-right",
  fullscreen = false,
  onSave,
}: RoadmapVisualizationProps) {
  console.log("RoadmapFlow rendering with learningPath:", learningPath);

  // Check if we're in dark mode by checking the document element
  const isDarkMode = () => {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  };

  const [darkMode, setDarkMode] = useState(isDarkMode());
  const { state, saveRoadmap, updateNodesAndEdges } = useRoadmap();
  const reactFlowInstance = useReactFlow();
  const toast = useToast();
  const {
    isOpen: isAddNodeOpen,
    onOpen: onAddNodeOpen,
    onClose: onAddNodeClose,
  } = useDisclosure();

  // Node spacing control
  const [nodeSpacing, setNodeSpacing] = useState(1);

  // History for undo functionality
  const [history, setHistory] = useState<
    Array<{ nodes: Node[]; edges: Edge[] }>
  >([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Handle node status change
  const handleNodeStatusChange = useCallback(
    (id: string, status: "not-started" | "in-progress" | "completed") => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              data: {
                ...node.data,
                status,
                statusExplicitlySet: true,
                progress:
                  status === "completed"
                    ? 100
                    : status === "in-progress"
                    ? 50
                    : 0,
              },
            };
          }
          return node;
        })
      );
    },
    []
  );

  // Handle node update
  const handleNodeUpdate = useCallback(
    (id: string, data: Partial<NodeData>) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              data: {
                ...node.data,
                ...data,
              },
            };
          }
          return node;
        })
      );
    },
    []
  );

  // Calculate progress for a topic based on its subtopics
  const calculateTopicProgress = useCallback(
    (topicId: string, allNodes: Node[], allEdges: Edge[]) => {
      // Find all subtopics connected to this topic
      const connectedSubtopics = allNodes.filter((node) => {
        // Find edges where this topic is the source
        const isConnected = allEdges.some(
          (edge) => edge.source === topicId && edge.target === node.id
        );
        return isConnected && node.type === "subtopic";
      });

      if (connectedSubtopics.length === 0) return 0;

      // Calculate progress based on subtopic statuses
      const completedCount = connectedSubtopics.filter(
        (node) => node.data.status === "completed"
      ).length;
      const inProgressCount = connectedSubtopics.filter(
        (node) => node.data.status === "in-progress"
      ).length;

      // If all subtopics are completed, return 100%
      if (completedCount === connectedSubtopics.length) return 100;

      // If some are in progress or completed, calculate percentage
      return Math.round(
        ((completedCount + inProgressCount * 0.5) / connectedSubtopics.length) *
          100
      );
    },
    []
  );

  // Calculate main node progress based on all topics
  const calculateMainProgress = useCallback((allNodes: Node[]) => {
    const topics = allNodes.filter((node) => node.type === "topic");
    if (topics.length === 0) return 0;

    const completedCount = topics.filter(
      (node) => node.data.status === "completed"
    ).length;
    const inProgressCount = topics.filter(
      (node) => node.data.status === "in-progress"
    ).length;

    // If all topics are completed, return 100%
    if (completedCount === topics.length) return 100;

    // If some are in progress or completed, calculate percentage
    return Math.round(
      ((completedCount + inProgressCount * 0.5) / topics.length) * 100
    );
  }, []);

  // Update node statuses based on progress
  const updateNodeStatuses = useCallback(
    (nodes: Node[], edges: Edge[]) => {
      return nodes.map((node) => {
        if (node.type === "topic") {
          const progress = calculateTopicProgress(node.id, nodes, edges);
          let status = node.data.status || "not-started";

          // Auto-update status based on progress unless explicitly set
          if (!node.data.statusExplicitlySet) {
            if (progress === 100) {
              status = "completed";
            } else if (progress > 0) {
              status = "in-progress";
            } else {
              status = "not-started";
            }
          }

          return {
            ...node,
            data: {
              ...node.data,
              progress,
              status,
            },
          };
        } else if (node.type === "main") {
          const progress = calculateMainProgress(nodes);
          let status = node.data.status || "not-started";

          // Auto-update status based on progress unless explicitly set
          if (!node.data.statusExplicitlySet) {
            if (progress === 100) {
              status = "completed";
            } else if (progress > 0) {
              status = "in-progress";
            } else {
              status = "not-started";
            }
          }

          return {
            ...node,
            data: {
              ...node.data,
              progress,
              status,
            },
          };
        }
        return node;
      });
    },
    [calculateTopicProgress, calculateMainProgress]
  );

  const createNodesAndEdges = useCallback(() => {
    console.log("Creating nodes and edges from:", learningPath);

    if (!learningPath) {
      console.error("No learningPath provided");
      return { nodes: [], edges: [] };
    }

    try {
      let nodeId = 0;
      const nodes: Node[] = [];
      const edges: Edge[] = [];

      // Main node
      nodes.push({
        id: `${nodeId}`,
        data: {
          label: learningPath.name || "Unnamed Roadmap",
          description: learningPath.description || "",
          estimatedTime: learningPath.estimatedTime || "Unknown",
          status: learningPath.status || "not-started",
          progress: 0,
          onStatusChange: handleNodeStatusChange,
          onNodeUpdate: handleNodeUpdate,
        },
        position: { x: 0, y: 0 },
        type: "main",
      });

      // Calculate positions for a radial layout
      const topicCount = learningPath.topics?.length || 0;

      if (topicCount === 0) {
        console.warn("No topics found in learningPath");
        return { nodes, edges };
      }

      const baseRadius = fullscreen ? 600 : 400; // Larger radius for fullscreen mode
      const radius = baseRadius * nodeSpacing; // Apply spacing factor
      const angleStep = (2 * Math.PI) / topicCount;

      // Check if topics exist before mapping
      if (
        learningPath.topics &&
        Array.isArray(learningPath.topics) &&
        learningPath.topics.length > 0
      ) {
        learningPath.topics.forEach((topic, topicIndex) => {
          if (!topic) {
            console.warn(`Topic at index ${topicIndex} is undefined`);
            return;
          }

          const angle = topicIndex * angleStep;
          const topicX = Math.cos(angle) * radius;
          const topicY = Math.sin(angle) * radius;

          const topicNodeId = `${++nodeId}`;
          nodes.push({
            id: topicNodeId,
            data: {
              label: topic.name || `Topic ${topicIndex + 1}`,
              description: topic.description || "",
              estimatedTime: topic.estimatedTime || "Unknown",
              status: topic.status || "not-started",
              progress: 0,
              onStatusChange: handleNodeStatusChange,
              onNodeUpdate: handleNodeUpdate,
            },
            position: { x: topicX, y: topicY },
            type: "topic",
          });

          edges.push({
            id: `e0-${topicNodeId}`,
            source: "0",
            target: topicNodeId,
            type: ConnectionLineType.SmoothStep,
            animated: true,
            style: { stroke: "#6366f1" },
          });

          // Calculate positions for subtopics in a vertical column
          const subtopicCount = topic.subtopics?.length || 0;
          const baseSubtopicSpacing = fullscreen ? 300 : 250; // More spacing in fullscreen
          const subtopicSpacing = baseSubtopicSpacing * nodeSpacing; // Apply spacing factor

          if (topic.subtopics && Array.isArray(topic.subtopics)) {
            topic.subtopics.forEach((subtopic, subtopicIndex) => {
              if (!subtopic) {
                console.warn(
                  `Subtopic at index ${subtopicIndex} in topic "${topic.name}" is undefined`
                );
                return;
              }

              const subtopicNodeId = `${++nodeId}`;
              const subtopicX =
                topicX +
                Math.cos(angle) * (fullscreen ? 400 : 300) * nodeSpacing;
              const subtopicY =
                topicY +
                Math.sin(angle) * (fullscreen ? 400 : 300) * nodeSpacing +
                (subtopicIndex - (subtopicCount - 1) / 2) * subtopicSpacing;

              nodes.push({
                id: subtopicNodeId,
                data: {
                  label: subtopic.name || `Subtopic ${subtopicIndex + 1}`,
                  description: subtopic.description || "",
                  estimatedTime: subtopic.estimatedTime || "Unknown",
                  resources: Array.isArray(subtopic.resources)
                    ? subtopic.resources
                    : [],
                  prerequisites: Array.isArray(subtopic.prerequisites)
                    ? subtopic.prerequisites
                    : [],
                  technologiesAndConcepts: Array.isArray(
                    subtopic.technologiesAndConcepts
                  )
                    ? subtopic.technologiesAndConcepts
                    : [],
                  status: subtopic.status || "not-started",
                  progress: subtopic.status === "completed" ? 100 : 0,
                  onStatusChange: handleNodeStatusChange,
                  onNodeUpdate: handleNodeUpdate,
                },
                position: { x: subtopicX, y: subtopicY },
                type: "subtopic",
              });

              edges.push({
                id: `e${topicNodeId}-${subtopicNodeId}`,
                source: topicNodeId,
                target: subtopicNodeId,
                type: ConnectionLineType.SmoothStep,
                animated: true,
                style: { stroke: "#8b5cf6" },
              });
            });
          }
        });
      } else {
        console.error(
          "topics is not an array or is empty:",
          learningPath.topics
        );
      }

      // Update node statuses based on their relationships
      const updatedNodes = updateNodeStatuses(nodes, edges);

      console.log("Successfully created nodes and edges:", {
        nodes: updatedNodes.length,
        edges: edges.length,
      });
      return { nodes: updatedNodes, edges };
    } catch (error) {
      console.error("Error creating nodes and edges:", error);
      return { nodes: [], edges: [] };
    }
  }, [
    learningPath,
    fullscreen,
    nodeSpacing,
    handleNodeStatusChange,
    handleNodeUpdate,
    updateNodeStatuses,
  ]);

  // Check if we have saved nodes and edges for this roadmap
  const savedRoadmap =
    state.currentRoadmap && state.currentRoadmap.id === roadmapId
      ? state.currentRoadmap
      : null;

  // Initialize nodes and edges
  const initialData = createNodesAndEdges();

  // Convert saved NodeData to ReactFlow Nodes with proper position and id
  const initialNodes =
    savedRoadmap?.nodes && savedRoadmap.nodes.length > 0
      ? savedRoadmap.nodes.map((nodeData, index) => {
          // Ensure nodeData has id and position properties
          const nodeId = nodeData.id || `node_${index}`;
          const nodePosition = nodeData.position || { x: 0, y: 0 };

          // Create a proper ReactFlow Node
          return {
            id: nodeId,
            position: nodePosition,
            data: {
              ...nodeData,
              onStatusChange: handleNodeStatusChange,
              onNodeUpdate: handleNodeUpdate,
            },
            type: nodeData.type || "default",
          } as Node;
        })
      : initialData.nodes;

  const initialEdges =
    savedRoadmap?.edges && savedRoadmap.edges.length > 0
      ? savedRoadmap.edges
      : initialData.edges;

  // Set up nodes and edges state
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Store initial state for reset functionality
  const initialStateRef = useRef({ nodes: initialNodes, edges: initialEdges });

  // Listen for changes in color scheme
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => setDarkMode(e.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Update nodes and edges when learningPath or spacing changes
  useEffect(() => {
    if (
      !savedRoadmap ||
      (savedRoadmap.nodes && savedRoadmap.nodes.length === 0)
    ) {
      const { nodes: newNodes, edges: newEdges } = createNodesAndEdges();
      console.log("Setting new nodes and edges:", {
        nodes: newNodes.length,
        edges: newEdges.length,
      });
      setNodes(newNodes);
      setEdges(newEdges);

      // Reset history when learning path changes
      initialStateRef.current = { nodes: newNodes, edges: newEdges };
      setHistory([{ nodes: newNodes, edges: newEdges }]);
      setHistoryIndex(0);
    }
  }, [
    learningPath,
    nodeSpacing,
    createNodesAndEdges,
    setNodes,
    setEdges,
    savedRoadmap,
  ]);

  // Update node progress and status whenever nodes change
  useEffect(() => {
    if (nodes.length > 0) {
      const updatedNodes = updateNodeStatuses(nodes, edges);
      if (JSON.stringify(updatedNodes) !== JSON.stringify(nodes)) {
        setNodes(updatedNodes);
      }
    }
  }, [nodes, edges, setNodes, updateNodeStatuses]);

  // Add the useRefs
  const prevNodesRef = useRef<string>("");
  const prevEdgesRef = useRef<string>("");

  // Save changes to context when nodes or edges change
  useEffect(() => {
    if (nodes.length > 0 && edges.length > 0) {
      // Stringify the nodes and edges to compare with previous values
      const nodesString = JSON.stringify(nodes);
      const edgesString = JSON.stringify(edges);

      // Only update if the nodes or edges have actually changed
      if (
        nodesString !== prevNodesRef.current ||
        edgesString !== prevEdgesRef.current
      ) {
        prevNodesRef.current = nodesString;
        prevEdgesRef.current = edgesString;

        // Convert ReactFlow nodes to NodeData before saving
        const nodeData = nodes.map((node) => {
          // Extract the necessary properties from the node
          return {
            ...node.data,
            id: node.id,
            position: node.position,
            type: node.type,
          } as NodeData;
        });

        updateNodesAndEdges(nodeData, edges);
      }
    }
  }, [nodes, edges, updateNodesAndEdges]);

  // Add to history when nodes or edges change
  useEffect(() => {
    if (nodes.length > 0 && edges.length > 0) {
      // Only add to history if this is a new state (not from undo)
      if (historyIndex === history.length - 1) {
        // Don't add if it's the same as the last state
        const lastState = history[historyIndex];
        if (
          lastState &&
          JSON.stringify(lastState.nodes) === JSON.stringify(nodes) &&
          JSON.stringify(lastState.edges) === JSON.stringify(edges)
        ) {
          return;
        }

        setHistory((prev) => [
          ...prev.slice(0, historyIndex + 1),
          { nodes, edges },
        ]);
        setHistoryIndex((prev) => prev + 1);
      }
    }
  }, [nodes, edges, history, historyIndex]);

  // Handle undo
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setNodes(prevState.nodes);
      setEdges(prevState.edges);
      setHistoryIndex((prev) => prev - 1);
    }
  }, [history, historyIndex, setNodes, setEdges]);

  // Handle reset
  const handleReset = useCallback(() => {
    setNodes(initialStateRef.current.nodes);
    setEdges(initialStateRef.current.edges);
    setHistory([initialStateRef.current]);
    setHistoryIndex(0);

    // Also reset the spacing
    setNodeSpacing(1);

    // Fit view
    setTimeout(() => {
      reactFlowInstance.fitView({ padding: 0.2 });
    }, 50);
  }, [setNodes, setEdges, reactFlowInstance]);

  // Handle save
  const handleSave = useCallback(async () => {
    try {
      // Convert ReactFlow nodes to NodeData before saving
      const nodeData = nodes.map((node) => {
        // Extract the necessary properties from the node
        return {
          ...node.data,
          id: node.id,
          position: node.position,
          type: node.type,
        } as NodeData;
      });

      await saveRoadmap(nodeData, edges);

      toast({
        title: "Roadmap saved",
        description: "Your roadmap has been saved successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      if (onSave) {
        onSave();
      }
    } catch (err) {
      toast({
        title: "Error saving roadmap",
        description: err instanceof Error ? err.message : "An error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [nodes, edges, saveRoadmap, toast, onSave]);

  // Handle adding a new node
  const handleAddNode = (nodeData: NodeData) => {
    const newNode: Node = {
      id: `node_${Date.now()}`,
      type: "custom",
      position: reactFlowInstance.project({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      }),
      data: {
        ...nodeData,
        onStatusChange: handleNodeStatusChange,
        onNodeUpdate: handleNodeUpdate,
      },
    };

    setNodes((nds) => nds.concat(newNode));
    toast({
      title: "Node added",
      description: "New node has been added to the roadmap",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Handle edge connections
  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: ConnectionLineType.SmoothStep,
            animated: true,
            style: { stroke: "#6366f1" },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  // Calculate progress statistics
  const progressStats = {
    total: nodes.length,
    notStarted: nodes.filter((node) => node.data.status === "not-started")
      .length,
    inProgress: nodes.filter((node) => node.data.status === "in-progress")
      .length,
    completed: nodes.filter((node) => node.data.status === "completed").length,
  };

  const progressPercentage =
    Math.round((progressStats.completed / progressStats.total) * 100) || 0;

  // Handle node spacing change
  const handleNodeSpacingChange = (newSpacing: number) => {
    setNodeSpacing(newSpacing);

    // Recalculate node positions based on new spacing
    if (nodes.length > 0) {
      const mainNode = nodes.find((node) => node.id === "0");
      if (!mainNode) return;

      const mainPosition = mainNode.position;

      // Update positions of all nodes except the main node
      setNodes(
        nodes.map((node) => {
          if (node.id === "0") return node;

          // Calculate the vector from main node to this node
          const dx = node.position.x - mainPosition.x;
          const dy = node.position.y - mainPosition.y;

          // Calculate the distance from main node
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Calculate the unit vector
          const unitX = dx / distance;
          const unitY = dy / distance;

          // Calculate the new distance based on spacing
          const baseDistance = node.type === "topic" ? 400 : 700;
          const newDistance = baseDistance * newSpacing;

          // Calculate the new position
          const newX = mainPosition.x + unitX * newDistance;
          const newY = mainPosition.y + unitY * newDistance;

          return {
            ...node,
            position: { x: newX, y: newY },
          };
        })
      );
    }
  };

  // Add debug logging for nodes and edges
  useEffect(() => {
    console.log("Current nodes and edges:", {
      nodes: nodes.length,
      edges: edges.length,
    });
  }, [nodes, edges]);

  // If no nodes, show debug info
  if (nodes.length === 0) {
    console.error("No nodes to render. LearningPath:", learningPath);
    return (
      <div className="flex flex-col items-center justify-center h-full w-full bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">
          No roadmap data to display
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          The roadmap data could not be processed correctly.
        </p>
        <pre className="bg-gray-200 dark:bg-gray-700 p-4 rounded text-xs overflow-auto max-w-full max-h-[300px]">
          {JSON.stringify(learningPath, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      connectionLineType={ConnectionLineType.SmoothStep}
      fitView
      minZoom={0.1}
      maxZoom={1.5}
      defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
      style={{ height: "100%", width: "100%" }} // Ensure proper dimensions
    >
      <Background
        color={darkMode || fullscreen ? "#333" : "#e0e0e0"}
        gap={16}
        size={1}
        variant={BackgroundVariant.Dots}
      />

      <Controls
        position={controlPosition}
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-md ${
          fullscreen ? "fullscreen-controls" : ""
        }`}
        showInteractive={true}
      />

      {fullscreen && (
        <MiniMap
          nodeStrokeColor={(n) => {
            if (n.type === "main") return "#10b981";
            if (n.type === "topic") return "#6366f1";
            if (n.type === "subtopic") return "#8b5cf6";
            return "#cbd5e1";
          }}
          nodeColor={(n) => {
            if (n.type === "main") return "#d1fae5";
            if (n.type === "topic") return "#e0e7ff";
            if (n.type === "subtopic") return "#ede9fe";
            return "#f8fafc";
          }}
          maskColor="rgba(0, 0, 0, 0.2)"
          style={{
            right: 20,
            bottom: 150,
            backgroundColor: darkMode
              ? "rgba(23, 25, 35, 0.9)"
              : "rgba(255, 255, 255, 0.9)",
          }}
        />
      )}

      {/* Top left panel - Undo, Reset, Save */}
      <Panel
        position={controlPosition === "top-right" ? "top-left" : "top-right"}
        className="bg-white dark:bg-gray-800 p-2 rounded-md shadow-md"
      >
        <ButtonGroup size="sm" isAttached mb={2}>
          <Tooltip label="Undo last change">
            <Button
              leftIcon={<Undo size={16} />}
              onClick={handleUndo}
              isDisabled={historyIndex <= 0}
              colorScheme="blue"
              variant="outline"
              size="sm"
            >
              Undo
            </Button>
          </Tooltip>
          <Tooltip label="Reset to original layout">
            <Button
              leftIcon={<RotateCcw size={16} />}
              onClick={handleReset}
              colorScheme="blue"
              variant="outline"
              size="sm"
            >
              Reset
            </Button>
          </Tooltip>
        </ButtonGroup>

        <Box>
          <Tooltip label="Save roadmap">
            <Button
              leftIcon={<Save size={16} />}
              onClick={handleSave}
              colorScheme="green"
              size="sm"
              width="100%"
              mb={2}
            >
              Save Roadmap
            </Button>
          </Tooltip>
        </Box>

        {/* Add Node Button */}
        <Box mb={2}>
          <Tooltip label="Add a new node">
            <Button
              leftIcon={<PlusCircle size={16} />}
              onClick={onAddNodeOpen}
              colorScheme="teal"
              size="sm"
              width="100%"
            >
              Add Node
            </Button>
          </Tooltip>
        </Box>

        {/* Node spacing control */}
        <Box mt={2} mb={3}>
          <Text fontSize="xs" mb={1} color="gray.600">
            Node Spacing
          </Text>
          <Slider
            min={0.5}
            max={2}
            step={0.1}
            value={nodeSpacing}
            onChange={handleNodeSpacingChange}
            colorScheme="blue"
            size="sm"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={6}>
              <Box
                color="blue.500"
                as={nodeSpacing < 1 ? ZoomOut : ZoomIn}
                size={10}
              />
            </SliderThumb>
          </Slider>
        </Box>

        <Divider my={2} />

        {/* Progress Stats */}
        <Box mt={3}>
          <Text fontSize="xs" fontWeight="bold" mb={1} color="gray.600">
            Progress: {progressPercentage}%
          </Text>
          <Flex justifyContent="space-between" mb={2}>
            <Badge
              colorScheme="gray"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <Circle size={10} /> {progressStats.notStarted}
            </Badge>
            <Badge
              colorScheme="blue"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <Clock3 size={10} /> {progressStats.inProgress}
            </Badge>
            <Badge
              colorScheme="green"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <CheckCircle size={10} /> {progressStats.completed}
            </Badge>
          </Flex>
        </Box>
      </Panel>

      {/* Bottom center panel */}
      <Panel
        position="bottom-center"
        className="bg-white dark:bg-gray-800 p-2 rounded-md shadow-md"
      >
        <Box fontSize="xs" color="gray.500">
          Scroll to zoom • Drag to pan • Click nodes for details
        </Box>
      </Panel>

      {/* Add Node Dialog */}
      <AddNodeDialog
        isOpen={isAddNodeOpen}
        onClose={onAddNodeClose}
        onAddNode={handleAddNode}
      />
    </ReactFlow>
  );
}

// Wrapper component that provides the ReactFlow context
export default function RoadmapVisualization(props: RoadmapVisualizationProps) {
  return (
    <ReactFlowProvider>
      <div
        style={{ height: "800px", width: "100%" }}
        className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800"
      >
        <RoadmapFlow {...props} />
      </div>
    </ReactFlowProvider>
  );
}
