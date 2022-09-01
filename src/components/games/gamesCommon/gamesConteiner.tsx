import { CloseIcon } from '@chakra-ui/icons';
import {
  ButtonGroup, Container, Flex, IconButton, useColorModeValue, VStack,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { BiVolumeFull, BiVolumeMute } from 'react-icons/bi';
import { BsFullscreen } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useAction } from '../../../hooks/useAction';
import { useTypedSelector } from '../../../redux';
import { GameFrame } from './gameFrame/gameFrame';

export const GamesConteiner = () => {
  const { isMuted, isFullscreen } = useTypedSelector((state) => state.games);
  const {
    mute, unmute, startFullscreen, stopFullscreen,
  } = useAction();
  const conteiner = useRef(null);
  const bgColor = useColorModeValue('white', 'gray.800');

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      const box = conteiner.current as unknown as HTMLElement;
      box.requestFullscreen();
      startFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      stopFullscreen();
    }
  };

  const toggleAudio = () => {
    if (isMuted) {
      unmute();
    } else {
      mute();
    }
  };

  return (
    <Container
      maxW="container.md"
      h="calc(100vh - 100px)"
      bgColor={bgColor}
      ref={conteiner}
      boxShadow="inset 0 0 1em gray"
      rounded="xl"
    >
      <VStack height={isFullscreen ? '100vh' : '100%'} p="1em">
        <ButtonGroup isAttached size="lg" variant="outline" ml="auto">
          <IconButton aria-label="Sound" icon={isMuted ? <BiVolumeMute /> : <BiVolumeFull />} onClick={toggleAudio} />
          <IconButton aria-label="Fullscreen" icon={<BsFullscreen />} onClick={toggleFullscreen} />
          <Link to="/"><IconButton aria-label="Close" icon={<CloseIcon />} /></Link>
        </ButtonGroup>
        <Flex height="100%" align="center" justify="center" mt="0px">
          <GameFrame />
        </Flex>
      </VStack>
    </Container>
  );
};
