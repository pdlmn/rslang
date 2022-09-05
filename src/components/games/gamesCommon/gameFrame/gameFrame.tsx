import { Box, Heading, Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useTypedSelector } from '../../../../redux';
import { gameComponentByName, sendGameStatistic, sendWordStatistic } from './utils';
import { StartScreen } from './startScreen/startScreen';
import { StatisticsScreen } from './statisticsScreen/statisticsScreen';
import { useAction } from '../../../../hooks/useAction';

export const GameFrame = () => {
  const {
    isStarted, isLoading, isFinished, name, error,
    words, currentWordIndex, wordsLearned, correctAnswersRowMax,
  } = useTypedSelector((state) => state.games);
  const { user } = useTypedSelector((state) => state.auth);
  const { startLoading, stopLoading, showError } = useAction();
  const game = gameComponentByName(name);
  const correctAnswers = words
    .filter((word) => word.isAnswered)
    .filter((word) => word.isCorrect).length;
  const incorrectAnswers = words
    .filter((word) => word.isAnswered)
    .filter((word) => !word.isCorrect).length;

  useEffect(() => {
    if (!user || !currentWordIndex) return;
    sendWordStatistic(
      user,
      { id: words[currentWordIndex - 1].id, userWord: words[currentWordIndex - 1].userWord },
      words[currentWordIndex - 1].hasOptional,
    ).catch(() => {});
  }, [currentWordIndex]);

  useEffect(() => {
    if (!isFinished || !user) return;
    startLoading();
    if (words[currentWordIndex]?.isAnswered) {
      sendWordStatistic(
        user,
        { id: words[currentWordIndex].id, userWord: words[currentWordIndex].userWord },
        words[currentWordIndex].hasOptional,
      ).catch(() => {});
    }
    sendGameStatistic(user, {
      gameName: name.toLowerCase(),
      learnedWords: wordsLearned,
      correctAnswersInARow: correctAnswersRowMax,
      correctAnswers,
      incorrectAnswers,
    }).catch((err) => {
      if (error instanceof Error) {
        showError({ error: err });
      }
    }).finally(() => { stopLoading(); });
  }, [isFinished]);

  if (error) {
    return (
      <Heading>
        {`Произошла ошибка при загрузке данных ${
          isFinished ? 'на сервер' : 'с сервера'
        }: ${error.message}`}
      </Heading>
    );
  }
  if (isLoading) {
    return (
      <Box p="7rem">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    );
  }
  if (isFinished) {
    return <StatisticsScreen />;
  }
  return <Box>{isStarted ? game : <StartScreen />}</Box>;
};
