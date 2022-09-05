export enum StatisticsActionTypes {
  SetLoader = 'signUp/setLoader',
  ChangeDate = 'signUp/changeDate',
}

export type StatisticsState = {
  isLoading: boolean,
  date: Date,
};

export type StatisticsSetLoaderAction = {
  type: StatisticsActionTypes.SetLoader,
  payload: boolean,
};

export type StatisticsChangeDateAction = {
  type: StatisticsActionTypes.ChangeDate,
  payload: Date,
};

export type StatisticsAction = StatisticsSetLoaderAction | StatisticsChangeDateAction;
