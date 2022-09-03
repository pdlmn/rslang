import { Container, Stack } from '@chakra-ui/react';
import { AllTimeStatistics } from './allTimeStatistics';
import { TodayStatistics } from './todayStatistics';

export const StatisticsMain = () => {
  const wordsPerDayData = (() => {
    const result = [];

    for (let i = 1; i < 8; i += 1) {
      result.push({
        date: Number(new Date(`2022-09-${i}`)),
        learnedWords: Math.floor(Math.random() * 60),
      });
    }

    return result;
  })();

  return (
    <Container maxW="container.xl" p="2rem 1rem">
      <Stack spacing="16">
        <TodayStatistics
          accuracy={100}
        />
        <AllTimeStatistics
          data={wordsPerDayData}
          wordsPerDayGoal={40}
        />
      </Stack>
    </Container>
  );
};
