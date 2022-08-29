import {
  Button, Container, Heading, HStack, VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const GamesMain = () => (
  <Container maxW="container.xl" p="2rem 1rem">
    <VStack spacing={24}>
      <Heading as="h1">Мини-игры</Heading>

      <HStack spacing={24}>
        <Link to="/audiogame">
          <Button w="400px" h="300px" shadow="md" colorScheme="green">
            <Heading>Аудиовызов</Heading>
          </Button>
        </Link>
        <Link to="/sprintgame">
          <Button w="400px" h="300px" shadow="md" colorScheme="pink">
            <Heading>Спринт</Heading>
          </Button>
        </Link>
      </HStack>
    </VStack>
  </Container>
);
