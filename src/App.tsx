import {
  Route, Routes, useLocation,
} from 'react-router-dom';
import { useEffect } from 'react';
import { Home } from './pages/home';
import { Textbook } from './pages/textbook';
import { Statistics } from './components/statistics/statistics';
import { Sprint } from './pages/games/sprint';
import { AudioCall } from './pages/games/audioCall';
import { Games } from './pages/games/games';
import {
  useAppDispatch,
  useTypedSelector,
} from './redux';
import Users from './services/users';
import { authLogOut, authRefresh } from './redux/actions/auth';
import gameStatistics from './services/gameStatistics';

export const App = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useTypedSelector((state) => state.auth);

  (async () => {
    console.log('heh');

    if (user) {
      const stats = await gameStatistics.get(user.userId, user.token);
      const postedStat = await gameStatistics.send(user.userId, user.token, {
        gameName: 'sprint',
        learnedWords: 66,
        correctAnswers: 66,
        incorrectAnswers: 0,
        correctAnswersInARow: 66,
      });
      console.log(stats);
      console.log(postedStat);
    }
  })();

  let refreshed = false;
  useEffect(() => {
    const getRefreshToken = async () => {
      try {
        // обновляет refreshToken раз в 10 минут (600000 милисекунд)
        if (!refreshed && user && ((Date.now() - user.lastLogin) >= 600000)) {
          const refreshedToken = await Users.getToken(user.userId, user.refreshToken);

          if ('token' in refreshedToken) {
            dispatch(authRefresh({ ...refreshedToken, lastLogin: Date.now() }));
          } else {
            dispatch(authLogOut());
          }
        }
      } catch {
        dispatch(authLogOut());
      }
    };

    getRefreshToken();

    return () => {
      refreshed = true;
    };
  }, [location]);

  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="textbook" element={<Textbook />} />
      <Route path="statistics" element={<Statistics />} />
      <Route path="sprintgame" element={<Sprint />} />
      <Route path="audiogame" element={<AudioCall />} />
      <Route path="games" element={<Games />} />
    </Routes>
  );
};
