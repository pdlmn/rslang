/* eslint-disable no-underscore-dangle */
import {
  Container, Heading, Stack, useColorModeValue,
} from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AnyAction } from 'redux';
import {
  AggregatedObject,
  AggregatedWord,
  Word,
} from '../../interfaces/services';
import { useTypedSelector } from '../../redux';
import AggregatedWords from '../../services/aggregatedWords';
import { ComplexButtons } from './complexButtons';
import { GamesBlock } from './gamesBlock';
import { GroupButtons } from './groupButtons';
import {
  setComplexWords, setLearnedWords, setShowComplexWords, setShowLearnedWords,
} from './textbook.actions';
import { WordsBlock } from './wordsBlock';

export const TextbookMain = () => {
  const { user } = useTypedSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();
  const dispatchSetComplexWords = useCallback(
    (cw: Array<Word>): AnyAction => dispatch(setComplexWords(cw)),
    [dispatch],
  );
  const dispatchSetLearnedWords = useCallback(
    (lw: Array<Word>): AnyAction => dispatch(setLearnedWords(lw)),
    [dispatch],
  );
  const dispatchSetShowComplexWords = useCallback(
    (flag: boolean): AnyAction => dispatch(setShowComplexWords(flag)),
    [dispatch],
  );
  const dispatchSetShowLearnedWords = useCallback(
    (flag: boolean): AnyAction => dispatch(setShowLearnedWords(flag)),
    [dispatch],
  );

  useEffect(() => {
    if (user) {
      Promise.all([
        AggregatedWords.get(user!.userId, user!.token, {
          wordsPerPage: 9999,
          filter: { 'userWord.difficulty': 'hard' },
        }),
        AggregatedWords.get(user!.userId, user!.token, {
          wordsPerPage: 9999,
          filter: { 'userWord.optional.learned': true },
        }),
      ]).then(([hardWords, learnedWords]) => {
        dispatchSetComplexWords(
          (hardWords[0] as AggregatedObject).paginatedResults.map(
            (r: AggregatedWord) => ({ ...r, id: r._id }),
          ),
        );
        dispatchSetLearnedWords(
          (learnedWords[0] as AggregatedObject).paginatedResults.map(
            (r: AggregatedWord) => ({ ...r, id: r._id }),
          ),
        );
      });
    } else {
      dispatchSetComplexWords([]);
      dispatchSetLearnedWords([]);
      dispatchSetShowComplexWords(false);
      dispatchSetShowLearnedWords(false);
    }
  }, [user, location.pathname]);

  return (
    <Container maxW="container.xl" p={{base: "0.3rem 0.3rem", sm: "1rem 1rem"}}>
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
        <WordsBlock user={user} />
        <GamesBlock />
      </Stack>
    </Container>
  );
};
