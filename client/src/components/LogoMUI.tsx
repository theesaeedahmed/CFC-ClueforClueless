import  { useState, useEffect } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

// Define the props interface
interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  should_animate?: boolean;
}

// Create styled components
const GradientBox = styled(motion.div)({
  background: 'linear-gradient(135deg, #8B5CF6, #6B46C1)',
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
  },
});

const StyledTypography = styled(Typography)({
  color: 'white',
  fontFamily: "'Roboto', sans-serif",
  letterSpacing: '1px',
});

const SubText = styled(motion.div)({
  color: 'white',
  fontFamily: "'Roboto', sans-serif",
  letterSpacing: '0.5px',
  whiteSpace: 'nowrap',
  padding: '4px 12px',
  borderRadius: '9999px', // 'full' in Tailwind
  background: 'linear-gradient(135deg, #8B5CF6, #6B46C1)',
});

export default function Logo({ size = 'md', should_animate = false }: LogoProps) {
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
      box: '100px',
      font: '24px',
      subFont: '14px',
      final_y_position: 20,
      final_x_position: 58,
    },
    md: {
      box: '150px',
      font: '36px',
      subFont: '21px',
      final_y_position: 35,
      final_x_position: 100,
    },
    lg: {
      box: '200px',
      font: '48px',
      subFont: '28px',
      final_y_position: 45,
      final_x_position: 120,
    },
  };

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <GradientBox
        style={{
          width: sizes[size].box,
          height: sizes[size].box,
        }}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
      >
        <StyledTypography
          variant="h4"
          sx={{
            fontSize: sizes[size].font,
            fontWeight: 'bold',
            pb: should_animate ? 2 : 0,
          }}
        >
          Clue.
        </StyledTypography>
        <AnimatePresence>
          {isClient && should_animate && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 1 }}
            >
              <StyledTypography
                variant="subtitle1"
                sx={{
                  fontSize: sizes[size].subFont,
                  fontWeight: 'medium',
                  color: hasAnimated ? 'transparent' : 'white',
                }}
              >
                For Clueless
              </StyledTypography>
            </motion.div>
          )}
        </AnimatePresence>
      </GradientBox>
      <AnimatePresence>
        {isClient && should_animate && hasAnimated && (
          <motion.div
            style={{
              position: 'absolute',
              marginLeft: '0px',
            }}
            initial={{ opacity: 0, x: 0, y: sizes[size].final_y_position }}
            animate={{
              opacity: 1,
              x: sizes[size].final_x_position,
              y: sizes[size].final_y_position,
            }}
            exit={{ opacity: 0, x: 150, y: sizes[size].final_y_position }}
            transition={{
              type: 'spring',
              stiffness: 150,
              damping: 25,
              duration: 1.5,
            }}
          >
            <SubText>
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: sizes[size].subFont,
                  fontWeight: 'medium',
                }}
              >
                For Clueless
              </Typography>
            </SubText>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}