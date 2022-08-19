import {
  Button, Container, Heading, HStack, VStack,
} from '@chakra-ui/react';

export const GamesMain = () => (
  <Container maxW="container.xl" p="2rem 1rem">
    <VStack spacing={24}>
      <Heading as="h1">Мини-игры</Heading>

      <HStack spacing={24}>
        <Button w="400px" h="400px" shadow="md" colorScheme="green">
          <Heading>Аудиовызов</Heading>
        </Button>
        <Button w="400px" h="400px" shadow="md" colorScheme="pink">
          <Heading>Спринт</Heading>
        </Button>
      </HStack>
    </VStack>
  </Container>
);
