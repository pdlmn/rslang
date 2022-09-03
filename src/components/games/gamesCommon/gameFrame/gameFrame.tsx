import { Box, Heading, Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useTypedSelector } from '../../../../redux';
import { gameComponentByName, sendGameStatistic } from './utils';
import { StartScreen } from './startScreen/startScreen';
import { StatisticsScreen } from './statisticsScreen/statisticsScreen';
import { useAction } from '../../../../hooks/useAction';

export const GameFrame = () => {
  const {
    isStarted, isLoading, isFinished, name, error,
  } = useTypedSelector((state) => state.games);
  const { startLoading, stopLoading, showError } = useAction();
  const game = gameComponentByName(name);

  useEffect(() => {
    if (!isFinished) return;
    startLoading();
    sendGameStatistic().then((data) => console.log(data)).catch((err) => {
      if (error instanceof Error) {
        showError({ error: err });
      }
    }).finally(() => { stopLoading(); });
  }, [isFinished]);

  if (error) {
    return (
      <Heading>
        {`Произошла ошибка при загрузке данных ${isFinished ? 'на сервер' : 'с сервера'}: ${error.message}`}
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
    return (
      <StatisticsScreen />
    );
  }
  return (
    <Box>
      {isStarted
        ? game
        : (
          <StartScreen />
        )}
    </Box>
  );
};
