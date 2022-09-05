import { StatisticsAction, StatisticsActionTypes, StatisticsState } from '../../interfaces/redux/statistics';

const initialState: StatisticsState = {
  isLoading: false,
  date: new Date(),
};

export const statisticsReducer = (
  state = initialState,
  action: StatisticsAction,
): StatisticsState => {
  switch (action.type) {
    case StatisticsActionTypes.SetLoader:
      return { ...state, isLoading: action.payload };
    case StatisticsActionTypes.ChangeDate:
      return { ...state, date: action.payload };
    default:
      return state;
  }
};
