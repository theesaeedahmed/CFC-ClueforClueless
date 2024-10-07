"use client"
import { FaGoogle, FaApple } from 'react-icons/fa'
import { Box, Flex, Text, Button, Stack, useColorModeValue, useBreakpointValue } from '@chakra-ui/react';
//import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { useState } from 'react';

const NAV_ITEMS = [
  { label: 'Courses', href: '/courses' },
  { label: 'Roadmaps', href: '/roadmaps' },
  { label: 'Community', href: '/community' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue('#DBB5B5', '#987070')}
        color={useColorModeValue('#987070', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('#987070', '#DBB5B5')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <Button
            onClick={handleToggle}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
            leftIcon={isOpen ? <FaGoogle w={3} h={3} /> : <FaApple w={5} h={5} />}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('#987070', 'white')}
            fontWeight="bold"
          >
            CFC-ClueForClueless
          </Text>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
        <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
          <Button
            as={'a'}
            fontSize={'sm'}
            fontWeight={400}
            variant={'link'}
            href={'/login'}
            color={useColorModeValue('#987070', 'white')}
          >
            Sign In
          </Button>
          <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'#987070'}
            href={'/signup'}
            _hover={{
              bg: '#876060',
            }}
          >
            Sign Up
          </Button>
        </Stack>
      </Flex>

      {isOpen && <MobileNav />}
    </Box>
  );
}

const DesktopNav = () => {
  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <NextLink href={navItem.href} passHref>
            <Button
              as="a"
              p={2}
              fontSize={'sm'}
              fontWeight={500}
              color={useColorModeValue('#987070', 'white')}
              variant="ghost"
              _hover={{
                textDecoration: 'none',
                color: useColorModeValue('#876060', '#ECC5C5'),
              }}
            >
              {navItem.label}
            </Button>
          </NextLink>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack bg={useColorModeValue('#DBB5B5', '#987070')} p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, href }) => {
  return (
    <Stack spacing={4}>
      <NextLink href={href} passHref>
        <Flex
          py={2}
          as={Button}
          variant="ghost"
          justify={'space-between'}
          align={'center'}
          _hover={{
            textDecoration: 'none',
          }}
        >
          <Text fontWeight={600} color={useColorModeValue('#987070', 'white')}>
            {label}
          </Text>
        </Flex>
      </NextLink>
    </Stack>
  );
};
