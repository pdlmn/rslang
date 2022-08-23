import { useEffect, useState } from 'react';
import {
  Button, Flex, Stack, Text,
} from '@chakra-ui/react';
import { Word } from '../../interfaces/types';
import { Words as wordsService } from '../../services/words';
import { GroupButtonData } from './groupButtonData';

type WordShortCard = {
  word: Word;
  color: string;
  onClick: () => void;
};

const Card = ({ word, color, onClick }: WordShortCard) => (
  <Button
    h="7rem"
    w="11.5rem"
    colorScheme={color.split('.')[0]}
    variant="outline"
    color="gray.700"
    borderColor={`${color.split('.')[0]}.200`}
    transition="all .25s ease-in-out"
    onClick={onClick}
  >
    <Stack>
      <Text fontSize="xl" fontWeight="bold">
        {word.word}
      </Text>
      <Text fontSize="md" fontWeight="300">
        {word.wordTranslate}
      </Text>
    </Stack>
  </Button>
);

export type WordsGridProps = {
  group: GroupButtonData;
  setSelectedWord: (word: Word) => void;
};

export const WordsGrid = ({ group, setSelectedWord }: WordsGridProps) => {
  const [words, setWords] = useState<Array<Word>>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    wordsService
      .get({ group: group.id, page })
      .then((data) => setWords(data as Array<Word>));
  }, [group, page]);

  return (
    <Flex wrap="wrap" gap={6} maxW="850px">
      {words.map((word) => (
        <Card
          key={word.id}
          word={word}
          color={group.color.baseColor}
          onClick={() => setSelectedWord(word)}
        />
      ))}
      <Button onClick={() => setPage(page - 1)}>prev</Button>
      <Button onClick={() => setPage(page + 1)}>next</Button>
    </Flex>
  );
};
