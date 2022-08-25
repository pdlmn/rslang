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
  selected: boolean;
  onClick: () => void;
};

const Card = ({
  word, color, selected, onClick,
}: WordShortCard) => (
  <Button
    p={2}
    h="7rem"
    w="11.5rem"
    colorScheme={color.split('.')[0]}
    variant="outline"
    color="gray.700"
    borderColor={`${color.split('.')[0]}.200`}
    bgColor={selected ? `${color.split('.')[0]}.50` : 'transparent'}
    transition="all .25s ease-in-out"
    onClick={onClick}
    flexWrap="wrap"
  >
    <Stack>
      <Text fontSize="xl" fontWeight="bold">
        {word.word}
      </Text>
      <Text fontSize="md" fontWeight="300" style={{ whiteSpace: 'normal' }}>
        {word.wordTranslate}
      </Text>
    </Stack>
  </Button>
);

export type WordsGridProps = {
  group: GroupButtonData;
  selectedWord: Word | undefined;
  setSelectedWord: (word: Word) => void;
};

export const WordsGrid = ({ group, selectedWord, setSelectedWord }: WordsGridProps) => {
  const [words, setWords] = useState<Array<Word>>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    wordsService
      .get({ group: group.id, page })
      .then((data) => {
        setWords(data as Array<Word>);
        // setSelectedWord(words[0]);
      });
    // setSelectedWord(words[0]);
  }, [group, page]);

  // useEffect(() => {
  //   setSelectedWord(words[0]);
  // });

  return (
    <Flex wrap="wrap" gap={6} maxW="850px">
      {words.map((word) => (
        <Card
          key={word.id}
          word={word}
          color={group.color.baseColor}
          selected={selectedWord === word}
          onClick={() => setSelectedWord(word)}
        />
      ))}
      <Button onClick={() => setPage(page - 1)}>prev</Button>
      <Button onClick={() => setPage(page + 1)}>next</Button>
    </Flex>
  );
};
