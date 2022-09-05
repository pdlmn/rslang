import {
  Button, StackDivider, useColorModeValue, VStack, Heading, Flex, Image,
} from '@chakra-ui/react';
import {
  RefObject, useEffect, useRef, useState,
} from 'react';
import { ImVolumeMedium } from 'react-icons/im';
import useSound from 'use-sound';
import { useAction } from '../../../hooks/useAction';
import { useTypedSelector } from '../../../redux';
import { API_URI } from '../../../services/common';
import { SoundUrl } from '../gamesCommon/constants';
import { getVariants, variantBtnColor } from './utils';

export const AudioCallGame = () => {
  const { isMuted, words, currentWordIndex } = useTypedSelector((state) => state.games);
  const {
    nextWord, rightAnswer, wrongAnswer, finishGame,
  } = useAction();
  const btnNext = useRef() as RefObject<HTMLButtonElement>;
  const [startAudio, setStartAudio] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [userAnswer, setUserAnswer] = useState(-1);
  const [variants, setVariants] = useState(getVariants(words, currentWordIndex));
  const [playAudioWord] = useSound(`${API_URI}/${words[currentWordIndex].audio}`, {
    volume: 0.7,
    onload: () => {
      setStartAudio(true);
    },
  });
  const [playAudioFinish] = useSound(SoundUrl.Finish, { volume: 0.4 });
  const [playAudioRightAnswer] = useSound(SoundUrl.RightAnswer, { volume: 0.4 });
  const [playAudioWrongAnswer] = useSound(SoundUrl.WrongAnswer, { volume: 0.4 });
  const correctAnswerIndex = variants
    .indexOf(words[currentWordIndex].wordTranslate.toUpperCase());

  const right = () => {
    if (!isMuted) playAudioRightAnswer();
    rightAnswer();
  };
  const wrong = () => {
    if (!isMuted) playAudioWrongAnswer();
    wrongAnswer();
  };
  const handleAnswer = () => {
    if (userAnswer === correctAnswerIndex) {
      right();
    } else {
      wrong();
    }
  };
  const onKeyup = (e: KeyboardEvent) => {
    if (['1', '2', '3', '4', '5'].includes(e.key)) {
      setUserAnswer(['1', '2', '3', '4', '5'].indexOf(e.key));
    }
  };

  useEffect(() => {
    if (startAudio) playAudioWord();
    setStartAudio(false);
  }, [startAudio]);

  useEffect(() => {
    if (userAnswer !== -1) {
      document.onkeyup = null;
      setIsAnswered(true);
    } else {
      document.onkeyup = onKeyup;
      setIsAnswered(false);
    }
    return () => {
      document.onkeyup = null;
    };
  }, [userAnswer]);

  useEffect(() => {
    if (isAnswered) {
      handleAnswer();
    } else {
      setVariants(getVariants(words, currentWordIndex));
    }
  }, [isAnswered]);

  useEffect(() => {
    if (currentWordIndex >= words.length - 1) {
      if (!isMuted) playAudioFinish();
      finishGame();
    }
    setUserAnswer(-1);
  }, [currentWordIndex]);

  return (
    <VStack
      p={{ base: '1', md: '4' }}
      divider={<StackDivider borderColor="gray.350" />}
      spacing={{ base: '1', md: '4' }}
    >
      <Flex gap="5px" maxH="200px">
        <VStack>
          <Button
            size="xl"
            rounded="full"
            backgroundColor="transparent"
            p={4}
            color={useColorModeValue('gray.700', 'gray.400')}
            _hover={{ bgColor: 'yellow.300', color: useColorModeValue('gray.700', 'gray.800') }}
            _active={{ bgColor: 'yellow.400' }}
            onClick={() => {
              setStartAudio(true);
            }}
          >
            <ImVolumeMedium size={90} />
          </Button>
          <Heading size="md" lineHeight={10}>
            {isAnswered ? words[currentWordIndex].word.toUpperCase() : '_ '.repeat(words[currentWordIndex].word.length)}
          </Heading>
        </VStack>
        {isAnswered ? (
          <Image
            w="full"
            maxH={{
              base: '95px', md: '190px',
            }}
            alignSelf="center"
            objectFit="cover"
            src={`${API_URI}/${words[currentWordIndex].image}`}
            alt={words[currentWordIndex].word}
            rounded="xl"
          />
        ) : null}
      </Flex>
      <Flex columnGap={{ base: '10px', md: '30px' }} rowGap={{ base: '2px', md: '20px' }} justifyContent="center" wrap="wrap">
        {variants.map((variant, index) => (
          <Button
            key={`${variant}${currentWordIndex}`}
            display={{ base: 'inline-flex', md: 'inline-flex' }}
            fontSize={{ base: 'xs', md: 'md' }}
            size={{ base: 'xs', md: 'md' }}
            fontWeight={600}
            minW="150px"
            rounded="full"
            backgroundColor="transparent"
            color={variantBtnColor(isAnswered, index, userAnswer, correctAnswerIndex)}
            border={`2px solid ${variantBtnColor(isAnswered, index, userAnswer, correctAnswerIndex)}`}
            onClick={() => {
              if (!isAnswered) setUserAnswer(index);
            }}
          >
            {index + 1}
            {' '}
            {variant}
          </Button>
        ))}
      </Flex>
      <Button
        ref={btnNext}
        autoFocus
        onBlur={() => {
          btnNext.current?.focus();
        }}
        display={{ base: 'inline-flex', md: 'inline-flex' }}
        fontSize={{ base: 'xs', md: 'md' }}
        size={{ base: 'xs', md: 'md' }}
        mt="auto"
        fontWeight={600}
        color="white"
        bg={`${isAnswered ? 'blue' : 'purple'}.600`}
        _hover={{
          bg: `${isAnswered ? 'blue' : 'purple'}.500`,
        }}
        _active={{ borderWidth: '0px' }}
        onClick={() => {
          if (isAnswered) {
            setIsAnswered(false);
            nextWord();
          } else {
            setIsAnswered(true);
          }
        }}
      >
        {isAnswered ? 'Дальше' : 'Не знаю'}
      </Button>
    </VStack>
  );
};
