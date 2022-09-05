import { Levels } from '../../interfaces/gamesCommon';

export type GroupButtonData = {
  id: number,
  lvl: string;
  numWords: string;
  grade: Levels;
  color: { hoverColor: string; activeColor: string; baseColor: string };
};

export const groupButtonData: Array<GroupButtonData> = [
  {
    id: 0,
    lvl: 'Easy',
    numWords: '1-600',
    grade: Levels.A1,
    color: {
      hoverColor: 'cyan.50',
      activeColor: 'cyan.100',
      baseColor: 'cyan.300',
    },
  },
  {
    id: 1,
    lvl: 'Easy',
    numWords: '601-1200',
    grade: Levels.A2,
    color: {
      hoverColor: 'green.50',
      activeColor: 'green.100',
      baseColor: 'green.300',
    },
  },
  {
    id: 2,
    lvl: 'Medium',
    numWords: '1201-1800',
    grade: Levels.B1,
    color: {
      hoverColor: 'red.50',
      activeColor: 'red.100',
      baseColor: 'red.300',
    },
  },
  {
    id: 3,
    lvl: 'Medium',
    numWords: '1801-2400',
    grade: Levels.B2,
    color: {
      hoverColor: 'orange.50',
      activeColor: 'orange.100',
      baseColor: 'orange.300',
    },
  },
  {
    id: 4,
    lvl: 'Hard',
    numWords: '2401-3000',
    grade: Levels.C1,
    color: {
      hoverColor: 'teal.50',
      activeColor: 'teal.100',
      baseColor: 'teal.300',
    },
  },
  {
    id: 5,
    lvl: 'Hard',
    numWords: '3001-3600',
    grade: Levels.C2,
    color: {
      hoverColor: 'purple.50',
      activeColor: 'purple.100',
      baseColor: 'purple.300',
    },
  },
];
