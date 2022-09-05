import { Container, Stack } from '@chakra-ui/react';
import { getDatesOfWeek } from '../../utils/date';
import { AllTimeStatistics } from './allTimeStatistics';
import { TodayStatistics } from './todayStatistics';

export const StatisticsMain = () => {
  const data = [
    {
      gameName: 'sprint',
      learnedWords: 13,
      date: Number(new Date('2022-08-31')),
      correctAnswers: 13,
      incorrectAnswers: 7,
      correctAnswersInARow: 6,
    },
    {
      gameName: 'audiocall',
      learnedWords: 18,
      date: Number(new Date('2022-09-01')),
      correctAnswers: 18,
      incorrectAnswers: 2,
      correctAnswersInARow: 16,
    },
    {
      gameName: 'audiocall',
      learnedWords: 15,
      date: Number(new Date('2022-09-01')),
      correctAnswers: 15,
      incorrectAnswers: 5,
      correctAnswersInARow: 9,
    },
    {
      gameName: 'sprint',
      learnedWords: 11,
      date: Number(new Date('2022-09-02')),
      correctAnswers: 11,
      incorrectAnswers: 9,
      correctAnswersInARow: 6,
    },
    {
      gameName: 'sprint',
      learnedWords: 13,
      date: Number(new Date('2022-09-02')),
      correctAnswers: 13,
      incorrectAnswers: 7,
      correctAnswersInARow: 6,
    },
    {
      gameName: 'audiocall',
      learnedWords: 18,
      date: Number(new Date('2022-09-02')),
      correctAnswers: 18,
      incorrectAnswers: 2,
      correctAnswersInARow: 16,
    },
    {
      gameName: 'audiocall',
      learnedWords: 15,
      date: Number(new Date('2022-09-03')),
      correctAnswers: 15,
      incorrectAnswers: 5,
      correctAnswersInARow: 9,
    },
    {
      gameName: 'sprint',
      learnedWords: 11,
      date: Number(new Date('2022-09-04')),
      correctAnswers: 11,
      incorrectAnswers: 9,
      correctAnswersInARow: 6,
    },
    {
      gameName: 'sprint',
      learnedWords: 16,
      date: Number(new Date('2022-09-04')),
      correctAnswers: 16,
      incorrectAnswers: 4,
      correctAnswersInARow: 10,
    },
    {
      gameName: 'sprint',
      learnedWords: 19,
      date: Number(new Date('2022-09-05').setHours(2, 3, 4, 5)),
      correctAnswers: 19,
      incorrectAnswers: 1,
      correctAnswersInARow: 10,
    },
    {
      gameName: 'sprint',
      learnedWords: 11,
      date: Number(new Date('2022-09-05')),
      correctAnswers: 11,
      incorrectAnswers: 9,
      correctAnswersInARow: 6,
    },
    {
      gameName: 'audiocall',
      learnedWords: 16,
      date: Number(new Date('2022-09-05')),
      correctAnswers: 16,
      incorrectAnswers: 4,
      correctAnswersInARow: 10,
    },
  ];
  type GameName = 'sprint' | 'audiocall';
  const todayStatistics = data
    .filter((gs) => gs.date < new Date().setHours(23, 59, 59, 999)
        && gs.date > new Date().setHours(0, 0, 0, 0));

  const sumByProp = <T, K extends keyof T>(prop: K, arr: T[]) => (
    // @ts-ignore
    arr.reduce((acc, cur) => acc + cur[prop], 0)
  );

  const getOverallTodayStatistics = () => {
    const correctAnswers = sumByProp('correctAnswers', todayStatistics);
    const incorrectAnswers = sumByProp('incorrectAnswers', todayStatistics);

    const learnedWords = sumByProp('learnedWords', todayStatistics);
    const accuracy = +((correctAnswers * 100) / (correctAnswers + incorrectAnswers)).toFixed(0);

    return { learnedWords, accuracy };
  };

  const getGameStatistics = (gameName: GameName) => {
    const todayGameStats = todayStatistics.filter((gs) => gs.gameName === gameName);

    const correctAnswers = sumByProp('correctAnswers', todayGameStats);
    const incorrectAnswers = sumByProp('incorrectAnswers', todayGameStats);

    const learnedWords = sumByProp('learnedWords', todayGameStats);
    const accuracy = +((correctAnswers * 100) / (correctAnswers + incorrectAnswers)).toFixed(0);
    const correctAnswersInARow = todayGameStats.reduce((acc, cur) => (
      acc > cur.correctAnswersInARow ? acc : cur.correctAnswersInARow
    ), 0);

    return { learnedWords, accuracy, correctAnswersInARow };
  };

  type Point = {
    date: number,
    learnedWords: number,
  };

  const points = data.reduce((acc: Point[], cur) => {
    const date = new Date(cur.date).setHours(0, 0, 0, 0);
    const pointInArray = acc.find((point) => point.date === date);
    if (pointInArray) {
      pointInArray.learnedWords += cur.learnedWords;
    } else {
      acc.push({ date, learnedWords: cur.learnedWords });
    }
    return acc;
  }, []);

  const getWeeklyStats = (dateOrMs: Date | number = new Date()) => {
    const date = dateOrMs instanceof Date ? dateOrMs : new Date(dateOrMs);
    const week = getDatesOfWeek(date);
    return week.map((weekday) => {
      const pointInData = points.find((d) => d.date === +weekday);
      if (!pointInData) {
        return { date: +weekday, learnedWords: 0 } as Point;
      }
      return pointInData;
    });
  };

  return (
    <Container maxW="container.xl" p="2rem 1rem">
      <Stack spacing="16">
        <TodayStatistics
          overallStatistics={getOverallTodayStatistics()}
          audiocallStatistics={getGameStatistics('audiocall')}
          sprintStatistics={getGameStatistics('sprint')}
        />
        <AllTimeStatistics
          data={getWeeklyStats(new Date('2022-09-02'))}
          wordsPerDayGoal={30}
          userSigningUpDate={Number(new Date('2022-08-31'))}
        />
      </Stack>
    </Container>
  );
};
