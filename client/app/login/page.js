"use client"
import { keyframes } from '@emotion/react';

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

} from '@chakra-ui/react'
import NextLink from 'next/link'



const animatedGradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export default function AuthPage({ isLogin = true }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log({ email, password, name })
  }

  return (
    <Flex minH="100vh" direction={{ base: 'column', md: 'row' }}>
      <Flex
        flex={1}
        align="center"
        justify="center"
        bgGradient="linear(to-r, #987070,#DBB5B5)"
        backgroundSize="200% 200%"
        animation={`${animatedGradient} 10s ease infinite`}
        p={4}
        color="white"
      >
        <Stack spacing={6} w="full" maxW="lg">
          <Heading fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}>
            {isLogin ? 'Welcome Back!' : 'Join Our Community'}
          </Heading>
          <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.100">
            CFC-ClueForClueless: Your gateway to personalized learning and career growth.
          </Text>
        </Stack>
      </Flex>
      <Flex flex={1} align="center" justify="center">
        <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
          <Stack align="center">
            <Heading fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
              {isLogin ? 'Sign in to your account' : 'Create your account'}
            </Heading>
          </Stack>
          <Box
            rounded="lg"
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow="lg"
            p={6}
          >
            <Stack spacing={3}>
              {!isLogin && (
                <FormControl id="name">
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
              )}
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg="#C39898"
                  color="white"
                  _hover={{
                    bg: '#987070',
                  }}
                  onClick={handleSubmit}
                >
                  {isLogin ? 'Sign in' : 'Sign up'}
                </Button>
              </Stack>
            </Stack>
          </Box>
          <Stack pt={6}>
            <Text align="center">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <NextLink href={isLogin ? "/signup" : "/login"} passHref>
                <Link color="#C39898" ml={1}>
                  {isLogin ? 'Sign up' : 'Sign in'}
                </Link>
              </NextLink>
            </Text>
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  )
}