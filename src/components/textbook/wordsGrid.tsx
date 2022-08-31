import { useCallback, useEffect, useState } from 'react';
import {
  Flex, Stack, useColorModeValue, Text,
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
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { Word } from '../../interfaces/services';
import { Words as wordsService } from '../../services/words';
import {
  getComplexWords,
  getGroup, getLearnedWords, getSelectedWord, getShowComplexWords, getShowLearnedWords,
} from './textbook.selectors';
import { setPage, setSelectedWord } from './textbook.actions';
import { Card } from './card';

const outerLimit = 1;
const innerLimit = 1;

export const WordsGrid = () => {
  const [words, setWords] = useState<Array<Word>>([]);

  const group = useSelector(getGroup);
  const selectedWord = useSelector(getSelectedWord);
  const complexWords = useSelector(getComplexWords);
  const learnedWords = useSelector(getLearnedWords);
  const showComplexWords = useSelector(getShowComplexWords);
  const showLearnedWords = useSelector(getShowLearnedWords);
  const dispatch = useDispatch();
  const dispatchSetSelectedWord = useCallback(
    (s: Word): AnyAction => dispatch(setSelectedWord(s)),
    [dispatch],
  );

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
    if (group && !(showComplexWords || showLearnedWords)) {
      wordsService
        .get({ group: group.id, page: currentPage - 1 })
        .then((data) => {
          setWords(data as Array<Word>);
        });
    }
  }, [group, currentPage, showComplexWords, showLearnedWords]);

  useEffect(() => {
    if (showComplexWords) {
      setWords(complexWords);
    } else if (showLearnedWords) {
      setWords(learnedWords);
    }
  }, [showComplexWords, showLearnedWords, complexWords, learnedWords]);

  useEffect(() => {
    setCurrentPage(1);
    dispatch(setPage(1));
  }, [group, setCurrentPage]);

  useEffect(() => {
    dispatchSetSelectedWord(words[0]);
  }, [words]);

  const handlePageChange = useCallback(
    (nextPage: number): void => {
      setCurrentPage(nextPage);
      // прокидываю текущую страницу в стейт
      dispatch(setPage(nextPage));
    },
    [setCurrentPage],
  );

  return (
    <Flex wrap="wrap" gap={6} maxW="850px">
      {(words.length === 0) && <Text as="i" fontSize="xl" fontWeight="400" pb={14}>В этом разделе еще нет слов.</Text>}
      {(words.length !== 0) && words.map((word) => (
        <Card
          key={word.id}
          word={word}
          color={group?.color}
          selected={selectedWord === word}
          complex={complexWords.some((el) => el.id === word.id)}
          learned={learnedWords.some((el) => el.id === word.id)}
          onClick={() => dispatchSetSelectedWord(word)}
        />
      ))}
      {!(showComplexWords || showLearnedWords)
      && (
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
                    bg: group?.color.activeColor,
                    color: 'gray.800',
                  }}
                  _active={{ bgColor: group?.color.baseColor }}
                  _current={{
                    bg: group?.color.activeColor,
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
      )}
    </Flex>
  );
};
