import { Levels } from '../../../../../interfaces/gamesCommon';
import { WordInfo } from '../../../../../interfaces/gameWords';
import { UserAuthData } from '../../../../../interfaces/redux/auth';
import { AggregatedObject, Word } from '../../../../../interfaces/services';
import AggregatedWords from '../../../../../services/aggregatedWords';
import { Words } from '../../../../../services/words';
import { groupButtonData } from '../../../../textbook/groupButtonData';
import { addStatAndShuffleAggregatedWords, addStatAndShuffleWords } from '../statisticsScreen/utils';

interface LoadWordsOptions {
  grade: Levels,
  user: UserAuthData | null
  page?: number,
}

export const loadWords = async (options: LoadWordsOptions): Promise<Array<WordInfo>> => {
  const group = groupButtonData.find((item) => item.grade === options.grade)?.id as number;
  const page = options.page ? options.page - 1 : Math.trunc(Math.random() * 29);
  const { user } = options;

  if (!user) {
    return addStatAndShuffleWords(await Words.get({ group, page }) as Array<Word>);
  }
  if (!options.page) {
    return addStatAndShuffleAggregatedWords((await AggregatedWords
      .get(user.userId, user.token, {
        group, page: 0, wordsPerPage: 600,
      }) as AggregatedObject)[0].paginatedResults).slice(-20);
  }

  // TODO: add filter obj or filter func before slice to remove learned words
  const result = (await AggregatedWords
    .get(user.userId, user.token, {
      group, page: 0, wordsPerPage: 20 * (page + 1),
    }) as AggregatedObject)[0].paginatedResults.slice(-20);

  return addStatAndShuffleAggregatedWords(result);
};
