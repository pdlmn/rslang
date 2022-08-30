import {
  Route, Routes, useLocation,
} from 'react-router-dom';
import { useEffect } from 'react';
import { Home } from './pages/home';
import { Textbook } from './components/textbook/textbook';
import { Statistics } from './components/statistics/statistics';
import { Sprint } from './components/games/sprint/sprint';
import { AudioCall } from './components/games/audioCall/audioCall';
import { Games } from './components/games/games';
import {
  useAppDispatch,
  useTypedSelector,
} from './redux';
import Users from './services/users';
import { authLogOut, authRefresh } from './redux/actions/auth';

export const App = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useTypedSelector((state) => state.auth);

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
