import { Box, Spinner } from '@chakra-ui/react';
import { useTypedSelector } from '../../../../redux';
import { gameComponentByName } from './gameComponentByName';
import { StartScreen } from './startScreen/startScreen';
import { StatisticsScreen } from './statisticsScreen/statisticsScreen';

export const GameFrame = () => {
  const {
    isStarted, isLoading, isFinished, name,
  } = useTypedSelector((state) => state.games);
  const game = gameComponentByName(name);

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
