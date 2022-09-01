import {
  Button, Flex, Text, StackDivider, VStack, HStack, CircularProgress,
  CircularProgressLabel, Heading, Spacer,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import { useAction } from '../../../hooks/useAction';
import { useTypedSelector } from '../../../redux';
import { SoundUrl } from '../gamesCommon/constants';
import { shadowFromMultipler } from './utils';

export const SprintGame = () => {
  const { words, currentWordIndex } = useTypedSelector((state) => state.gameWords);
  const { isMuted } = useTypedSelector((state) => state.games);
  const [points, setPoints] = useState(0);
  const [multipler, setMultipler] = useState(1);
  const [time, setTime] = useState(60);
  const [combo, setCombo] = useState(0);
  const {
    nextWord, rightAnswer, wrongAnswer, finishGame,
  } = useAction();
  const [playAudioRightAnswer] = useSound(SoundUrl.RightAnswer, { volume: 0.4 });
  const [playAudioWrongAnswer] = useSound(SoundUrl.WrongAnswer, { volume: 0.4 });
  const [playAudioFinish] = useSound(SoundUrl.Finish, { volume: 0.4 });
  const [playAudioMultiplerGain] = useSound(SoundUrl.MultiplerGain, { volume: 0.4 });
  const [playAudioMultiplerLoss] = useSound(SoundUrl.MultiplerLoss, { volume: 0.4 });
  const prng = Math.sin(
    words[currentWordIndex].word.length * currentWordIndex * multipler * points + combo,
  ) * 10000;
  const translate = Math.floor(
    prng - Math.floor(prng) + 0.5,
  )
    ? words[currentWordIndex].wordTranslate
    : words[
      Math.trunc((prng - Math.floor(prng)) * 100) % words.length
    ].wordTranslate;

  const right = () => {
    if (!isMuted) {
      if (combo === 3 && multipler < 5) {
        playAudioMultiplerGain();
      } else {
        playAudioRightAnswer();
      }
    }
    rightAnswer();
    setMultipler((m) => (currentWordIndex && combo === 3 && m < 5 ? m + 1 : m));
    setCombo((c) => (c < 3 || multipler >= 5 ? c + 1 : 0));
    setPoints((p) => p + 10 * multipler);
    nextWord();
  };
  const wrong = () => {
    if (!isMuted) {
      if (multipler > 1) {
        playAudioMultiplerLoss();
      } else {
        playAudioWrongAnswer();
      }
    }
    wrongAnswer();
    setCombo(0);
    setMultipler(1);
    nextWord();
  };
  const onKeyup = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      if (words[currentWordIndex].wordTranslate !== translate) {
        right();
      } else {
        wrong();
      }
    } else if (e.key === 'ArrowRight') {
      if (words[currentWordIndex].wordTranslate === translate) {
        right();
      } else {
        wrong();
      }
    }
  };

  useEffect(() => {
    if (time === 0) {
      if (!isMuted) playAudioFinish();
      finishGame();
    } else {
      setTimeout(() => {
        setTime((t) => t - 1);
      }, 1000);
    }
  }, [time]);

  useEffect(() => {
    if (currentWordIndex >= words.length - 1) {
      if (!isMuted) playAudioFinish();
      finishGame();
    }

    document.addEventListener('keyup', onKeyup);

    return () => {
      document.removeEventListener('keyup', onKeyup);
    };
  }, [currentWordIndex]);

  return (
    <VStack
      p={4}
      divider={<StackDivider borderColor="gray.350" />}
      spacing={4}
    >
      <Flex align="center" gap="20px">
        <CircularProgress size="60px" value={combo * (33.3)} color="orange.400">
          <CircularProgressLabel>
            {multipler}
            x
          </CircularProgressLabel>
        </CircularProgress>
        <Spacer />
        <Heading textShadow={shadowFromMultipler(multipler)}>{points}</Heading>
        <Spacer />
        <CircularProgress size="60px" value={100 - (time / 60) * 100} color="green.400">
          <CircularProgressLabel>{time}</CircularProgressLabel>
        </CircularProgress>
      </Flex>
      <Text fontSize="3xl" fontWeight="bold">
        {words[currentWordIndex].word}
      </Text>
      <Text fontSize="xl" fontWeight="500">
        {translate}
      </Text>
      <HStack spacing={8} pt={2} pb={2}>
        <Button
          display={{ base: 'none', md: 'inline-flex' }}
          fontSize="md"
          fontWeight={600}
          color="white"
          bg="red.600"
          _hover={{
            bg: 'red.500',
          }}
          onClick={words[currentWordIndex].wordTranslate === translate ? wrong : right}
        >
          Неверно
        </Button>
        <Button
          display={{ base: 'none', md: 'inline-flex' }}
          fontSize="md"
          fontWeight={600}
          color="white"
          bg="green.600"
          _hover={{
            bg: 'green.500',
          }}
          onClick={words[currentWordIndex].wordTranslate === translate ? right : wrong}
        >
          Верно
        </Button>
      </HStack>
    </VStack>
  );
};
