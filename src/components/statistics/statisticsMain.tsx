import { Container, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AggregatedWord, GameStatistic } from '../../interfaces/services';
import { useAppDispatch, useTypedSelector } from '../../redux';
import { statisticsSetLoader } from '../../redux/actions/statistics';
import AggregatedWords from '../../services/aggregatedWords';
import gameStatistics from '../../services/gameStatistics';
import { getDatesOfWeek } from '../../utils/date';
import { AllTimeStatistics } from './allTimeStatistics';
import { TodayStatistics } from './todayStatistics';

export const StatisticsMain = () => {
  type GameName = 'спринт' | 'аудиовызов';

  const { user } = useTypedSelector((state) => state.auth);
  const { date: selectedDate } = useTypedSelector((state) => state.statistics);
  const dispatch = useAppDispatch();

  const [todayGameStatistics, setTodayGameStatistics] = useState<GameStatistic[]>([]);
  const [weeklyGameStatistics, setWeeklyGameStatistics] = useState<GameStatistic[]>([]);
  const [todayLearnedFromTextbook, setTodayLearnedFromTextbook] = useState<AggregatedWord[]>([]);
  const [weeklyLearnedFromTextbook, setWeeklyLearnedFromTextbook] = useState<AggregatedWord[]>([]);

  useEffect(() => {
    if (!user) {
      setTodayGameStatistics([]);
      setWeeklyGameStatistics([]);
      setTodayLearnedFromTextbook([]);
      setWeeklyLearnedFromTextbook([]);
      return;
    }

    const fetchTodayGameStatistics = async () => {
      const response = await gameStatistics.get(user.userId, user.token, {
        from: new Date().setHours(0, 0, 0, 0),
        to: new Date().setHours(23, 59, 59, 999),
      });
      if (Array.isArray(response)) {
        setTodayGameStatistics(response);
      }
    };

    const fetchWeeklyGameStatistics = async () => {
      const datesOfWeek = getDatesOfWeek(selectedDate);
      const response = await gameStatistics.get(user.userId, user.token, {
        from: Number(datesOfWeek[0]),
        to: datesOfWeek[6].setHours(23, 59, 59, 999),
      });
      if (Array.isArray(response)) {
        setWeeklyGameStatistics(response);
      }
    };

    const fetchTodayLearnedFromTextbook = async () => {
      const response = await AggregatedWords.get(user.userId, user.token, {
        filter: {
          'userWord.optional.date': {
            $gte: new Date().setHours(0, 0, 0, 0),
            $lte: new Date().setHours(23, 59, 59, 999),
          },
          'userWord.optional.learned': true,
        },
      });
      if (Array.isArray(response)) {
        setTodayLearnedFromTextbook(response[0].paginatedResults);
      }
    };

    const fetchweeklyLearnedFromTextbook = async () => {
      const datesOfWeek = getDatesOfWeek(selectedDate);
      const response = await AggregatedWords.get(user.userId, user.token, {
        filter: {
          'userWord.optional.date': {
            $gte: Number(datesOfWeek[0]),
            $lte: datesOfWeek[6].setHours(23, 59, 59, 999),
          },
          'userWord.optional.learned': true,
        },
      });
      if (Array.isArray(response)) {
        setWeeklyLearnedFromTextbook(response[0].paginatedResults);
      }
    };

    const fetchStatistics = async () => {
      dispatch(statisticsSetLoader(true));

      await fetchTodayGameStatistics();
      await fetchTodayLearnedFromTextbook();
      await fetchWeeklyGameStatistics();
      await fetchweeklyLearnedFromTextbook();

      dispatch(statisticsSetLoader(false));
    };

    fetchStatistics();
  }, [selectedDate, user]);

  console.log(todayLearnedFromTextbook);

  const sumByProp = <T, K extends keyof T>(prop: K, arr: T[]) => (
    // @ts-ignore
    arr.reduce((acc, cur) => acc + cur[prop], 0)
  );

  const getOverallTodayStatistics = () => {
    const correctAnswers = sumByProp('correctAnswers', todayGameStatistics);
    const incorrectAnswers = sumByProp('incorrectAnswers', todayGameStatistics);

    const learnedWords = sumByProp('learnedWords', todayGameStatistics) + todayLearnedFromTextbook.length;
    const accuracy = +((correctAnswers * 100) / (correctAnswers + incorrectAnswers)).toFixed(0)
      || 0;

    return { learnedWords, accuracy };
  };

  const getGameStatistics = (gameName: GameName) => {
    const todayGameStats = todayGameStatistics.filter((gs) => gs.gameName === gameName);

    const correctAnswers = sumByProp('correctAnswers', todayGameStats);
    const incorrectAnswers = sumByProp('incorrectAnswers', todayGameStats);

    const learnedWords = sumByProp('learnedWords', todayGameStats);

    const accuracy = +((correctAnswers * 100) / (correctAnswers + incorrectAnswers)).toFixed(0)
      || 0;
    const correctAnswersInARow = todayGameStats.reduce((acc, cur) => (
      acc > cur.correctAnswersInARow ? acc : cur.correctAnswersInARow
    ), 0);

    return { learnedWords, accuracy, correctAnswersInARow };
  };

  type Point = {
    date: number,
    learnedWords: number,
  };

  const gamePoints = weeklyGameStatistics.reduce((acc: Point[], cur) => {
    const date = new Date(cur.date).setHours(0, 0, 0, 0);
    const pointInArray = acc.find((point) => point.date === date);
    if (pointInArray) {
      pointInArray.learnedWords += cur.learnedWords;
    } else {
      acc.push({ date, learnedWords: cur.learnedWords });
    }
    return acc;
  }, []);

  const textBookPoints = weeklyLearnedFromTextbook.reduce((acc: Point[], cur) => {
    if (!cur.userWord) return acc;
    if (!cur.userWord.optional) return acc;
    if (!cur.userWord.optional.date) return acc;
    const date = new Date(cur.userWord.optional.date).setHours(0, 0, 0, 0);
    const pointInArray = acc.find((point) => point.date === date);
    if (pointInArray) {
      pointInArray.learnedWords += 1;
    } else {
      acc.push({ date, learnedWords: 1 });
    }
    return acc;
  }, []);

  const points = gamePoints.concat(textBookPoints);

  const getWeeklyStats = (dateOrMs: Date | number = new Date()) => {
    const date = new Date(dateOrMs);
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
          audiocallStatistics={getGameStatistics('аудиовызов')}
          sprintStatistics={getGameStatistics('спринт')}
          wordsPerDayGoal={30}
        />
        <AllTimeStatistics
          data={getWeeklyStats(selectedDate)}
          wordsPerDayGoal={30}
        />
      </Stack>
    </Container>
  );
};
