import { Box, Spinner } from '@chakra-ui/react';
import { useTypedSelector } from '../../../../redux';
import { gameComponentByName } from './gameComponentByName';
import { StartScreen } from './startScreen/startScreen';
import { StatisticsScreen } from './statisticsScreen/statisticsScreen';

export const GameFrame = () => {
  const isReady = useTypedSelector((state) => state.games.isStarted);
  const isLoading = useTypedSelector((state) => state.games.isLoading);
  const isFinished = useTypedSelector((state) => state.games.isFinished);
  const name = useTypedSelector((state) => state.games.name);
  const game = gameComponentByName(name);

  if (isLoading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  }
  if (isFinished) {
    return (
      <StatisticsScreen />
    );
  }
  return (
    <Box>
      {isReady
        ? game
        : (
          <StartScreen />
        )}
    </Box>
  );
};
