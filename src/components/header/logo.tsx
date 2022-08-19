import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Link,
  Icon,
  Heading,
  HStack,
} from '@chakra-ui/react';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

export const Logo = () => {
  const linkColor = 'yellow.400';

  return (
    <Link
      href="/"
      _hover={{
        textDecoration: 'none',
      }}
    >
      <Heading
        as="h1"
        fontSize={['md', 'xl', '2xl', '3xl']}
        cursor="pointer"
      >
        <Flex position="relative">
          <Icon
            position="relative"
            as={GoChevronLeft}
            transform="rotate(-15deg)"
            w={7}
            h={7}
            color={linkColor}
            top={1}
          />
          <HStack display={{ base: 'none', sm: 'flex' }} spacing={2}>
            <Text textShadow="1px 2px #319795">
              RS
              {' '}
              <Box
                as="span"
                position="relative"
                _before={{
                  content: '""',
                  bg: linkColor,
                  position: 'absolute',
                  top: '-0.15rem',
                  right: '-0.15rem',
                  bottom: '-0.15rem',
                  left: '-0.15rem',
                  transform: 'rotate(-4deg)',
                }}
              >
                <Box
                  as="span"
                  textShadow="1px 2px #319795"
                  color={useColorModeValue('white', 'black')}
                  position="relative"
                >
                  Lang
                </Box>
              </Box>
            </Text>
          </HStack>
          <Icon
            position="relative"
            as={GoChevronRight}
            transform="rotate(-15deg)"
            w={7}
            h={7}
            color={linkColor}
            bottom={1}
          />
        </Flex>
      </Heading>
    </Link>
  );
};
