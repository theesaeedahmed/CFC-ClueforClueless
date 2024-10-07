"use client"
import { useState } from 'react'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Link,
  useColorModeValue,
  HStack,
  Checkbox,
  VStack,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { keyframes } from '@emotion/react';
import { FaGoogle, FaApple, FaEye, FaEyeSlash } from 'react-icons/fa'

const animatedGradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log({ name, email, password, confirmPassword, phoneNumber, agreeTerms })
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword)
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword)

  return (
    <Flex minH="100vh" direction={{ base: 'column', md: 'row' }}>
      <Flex
        flex={1}
        align="center"
        justify="center"
        bgGradient="linear(to-r, #987070, #DBB5B5)"
        backgroundSize="200% 200%"
        animation={`${animatedGradient} 10s ease infinite`}
        p={8}
        color="white"
      >
        <Stack spacing={6} w="full" maxW="lg">
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            Join Our Community
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color="gray.100">
            CFC-ClueForClueless: Your gateway to personalized learning and career growth.
          </Text>
        </Stack>
      </Flex>
      <Flex flex={1} align="center" justify="center">
        <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6} w="full">
          <Stack align="center">
            <Heading fontSize="4xl" color={useColorModeValue('gray.800', 'white')}>
              Create your account
            </Heading>
          </Stack>
          <Box
            rounded="lg"
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow="lg"
            p={8}
          >
            <VStack spacing={4}>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="phoneNumber" isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                      onClick={togglePasswordVisibility}
                      variant="ghost"
                      size="sm"
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="confirmPassword" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      icon={showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      onClick={toggleConfirmPasswordVisibility}
                      variant="ghost"
                      size="sm"
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                w="full"
                bg="#C39898"
                color="white"
                _hover={{
                  bg: '#987070',
                }}
                onClick={handleSubmit}
              >
                Sign up
              </Button>
              <HStack spacing={2} justify="center" w="full">
                <Button
                  w="full"
                  variant="outline"
                  leftIcon={<FaGoogle />}
                  onClick={() => console.log('Sign up with Google')}
                >
                  Google
                </Button>
                <Button
                  w="full"
                  variant="outline"
                  leftIcon={<FaApple />}
                  onClick={() => console.log('Sign up with Apple')}
                >
                  Apple
                </Button>
              </HStack>
              <Checkbox
                isChecked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              >
                By signing up you agree to terms and conditions
              </Checkbox>
            </VStack>
          </Box>
          <Text align="center">
            Already have an account?{" "}
            <NextLink href="/login" passHref>
              <Link color="#C39898">
                Sign in
              </Link>
            </NextLink>
          </Text>
        </Stack>
      </Flex>
    </Flex>
  )
}