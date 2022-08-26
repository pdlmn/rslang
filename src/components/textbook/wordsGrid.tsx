import { useEffect, useState } from 'react';
import {
  Button, Flex, Stack, Text, useColorModeValue,
} from '@chakra-ui/react';
import {
  Pagination,
  usePagination,
  PaginationPage,
  PaginationNext,
  PaginationPrevious,
  PaginationPageGroup,
  PaginationContainer,
  PaginationSeparator,
} from '@ajna/pagination';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import { Word } from '../../interfaces/types';
import { Words as wordsService } from '../../services/words';
import { GroupButtonData } from './groupButtonData';

type WordShortCard = {
  word: Word;
  color: { hoverColor: string; activeColor: string; baseColor: string };
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
    variant="outline"
    color={selected ? 'gray.800' : useColorModeValue('gray.700', 'gray.200')}
    borderColor={color.activeColor}
    bgColor={selected ? color.activeColor : 'transparent'}
    transition="all .25s ease-in-out"
    onClick={onClick}
    flexWrap="wrap"
    _hover={{ bgColor: color.activeColor, color: useColorModeValue('gray.800', 'gray.800') }}
    _active={{ bgColor: color.baseColor, color: useColorModeValue('gray.800', 'gray.800') }}
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

export type PaginationBlockProps = {
  pages: Array<number>;
  pagesCount: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

export const WordsGrid = ({
  group,
  selectedWord,
  setSelectedWord,
}: WordsGridProps) => {
  const [words, setWords] = useState<Array<Word>>([]);

  const outerLimit = 1;
  const innerLimit = 1;

  const {
    pages, pagesCount, currentPage, setCurrentPage,
  } = usePagination({
    pagesCount: 30,
    limits: {
      outer: outerLimit,
      inner: innerLimit,
    },
    initialState: {
      currentPage: 1,
    },
  });

  useEffect(() => {
    wordsService
      .get({ group: group.id, page: currentPage - 1 })
      .then((data) => {
        setWords(data as Array<Word>);
      });
  }, [group, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [group]);

  useEffect(() => {
    setSelectedWord(words[0]);
  }, [words]);

  const handlePageChange = (nextPage: number): void => {
    setCurrentPage(nextPage);
  };

  return (
    <Flex wrap="wrap" gap={6} maxW="850px">
      {words.map((word) => (
        <Card
          key={word.id}
          word={word}
          color={group.color}
          selected={selectedWord === word}
          onClick={() => setSelectedWord(word)}
        />
      ))}
      <Stack m="auto">
        <Pagination
          pagesCount={pagesCount}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        >
          <PaginationContainer justify="space-between" p={2} w="full" gap={1}>
            <PaginationPrevious
              p={2}
              rounded="full"
              bg="transparent"
              _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
              _active={{ bg: useColorModeValue('gray.100', 'gray.600') }}
            >
              <AiOutlineLeft />
            </PaginationPrevious>
            <PaginationPageGroup
              isInline
              align="center"
              separator={(
                <PaginationSeparator
                  bg={useColorModeValue('white', 'gray.800')}
                  fontSize="sm"
                  w={10}
                  jumpSize={8}
                  rounded="full"
                  _active={{ bg: 'gray.100' }}
                />
              )}
            >
              {pages.map((page: number) => (
                <PaginationPage
                  w={10}
                  key={`pagination_page_${page}`}
                  page={page}
                  fontSize="sm"
                  rounded="full"
                  bg="transparent"
                  _hover={{
                    bg: group.color.activeColor,
                    color: 'gray.800',
                  }}
                  _active={{ bgColor: group.color.baseColor }}
                  _current={{
                    bg: group.color.activeColor,
                    fontSize: 'sm',
                    w: 10,
                    color: 'gray.800',
                  }}
                />
              ))}
            </PaginationPageGroup>
            <PaginationNext
              p={2}
              rounded="full"
              bg="transparent"
              _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
              _active={{ bg: useColorModeValue('gray.100', 'gray.600') }}
            >
              <AiOutlineRight />
            </PaginationNext>
          </PaginationContainer>
        </Pagination>
      </Stack>
    </Flex>
  );
};
