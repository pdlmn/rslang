import { Flex, Heading, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { Word } from '../../interfaces/services';
import { GroupButtonData } from './groupButtonData';
import { WordDescriptionCard } from './wordDescriptionCard';
import { WordsGrid } from './wordsGrid';

export type WordsBlockProps = {
  group: GroupButtonData;
};

export const WordsBlock = ({ group }: WordsBlockProps) => {
  const [selectedWord, setSelectedWord] = useState<Word>();

  return (
    <Stack spacing={4} pt={4}>
      <Heading as="h3" size="lg">Слова</Heading>
      <Flex justify="space-between">
        <WordsGrid group={group} selectedWord={selectedWord} setSelectedWord={setSelectedWord} />
        {selectedWord && <WordDescriptionCard group={group} selectedWord={selectedWord} />}
      </Flex>
    </Stack>
  );
};
