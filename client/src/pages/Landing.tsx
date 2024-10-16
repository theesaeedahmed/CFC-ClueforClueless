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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
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
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

// Custom theme
const theme = extendTheme({
  colors: {
    brand: {
      100: "#F5F5F5",
      200: "#A9A3FF",
      300: "#6C63FF",
      400: "#FF6B6B",
      500: "#333333",
    },
  },
  styles: {
    global: {
      body: {
        bg: "brand.100",
        color: "brand.500",
      },
    },
  },
});

const MotionBox = motion(Box);

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
      color="brand.500"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="999"
      boxShadow="sm"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"tighter"}>
          Clue.
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
    bgGradient="linear(to-r, brand.300, brand.400)"
    color="white"
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
          Unlock Your Career Potential with Clue
        </Heading>
        <Text fontSize="xl" mb={8}>
          Your all-in-one platform for personalized career guidance, curated
          courses, and success roadmaps.
        </Text>
        <Button
          as={motion.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          colorScheme="whiteAlpha"
          size="lg"
          fontWeight="bold"
          px={8}
          _hover={{
            bg: "white",
            color: "brand.300",
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
      <Icon as={icon} w={10} h={10} color="brand.300" />
      <Text fontWeight={600}>{title}</Text>
      <Text color={"brand.500"} textAlign="center">
        {text}
      </Text>
    </VStack>
  </MotionBox>
);

const Features = () => (
  <Box py={20} id="features">
    <Container maxW={"6xl"}>
      <Heading textAlign="center" mb={12}>
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
    <Stack textAlign={"center"} p={6} color={"brand.500"} align={"center"}>
      <Text
        fontSize={"sm"}
        fontWeight={500}
        bg={"brand.200"}
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

    <Box bg={"brand.100"} px={6} py={10}>
      {features.map((feature:any, index:any) => (
        <HStack key={index} mt={5} spacing={5} alignItems="flex-start">
          <Flex
            w={8}
            h={8}
            align={"center"}
            justify={"center"}
            rounded={"full"}
            bg="brand.200"
          >
            <Icon as={FaRocket} color="white" />
          </Flex>
          <Text>{feature}</Text>
        </HStack>
      ))}
      <Button
        mt={10}
        w={"full"}
        bg={"brand.300"}
        color={"white"}
        rounded={"xl"}
        boxShadow={"0 5px 20px 0px rgb(108 99 255 / 43%)"}
        _hover={{
          bg: "brand.400",
        }}
        _focus={{
          bg: "brand.400",
        }}
      >
        Start Now
      </Button>
    </Box>
  </MotionBox>
);

const Pricing = () => (
  <Box py={20} id="pricing">
    <Container maxW={"6xl"}>
      <Heading textAlign="center" mb={12}>
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

const Contact = () => (
  <Box py={20} id="contact">
    <Container maxW={"6xl"}>
      <Heading textAlign="center" mb={12}>
        Get in Touch
      </Heading>
      <Box
        bg={"white"}
        borderRadius="2xl"
        p={8}
        color={"brand.500"}
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
            bg="brand.300"
            color="white"
            _hover={{
              bg: "brand.400",
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
  <Box bg={"brand.500"} color={"white"}>
    <Container
      as={Stack}
      maxW={"6xl"}
      py={4}
      direction={{ base: "column", md: "row" }}
      spacing={4}
      justify={{ base: "center", md: "space-between" }}
      align={{ base: "center", md: "center" }}
    >
      <Text>© 2024 Clue. All rights reserved</Text>
      <Stack direction={"row"} spacing={6}>
        <Link href={"#"}>Privacy Policy</Link>
        <Link href={"#"}>Terms of Service</Link>
      </Stack>
    </Container>
  </Box>
);

export default function LandingPage() {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Navbar />
        <Hero />
        <Features />
        <Pricing />
        <Contact />
        <Footer />
      </Box>
    </ChakraProvider>
  );
}
