import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  SimpleGrid,
  Link,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Stack,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  ChakraProvider,
  extendTheme,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Avatar,
} from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import {
  FaRocket,
  FaRoad,
  FaCompass,
  FaChartLine,
  FaLink,
  FaMapMarkedAlt,
  FaMobileAlt,
  FaRegCreditCard,
  FaBars,
  FaQuoteLeft,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

// Assume these imports are working
import AmazonLogo from "../assets/Amazon.webp";
import DeloitteLogo from "../assets/Deloitte-1.webp";
import EvLogo from "../assets/Ev-1.webp";
import GeAviationLogo from "../assets/Ge-aviation-1.webp";
import MoreLogo from "../assets/More-1.webp";
import HanaLogo from "../assets/Hana.webp";
import ThrasioLogo from "../assets/Thrasio-1.webp";
import UnoLogo from "../assets/Uno-1.webp";
import YomaBankLogo from "../assets/Yoma-Bank-1.webp";


const theme = extendTheme({
  colors: {
    brand: {
      50: "#F0E6FF",
      100: "#E0D0FF",
      200: "#C2A6FF",
      300: "#A37DFF",
      400: "#8554FF",
      500: "#672BFF",
      600: "#5215CC",
      700: "#3D0F99",
      800: "#290A66",
      900: "#140533",
    },
    accent: {
      50: "#E6FFFB",
      100: "#B3FFF6",
      200: "#80FFF2",
      300: "#4DFFED",
      400: "#1AFFE9",
      500: "#00E6D1",
      600: "#00B3A3",
      700: "#008075",
      800: "#004D47",
      900: "#001A19",
    },
    neutral: {
      50: "#F7FAFC",
      100: "#EDF2F7",
      200: "#E2E8F0",
      300: "#CBD5E0",
      400: "#A0AEC0",
      500: "#718096",
      600: "#4A5568",
      700: "#2D3748",
      800: "#1A202C",
      900: "#171923",
    },
  },
  styles: {
    global: {
      body: {
        bg: "brand.50",
        color: "neutral.800",
      },
    },
  },
});

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="white"
      color="neutral.800"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="999"
      boxShadow="0 2px 10px rgba(0,0,0,0.05)"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"tighter"}>
          ClueForClueless.
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={onOpen}>
        <FaBars />
      </Box>

      <HStack
        spacing={8}
        alignItems={"center"}
        display={{ base: "none", md: "flex" }}
      >
        <Link href="#features">Features</Link>
        <Link href="#pricing">Pricing</Link>
        <Link href="#contact">Contact</Link>
      </HStack>

      <HStack display={{ base: "none", md: "flex" }}>
        <NavLink to="/login">
          <Button colorScheme="brand" variant="outline">
            Login
          </Button>
        </NavLink>
        <NavLink to="/signup">
          <Button colorScheme="brand">Register</Button>
        </NavLink>
      </HStack>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4}>
              <Link href="#features" onClick={onClose}>
                Features
              </Link>
              <Link href="#pricing" onClick={onClose}>
                Pricing
              </Link>
              <Link href="#contact" onClick={onClose}>
                Contact
              </Link>
              <Button colorScheme="brand" variant="outline" w="full">
                Login
              </Button>
              <Button colorScheme="brand" w="full">
                Register
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

const Hero = () => (
  <Box
    bgGradient="linear(to-b, brand.200, brand.400)"
    color="neutral.800"
    py={{ base: 20, md: 32 }}
    px={8}
    textAlign="center"
  >
    <Container maxW={"3xl"}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Heading as="h2" size="3xl" mb={6}>
          Unlock Your Career Potential with ClueForClueless
        </Heading>
        <Text fontSize="xl" mb={8}>
          Your all-in-one platform for personalized career guidance, curated
          courses, and success roadmaps.
        </Text>
        <Button
          as={motion.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          bg="brand.500"
          color="white"
          size="lg"
          fontWeight="bold"
          px={8}
          _hover={{
            bg: "brand.600",
          }}
        >
          Start Your Journey
        </Button>
      </MotionBox>
    </Container>
  </Box>
);

const Feature = ({ title, text, icon }) => (
  <MotionBox
    whileHover={{ scale: 1.05 }}
    p={5}
    shadow="md"
    borderWidth="1px"
    borderRadius="lg"
    bg="white"
  >
    <VStack>
      <Icon as={icon} w={10} h={10} color="brand.400" />
      <Text fontWeight={600}>{title}</Text>
      <Text color={"neutral.600"} textAlign="center">
        {text}
      </Text>
    </VStack>
  </MotionBox>
);

const Features = () => (
  <Box py={20} id="features" bg="white">
    <Container maxW={"6xl"}>
      <Heading textAlign="center" mb={12} color="neutral.800">
        Powerful Features to Guide Your Success
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
        <Feature
          icon={FaRocket}
          title={"Course Marketplace"}
          text={"Discover top-rated courses tailored to your career goals."}
        />
        <Feature
          icon={FaRoad}
          title={"Career Roadmaps"}
          text={"Visualize your path to success with AI-generated roadmaps."}
        />
        <Feature
          icon={FaCompass}
          title={"Path Guidance"}
          text={"Get personalized recommendations for your career journey."}
        />
        <Feature
          icon={FaChartLine}
          title={"Progress Tracking"}
          text={"Monitor your growth with built-in progress trackers."}
        />
        <Feature
          icon={FaLink}
          title={"Course Matching"}
          text={"Find similar courses on our platform from external URLs."}
        />
        <Feature
          icon={FaMapMarkedAlt}
          title={"Custom Roadmaps"}
          text={"Create and share your own career roadmaps."}
        />
        <Feature
          icon={FaMobileAlt}
          title={"OTP Authentication"}
          text={"Secure access to AI-generated roadmaps."}
        />
        <Feature
          icon={FaRegCreditCard}
          title={"Flexible Subscriptions"}
          text={"Choose quarterly or annual plans to suit your needs."}
        />
      </SimpleGrid>
    </Container>
  </Box>
);

const TrustedBy = () => {
  const controls = useAnimation();
  const logos = [AmazonLogo, DeloitteLogo, EvLogo, GeAviationLogo, MoreLogo, HanaLogo, MoreLogo,ThrasioLogo,UnoLogo,YomaBankLogo];

  useEffect(() => {
    controls.start({
      x: ["-100%", "0%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 50,
          ease: "linear",
        },
      },
    });
  }, [controls]);

  return (
    <Box bg="neutral.100" py={10} overflow="hidden">
      <Container maxW="4xl">
        <Heading textAlign="center" mb={6} fontSize="2xl" color="neutral.800">
          Trusted by Industry Leaders
        </Heading>
        <MotionFlex animate={controls} width="200%">
          {[...logos, ...logos].map((logo, index) => (
            <Box key={index} width="10%" flexShrink={0} px={2}>
              <img src={logo} alt={`Partner ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
            </Box>
          ))}
        </MotionFlex>
      </Container>
    </Box>
  );
};

const PricingCard = ({ name, price, features }) => (
  <MotionBox
    whileHover={{ scale: 1.05 }}
    maxW={"330px"}
    w={"full"}
    bg={"white"}
    boxShadow={"2xl"}
    rounded={"2xl"}
    overflow={"hidden"}
    transition={{ duration: 0.3 }}
  >
    <Stack textAlign={"center"} p={6} color={"neutral.800"} align={"center"}>
      <Text
        fontSize={"sm"}
        fontWeight={500}
        bg={"brand.500"}
        p={2}
        px={3}
        color={"white"}
        rounded={"full"}
      >
        {name}
      </Text>
      <Stack direction={"row"} align={"center"} justify={"center"}>
        <Text fontSize={"3xl"}>$</Text>
        <Text fontSize={"6xl"} fontWeight={800}>
          {price}
        </Text>
      </Stack>
    </Stack>

    <Box bg={"neutral.50"} px={6} py={10}>
      {features.map((feature, index) => (
        <HStack key={index} mt={5} spacing={5} alignItems="flex-start">
          <Flex
            w={8}
            h={8}
            align={"center"}
            justify={"center"}
            rounded={"full"}
            bg="brand.400"
          >
            <Icon as={FaRocket} color="white" />
          </Flex>
          <Text>{feature}</Text>
        </HStack>
      ))}
      <Button
        mt={10}
        w={"full"}
        bg={"brand.500"}
        color={"white"}
        rounded={"xl"}
        boxShadow={"0 5px 20px 0px rgb(103 43 255 / 43%)"}
        _hover={{
          bg: "brand.600",
        }}
        _focus={{
          bg: "brand.600",
        }}
      >
        Start Now
      </Button>
    </Box>
  </MotionBox>
);

const Pricing = () => (
  <Box py={20} id="pricing" bg="white">
    <Container maxW={"6xl"}>
      <Heading textAlign="center" mb={12} color="neutral.800">
        Choose Your Success Plan
      </Heading>
      <Flex justifyContent="center" alignItems="center" flexWrap="wrap" gap={8}>
        <PricingCard
          name="Quarterly"
          price={25}
          features={[
            "Full access to course marketplace",
            "4 AI-generated roadmaps per month",
            "Progress tracking",
            "Path guidance",
          ]}
        />
        <PricingCard
          name="Annual"
          price={65}
          features={[
            "All Quarterly features",
            "6 AI-generated roadmaps per month",
            "Priority support",
            "Early access to new features",
          ]}
        />
      </Flex>
    </Container>
  </Box>
);

const FAQSection = () => (
  <Box py={20} bg="brand.200" bgGradient="linear(to-5, brand.300, brand.500)">
    <Container maxW="4xl">
      <Heading textAlign="center" mb={12} color="neutral.800">
        Frequently Asked Questions
      </Heading>
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight={500}>
                What is ClueForClueless?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} color="white"fontWeight={400}>
            ClueForClueless is an all-in-one platform for personalized career guidance, curated courses, and success roadmaps. We help professionals unlock their career potential through AI-powered recommendations and a vast marketplace of courses.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight={500}>
                How does the AI-generated roadmap work?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} color="white"fontWeight={400}>
            Our AI analyzes your skills, goals, and industry trends to create a personalized career roadmap. It suggests courses, milestones, and skills to acquire, helping you visualize and achieve your career objectives.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight={500}>
                Can I cancel my subscription anytime?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} color="white"fontWeight={400}>
            Yes, you can cancel your subscription at any time. If you cancel, you'll continue to have access to Clue until the end of your current billing period.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Container>
  </Box>
);

const TestimonialCard = ({ name, role, company, testimonial }) => (
  <Box
    maxW="sm"
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    p={6}
    bg="white"
    boxShadow="lg"
  >
    <VStack spacing={4} align="start">
      <Icon as={FaQuoteLeft} w={8} h={8} color="brand.400" />
      <Text fontSize="md" fontStyle="italic">
        "{testimonial}"
      </Text>
      <HStack spacing={4}>
        <Avatar name={name} src={`https://i.pravatar.cc/150?u=${name}`} />
        <Box>
          <Text fontWeight="bold">{name}</Text>
          <Text fontSize="sm" color="neutral.500">
            {role}, {company}
          </Text>
        </Box>
      </HStack>
    </VStack>
  </Box>
);

const Testimonials = () => (
  <Box py={20} bg="white">
    <Container maxW="6xl">
      <Heading textAlign="center" mb={12} color="neutral.800">
        What Our Users Say
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
        <TestimonialCard
          name="John Doe"
          role="Software Engineer"
          company="Tech Corp"
          testimonial="CFC has been instrumental in my career growth. The AI-generated roadmap gave me clear direction on what skills to develop next."
        />
        <TestimonialCard
          name="Jane Smith"
          role="Marketing Manager"
          company="Brand Inc"
          testimonial="The course marketplace is fantastic! I found high-quality courses that directly applied to my career goals. Highly recommended!"
        />
        <TestimonialCard
          name="Alex Johnson"
          role="Data Scientist"
          company="Data Analytics Co"
          testimonial="As someone transitioning careers, CFC provided the guidance I needed. The personalized recommendations were spot-on!"
        />
      </SimpleGrid>
    </Container>
  </Box>
);

const Contact = () => (
  <Box py={20} id="contact" bg="neutral.100">
    <Container maxW={"6xl"}>
      <Heading textAlign="center" mb={12} color="neutral.800">
        Get in Touch
      </Heading>
      <Box
        bg={"white"}
        borderRadius="2xl"
        p={8}
        color={"neutral.800"}
        shadow="xl"
      >
        <VStack spacing={5}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" placeholder="Your Name" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" placeholder="Your Email" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Message</FormLabel>
            <Textarea
              name="message"
              placeholder="Your Message"
              rows={6}
              resize="none"
            />
          </FormControl>
          <Button
            as={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            colorScheme="brand"
            bg="brand.500"
            color="white"
            _hover={{
              bg: "brand.600",
            }}
            width="full"
          >
            Send Message
          </Button>
        </VStack>
      </Box>
    </Container>
  </Box>
);

const Footer = () => (
  <Box bg={"brand.700"} color={"white"}>
    <Container
      as={Stack}
      maxW={"6xl"}
      py={4}
      direction={{ base: "column", md: "row" }}
      spacing={4}
      justify={{ base: "center", md: "space-between" }}
      align={{ base: "center", md: "center" }}
    >
      <Text>© 2024 ClueForClueless. All rights reserved</Text>
      <Stack direction={"row"} spacing={6}>
        <Link href={"#"}>Privacy Policy</Link>
        <Link href={"#"}>Terms of Service</Link>
      </Stack>
    </Container>
  </Box>
);

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(true);

  const handleAccept = () => {
    setShowConsent(false);
    // Here you would typically set a cookie or local storage item
    localStorage.setItem('cookieConsent', 'true');
  };

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (consent === 'true') {
      setShowConsent(false);
    }
  }, []);

  if (!showConsent) return null;

  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg="white"
      boxShadow="0 -2px 10px rgba(0,0,0,0.1)"
      zIndex={999}
    >
      <Container maxW="6xl" py={4}>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="sm">
            This website stores cookies on your computer to serve you better. For more details, visit our{" "}
            <Link color="brand.500" href="/privacy-policy">
              Privacy Policy
            </Link>
            .
          </Text>
          <Button colorScheme="brand" size="sm" onClick={handleAccept}>
            Accept
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default function LandingPage() {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Navbar />
        <Hero />
        <Features />
        <TrustedBy />
        <Pricing />
        <FAQSection />
        <Testimonials />
        <Contact />
        <Footer />
        <CookieConsent />
      </Box>
    </ChakraProvider>
  );
}