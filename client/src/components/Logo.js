import { Box, Text } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Logo({ size = "md", should_animate = false }) {
  const [isClient, setIsClient] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (should_animate) {
      const timer = setTimeout(() => setHasAnimated(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [should_animate]);

  const sizes = {
    sm: {
      box: "100px",
      font: "24px",
      subFont: "14px",
      final_y_position: 20,
      final_x_position: 58,
    },
    md: {
      box: "150px",
      font: "36px",
      subFont: "21px",
      final_y_position: 35,
      final_x_position: 100,
    },
    lg: {
      box: "200px",
      font: "48px",
      subFont: "28px",
      final_y_position: 45,
      final_x_position: 120,
    },
  };

  const MotionBox = motion(Box);
  const MotionText = motion(Text);

  return (
    <Box position="relative" display="inline-flex" alignItems="center">
      <MotionBox
        width={sizes[size].box}
        height={sizes[size].box}
        bg="linear-gradient(135deg, #8B5CF6, #6B46C1)"
        borderRadius="12px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
        transition="all 0.3s ease"
        _hover={{
          boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
        }}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
      >
        <Text
          color="white"
          fontSize={sizes[size].font}
          fontWeight="bold"
          fontFamily="'Roboto', sans-serif"
          letterSpacing="1px"
          pb={should_animate && 2}
        >
          Clue.
        </Text>
        <AnimatePresence>
          {isClient && should_animate && (
            <MotionText
              color={hasAnimated ? "transparent" : "white"}
              fontSize={sizes[size].subFont}
              fontWeight="medium"
              fontFamily="'Roboto', sans-serif"
              letterSpacing="0.5px"
              whiteSpace="nowrap"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 1 }}
            >
              For Clueless
            </MotionText>
          )}
        </AnimatePresence>
      </MotionBox>
      <AnimatePresence>
        {isClient && should_animate && hasAnimated && (
          <MotionBox
            position="absolute"
            marginLeft="0px"
            initial={{ opacity: 0, x: 0, y: sizes[size].final_y_position }}
            animate={{
              opacity: 1,
              x: sizes[size].final_x_position,
              y: sizes[size].final_y_position,
            }}
            exit={{ opacity: 0, x: 150, y: sizes[size].final_y_position }}
            transition={{
              type: "spring",
              stiffness: 150, // Lowering the stiffness makes the animation slower
              damping: 25, // Higher damping slows it down and makes it smoother
              duration: 1.5, // Setting a specific duration for the transition
            }}
          >
            <MotionText
              color="white"
              fontSize={sizes[size].subFont}
              fontWeight="medium"
              fontFamily="'Roboto', sans-serif"
              letterSpacing="0.5px"
              whiteSpace="nowrap"
              padding="4px 12px"
              borderRadius="full"
              bg="linear-gradient(135deg, #8B5CF6, #6B46C1)"
            >
              For Clueless
            </MotionText>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
}
