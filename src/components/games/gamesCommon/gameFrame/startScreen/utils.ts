import { Levels } from '../../../../../interfaces/gamesCommon';
import { WordInfo } from '../../../../../interfaces/gameWords';
import { UserAuthData } from '../../../../../interfaces/redux/auth';
import { Word } from '../../../../../interfaces/services';
import { Words } from '../../../../../services/words';
import { groupButtonData } from '../../../../textbook/groupButtonData';
import { addStatAndShuffleWords } from '../statisticsScreen/utils';

interface LoadWordsOptions {
  grade: Levels,
  user: UserAuthData | null
  page?: number,
}

export const loadWords = async (options: LoadWordsOptions): Promise<Array<WordInfo>> => {
  const group = groupButtonData.find((item) => item.grade === options.grade)?.id as number;
  const page = options.page ? options.page - 1 : Math.floor(Math.random() * 48) + 10;
  const { user } = options;
  if (!user || !options.page) {
    return addStatAndShuffleWords(await Words.get({ group, page }) as Array<Word>);
  }

  return [];
};
