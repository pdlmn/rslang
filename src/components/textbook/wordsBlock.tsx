import { Flex, Heading, Stack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { getSelectedWord } from './textbook.selectors';
import { WordDescriptionCard } from './wordDescriptionCard';
import { WordsGrid } from './wordsGrid';

export const WordsBlock = () => {
  const selectedWord = useSelector(getSelectedWord);

  return (
    <Stack spacing={4}>
      <Heading as="h3" size="lg" userSelect="none" pt={6}>Слова</Heading>
      <Flex justify="space-between">
        <WordsGrid />
        {selectedWord && <WordDescriptionCard />}
      </Flex>
    </Stack>
  );
};
