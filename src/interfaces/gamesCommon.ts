export enum GameNames {
  Sprint = 'Спринт',
  AudioCall = 'Аудиовызов',
}

export enum Levels {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
}

export type StartScreenBtnProps = {
  label: Levels;
  color: string;
};
