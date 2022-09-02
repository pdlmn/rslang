import {
  Container, Heading, Stack, useColorModeValue,
} from '@chakra-ui/react';
import { useTypedSelector } from '../../redux';
import { ComplexButtons } from './complexButtons';
import { GamesBlock } from './gamesBlock';
import { GroupButtons } from './groupButtons';
import { WordsBlock } from './wordsBlock';

export const TextbookMain = () => {
  const { user } = useTypedSelector((state) => state.auth);
  return (
    <Container maxW="container.xl" p="1rem 1rem">
      <Stack spacing={4}>
        <Heading
          as="h1"
          alignSelf="center"
          bg={useColorModeValue(
            'linear-gradient(transparent 50%, #83e9e7 50%)',
            'linear-gradient(transparent 50%, #2D3748 50%)',
          )}
          shadow="lg"
          userSelect="none"
        >
          Учебник
        </Heading>
        <GroupButtons />
        {user && <ComplexButtons />}
        <WordsBlock />
        <GamesBlock />
      </Stack>
    </Container>
  );
};
