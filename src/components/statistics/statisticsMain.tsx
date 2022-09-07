import { Container, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { GameStatistic, Statistic } from '../../interfaces/services';
import { useAppDispatch, useTypedSelector } from '../../redux';
import { statisticsSetLoader } from '../../redux/actions/statistics';
import gameStatistics from '../../services/gameStatistics';
import Statistics from '../../services/statistics';
import { getDatesOfWeek } from '../../utils/date';
import { AllTimeStatistics } from './allTimeStatistics';
import { TodayStatistics } from './todayStatistics';
import { Point } from './types';

export const StatisticsMain = () => {
  type GameName = 'спринт' | 'аудиовызов';

  const { user } = useTypedSelector((state) => state.auth);
  const { date: selectedDate } = useTypedSelector((state) => state.statistics);
  const dispatch = useAppDispatch();

  const [prevWeeksStatistic, setPrevWeeksStatistic] = (
    useState<Statistic>({ learnedWords: 0, newWords: 0 })
  );
  const [todayGameStatistics, setTodayStatistics] = useState<GameStatistic[]>([]);
  const [weeklyGameStatistics, setGameWeeklyStatistics] = useState<GameStatistic[]>([]);

  useEffect(() => {
    if (!user) {
      setPrevWeeksStatistic({ learnedWords: 0, newWords: 0 });
      setTodayStatistics([]);
      setGameWeeklyStatistics([]);
      return;
    }

    const fetchPrevWeeksStatistic = async () => {
      const lastWeekDate = new Date(selectedDate);
      lastWeekDate.setDate(selectedDate.getDate() - 7);
      const datesOfWeek = getDatesOfWeek(lastWeekDate);

      const response = await Statistics.get(user.userId, user.token, {
        from: 0,
        to: datesOfWeek[6].setHours(23, 59, 59, 999),
      });
      if ('learnedWords' in response) {
        setPrevWeeksStatistic(response);
      }
    };

    const fetchTodayGamePoints = async () => {
      const response = await gameStatistics.get(user.userId, user.token, {
        from: new Date().setHours(0, 0, 0, 0),
        to: new Date().setHours(23, 59, 59, 999),
      });
      if (Array.isArray(response)) {
        setTodayStatistics(response);
      }
    };

    const fetchWeeklyGamePoints = async () => {
      const datesOfWeek = getDatesOfWeek(selectedDate);
      const response = await gameStatistics.get(user.userId, user.token, {
        from: Number(datesOfWeek[0]),
        to: datesOfWeek[6].setHours(23, 59, 59, 999),
      });
      if (Array.isArray(response)) {
        setGameWeeklyStatistics(response);
      }
    };

    const fetchStatistics = async () => {
      dispatch(statisticsSetLoader(true));

      await fetchPrevWeeksStatistic();
      await fetchTodayGamePoints();
      await fetchWeeklyGamePoints();

      dispatch(statisticsSetLoader(false));
    };

    fetchStatistics();
  }, [selectedDate, user]);

  const sumByProp = <T, K extends keyof T>(prop: K, arr: T[]) => (
    // @ts-ignore
    arr.reduce((acc, cur) => ((cur[prop] !== undefined) ? acc + cur[prop] : 0), 0)
  );

  const getOverallTodayStatistics = () => {
    const correctAnswers = sumByProp('correctAnswers', todayGameStatistics);
    const incorrectAnswers = sumByProp('incorrectAnswers', todayGameStatistics);

    const newWords = sumByProp('newWords', todayGameStatistics);
    const learnedWords = sumByProp('learnedWords', todayGameStatistics);
    const accuracy = +((correctAnswers * 100) / (correctAnswers + incorrectAnswers)).toFixed(0)
      || 0;

    return { newWords, learnedWords, accuracy };
  };

  const getGameStatistics = (gameName: GameName) => {
    const gameStats = todayGameStatistics.filter((gs) => gs.gameName === gameName);

    const correctAnswers = sumByProp('correctAnswers', gameStats);
    const incorrectAnswers = sumByProp('incorrectAnswers', gameStats);

    const newWords = sumByProp('newWords', gameStats);
    const learnedWords = sumByProp('learnedWords', gameStats);

    const accuracy = +((correctAnswers * 100) / (correctAnswers + incorrectAnswers)).toFixed(0)
      || 0;
    const correctAnswersInARow = gameStats.reduce((acc, cur) => (
      acc > cur.correctAnswersInARow ? acc : cur.correctAnswersInARow
    ), 0);

    return {
      newWords, learnedWords, accuracy, correctAnswersInARow,
    };
  };

  const points = weeklyGameStatistics.reduce((acc: Point[], cur) => {
    const date = new Date(cur.date).setHours(0, 0, 0, 0);
    const pointInArray = acc.find((point) => point.date === date);
    if (pointInArray) {
      pointInArray.learnedWords += cur.learnedWords;
      pointInArray.newWords += cur.newWords;
    } else {
      const { newWords, learnedWords } = cur;
      acc.push({ date, newWords, learnedWords });
    }
    return acc;
  }, []);

  const getWeeklyStats = (dateOrMs: Date | number = new Date()) => {
    const date = new Date(dateOrMs);
    const week = getDatesOfWeek(date);
    return week.map((weekday) => {
      const pointInData = points.find((d) => d.date === +weekday);
      if (!pointInData) {
        return { date: +weekday, newWords: 0, learnedWords: 0 } as Point;
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
          prevWeeksData={prevWeeksStatistic}
          wordsPerDayGoal={30}
        />
      </Stack>
    </Container>
  );
};
