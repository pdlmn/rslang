import { Levels } from '../../../../../interfaces/gamesCommon';
import { WordInfo } from '../../../../../interfaces/gameWords';
import { Word } from '../../../../../interfaces/services';
import { useTypedSelector } from '../../../../../redux';
import { Words } from '../../../../../services/words';
import { groupButtonData } from '../../../../textbook/groupButtonData';
import { addStatAndShuffleWords } from '../statisticsScreen/utils';

interface LoadWordsOptions {
  grade: Levels,
  page?: number,
}

export const loadWords = async (options: LoadWordsOptions): Promise<Array<WordInfo>> => {
  const { user } = useTypedSelector((state) => state.auth);
  const group = groupButtonData.find((item) => item.grade === options.grade)?.id as number;
  const page = options.page ? options.page - 1 : undefined;
  const groupWords = await Words.get({ group }) as Array<Word>;
  if (!user) {
    if (!page) {
      return addStatAndShuffleWords(groupWords);
    }
    return [
      ...addStatAndShuffleWords(groupWords.filter((word) => word.page === page)),
      ...addStatAndShuffleWords(groupWords.filter((word) => word.page < page)),
    ];
  }

  return [];
};
