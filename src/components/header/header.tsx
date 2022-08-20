import {
  Flex,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useDisclosure,
  Container,
  useToast,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { DesktopNav, MobileNav } from './nav';
import { Logo } from './logo';
import { SignUpForm } from './signUpForm';
import { SignInForm } from './signInForm';
import { useAppDispatch, useTypedSelector } from '../../redux';
import { authLogOut } from '../../redux/actions/auth';

export const Header = () => {
  const {
    isOpen: isNavigationOpen,
    onToggle: onNavigationToggle,
  } = useDisclosure();

  const {
    isOpen: isSignInOpen,
    onOpen: onSignInOpen,
    onClose: onSignInClose,
  } = useDisclosure();

  const {
    isOpen: isSignUpOpen,
    onOpen: onSignUpOpen,
    onClose: onSignUpClose,
  } = useDisclosure();

  const dispatch = useAppDispatch();
  const { user } = useTypedSelector((state) => state.auth);

  const toast = useToast();

  return (
    <Container boxSize="full" maxW="container.xl">
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.700', 'white')}
        minH="80px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align="center"
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onNavigationToggle}
            icon={
              isNavigationOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>

        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Logo />

          <Flex display={{ base: 'none', md: 'flex' }} ml={10} align="center">
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify="flex-end"
          direction="row"
          spacing={6}
        >
          {user
            ? (
              <Button
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize="md"
                fontWeight={600}
                color="black"
                bg="yellow.400"
                _hover={{
                  bg: 'yellow.300',
                }}
                onClick={() => dispatch(authLogOut())}
              >
                Выход
              </Button>
            )
            : (
              <>
                <Button
                  onClick={onSignUpOpen}
                  fontSize="md"
                  fontWeight={400}
                  variant="link"
                >
                  Регистрация
                </Button>

                <Button
                  onClick={onSignInOpen}
                  display={{ base: 'none', md: 'inline-flex' }}
                  fontSize="md"
                  fontWeight={600}
                  color="black"
                  bg="yellow.400"
                  _hover={{
                    bg: 'yellow.300',
                  }}
                >
                  Вход
                </Button>
              </>
            )}
          <ColorModeSwitcher justifySelf="flex-end" />

        </Stack>
      </Flex>

      <SignUpForm
        isSignUpOpen={isSignUpOpen}
        onSignUpClose={onSignUpClose}
        altHandler={onSignInOpen}
        onSuccess={() => toast({
          title: 'Успех',
          description: 'Вы успешно зарегистрировались на RSLang.',
          status: 'success',
          isClosable: true,
        })}
      />

      <SignInForm
        isSignInOpen={isSignInOpen}
        onSignInClose={onSignInClose}
        altHandler={onSignUpOpen}
        onSuccess={() => toast({
          title: 'Успех',
          description: 'Вы успешно вошли в RSLang.',
          status: 'success',
          isClosable: true,
        })}
      />

      <Collapse in={isNavigationOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Container>
  );
};
