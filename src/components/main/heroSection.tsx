import {
  chakra, Stack, Text, Button, VStack, Heading, useColorModeValue,
} from '@chakra-ui/react';

export const HeroSection = () => (
  <Stack
    bgImage={{
      base: 'none',
      md: '/assets/london2.jpg',
    }}
    backgroundSize="cover"
    backgroundPosition="center"
    backgroundRepeat="no-repeat"
    minH={{ base: 'unset', md: '60vh' }}
  >
    <VStack
      bg="whiteAlpha.500"
      p={6}
      w="xl"
      rounded="md"
      alignSelf="center"
      zIndex={2}
      mt={6}
      ml={44}
    >
      <Heading
        as="h1"
        color={useColorModeValue('gray.800', 'gray.800')}
        fontSize={{ base: '4xl', sm: '5xl' }}
        fontWeight="bold"
        textAlign="center"
        maxW="600px"
      >
        Изучай английский
        {' '}
        <chakra.span
          color="teal"
          bg="linear-gradient(transparent 50%, #83e9e7 50%)"
        >
          онлайн
        </chakra.span>
      </Heading>
      <Text maxW="550px" fontSize="xl" textAlign="center" color="gray.600">
        RS Lang - это эффективный сервис для увлекательного изучения
        Английского языка. Присоединяйся!
      </Text>
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        w={{ base: '100%', sm: 'auto' }}
        spacing={5}
      >
        <Button
          border="1px solid"
          borderColor="teal.600"
          background="transparent"
          color="teal.600"
          rounded="md"
          size="lg"
          height="3.5rem"
          fontSize="1.2rem"
          _hover={{ bg: 'teal.50' }}
        >
          Начать заниматься
        </Button>
      </Stack>
    </VStack>
  </Stack>
);
