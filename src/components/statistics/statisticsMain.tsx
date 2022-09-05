import { Container, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { GameStatistic } from '../../interfaces/services';
import { useAppDispatch, useTypedSelector } from '../../redux';
import { statisticsSetLoader } from '../../redux/actions/statistics';
import gameStatistics from '../../services/gameStatistics';
import { getDatesOfWeek } from '../../utils/date';
import { AllTimeStatistics } from './allTimeStatistics';
import { TodayStatistics } from './todayStatistics';

export const StatisticsMain = () => {
  type GameName = 'sprint' | 'audiocall';

  const { user } = useTypedSelector((state) => state.auth);
  const { date: selectedDate } = useTypedSelector((state) => state.statistics);
  const dispatch = useAppDispatch();

  const [todayStatistics, setTodayStatistics] = useState<GameStatistic[]>([]);
  const [weeklyStatistics, setWeeklyStatistics] = useState<GameStatistic[]>([]);

  useEffect(() => {
    if (!user) {
      setTodayStatistics([]);
      setWeeklyStatistics([]);
      return;
    }

    const fetchTodayStatistics = async () => {
      const response = await gameStatistics.get(user.userId, user.token, {
        from: new Date().setHours(0, 0, 0, 0),
        to: new Date().setHours(23, 59, 59, 999),
      });
      if (Array.isArray(response)) {
        setTodayStatistics(response);
      }
    };

    const fetchWeeklyStatistics = async () => {
      const datesOfWeek = getDatesOfWeek(selectedDate);
      const response = await gameStatistics.get(user.userId, user.token, {
        from: Number(datesOfWeek[0]),
        to: datesOfWeek[6].setHours(23, 59, 59, 999),
      });
      if (Array.isArray(response)) {
        setWeeklyStatistics(response);
      }
    };

    const fetchStatistics = async () => {
      dispatch(statisticsSetLoader(true));
      await fetchTodayStatistics();
      await fetchWeeklyStatistics();
      dispatch(statisticsSetLoader(false));
    };

    fetchStatistics();
  }, [selectedDate, user]);

  const sumByProp = <T, K extends keyof T>(prop: K, arr: T[]) => (
    // @ts-ignore
    arr.reduce((acc, cur) => acc + cur[prop], 0)
  );

  const getOverallTodayStatistics = () => {
    const correctAnswers = sumByProp('correctAnswers', todayStatistics);
    const incorrectAnswers = sumByProp('incorrectAnswers', todayStatistics);

    const learnedWords = sumByProp('learnedWords', todayStatistics);
    const accuracy = +((correctAnswers * 100) / (correctAnswers + incorrectAnswers)).toFixed(0)
      || 0;

    return { learnedWords, accuracy };
  };

  const getGameStatistics = (gameName: GameName) => {
    const todayGameStats = todayStatistics.filter((gs) => gs.gameName === gameName);

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

  const points = weeklyStatistics.reduce((acc: Point[], cur) => {
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
          audiocallStatistics={getGameStatistics('audiocall')}
          sprintStatistics={getGameStatistics('sprint')}
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
