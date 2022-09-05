import { Flex, Heading, Stack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { getSelectedWord } from './textbook.selectors';
import { WordDescriptionCard } from './wordDescriptionCard';
import { WordsGrid } from './wordsGrid';

export const WordsBlock = (user: any) => {
  const selectedWord = useSelector(getSelectedWord);

  return (
    <Flex
      justify="space-between"
      pt={user ? 2 : 6}
      wrap={{ base: 'wrap', lg: 'nowrap' }}
      gap={6}
      direction={{ base: 'column', lg: 'row' }}
    >
      <Stack spacing={4} maxW="content">
        <Heading as="h3" size="lg" userSelect="none">
          Слова
        </Heading>
        <WordsGrid />
      </Stack>
      {selectedWord && <WordDescriptionCard />}
    </Flex>
  );
};
