import { UserToken, Word, UserWord } from '../interfaces/services';
import UserWords from './usersWords';

const getExistingOrDefaultUserWord = (
  user: UserToken,
  selectedWord: Word
): Promise<UserWord> =>
  UserWords.getOne(
    user!.userId,
    selectedWord!.id,
    user!.token
  ) as Promise<UserWord>;

const getDefaultWord = () => ({
  optional: {},
});

export type AddToComplexParams = { user: UserToken | null; selectedWord: Word };

export const addToComplex = async ({
  user,
  selectedWord,
}: AddToComplexParams) => {
  if (user) {
    const existing = await getExistingOrDefaultUserWord(user, selectedWord);
    const existingOrDefault = existing || getDefaultWord();
    const updatedUserWord = {
      optional: { ...existingOrDefault.optional, learned: false },
      difficulty: 'hard',
    };
    const updateOrCreate = existing ? UserWords.update : UserWords.create;

    updateOrCreate(user.userId, selectedWord.id, user.token, updatedUserWord);
  }
};

export const removeFromComplex = async ({
  user,
  selectedWord,
}: AddToComplexParams) => {
  if (user) {
    const existing = await getExistingOrDefaultUserWord(user, selectedWord);

    if (!existing) {
      return;
    }

    const updatedUserWord = { ...existing, difficulty: 'easy' };

    UserWords.update(user.userId, selectedWord.id, user.token, updatedUserWord);
  }
};

const setLearned = async (
  { user, selectedWord }: AddToComplexParams,
  learned: boolean
) => {
  if (user) {
    const existing = await getExistingOrDefaultUserWord(user, selectedWord);
    const existingOrDefault = existing || getDefaultWord();
    const updatedUserWord = {
      difficulty: 'easy',
      optional: { ...existingOrDefault.optional, learned },
    };
    const updateOrCreate = existing ? UserWords.update : UserWords.create;

    updateOrCreate(user.userId, selectedWord.id, user.token, updatedUserWord);
  }
};

export const addToLearned = async (params: AddToComplexParams) =>
  setLearned(params, true);
export const removeFromLearned = async (params: AddToComplexParams) =>
  setLearned(params, false);
