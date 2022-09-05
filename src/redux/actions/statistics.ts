import { StatisticsActionTypes, StatisticsChangeDateAction, StatisticsSetLoaderAction } from '../../interfaces/redux/statistics';

export const statisticsSetLoader = (payload: boolean): StatisticsSetLoaderAction => ({
  type: StatisticsActionTypes.SetLoader,
  payload,
});

export const statisticsChangeDate = (payload: Date): StatisticsChangeDateAction => ({
  type: StatisticsActionTypes.ChangeDate,
  payload,
});
