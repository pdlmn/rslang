import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent, ModalFooter,
  ModalHeader, ModalOverlay,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { FormEvent, useEffect, useRef } from 'react';
import { useAppDispatch, useTypedSelector } from '../../redux';
import { authLogIn } from '../../redux/actions/auth';
import { signInChange, signInReset, signInSubmit } from '../../redux/actions/signInActions';
import { PasswordInput } from './passwordInput';

interface SignInFormProps {
  isSignInOpen: boolean
  onSignInClose: () => void
  onSuccess: () => void
  altHandler: () => void
}

export const SignInForm = ({
  isSignInOpen, onSignInClose, onSuccess, altHandler,
}: SignInFormProps) => {
  const dispatch = useAppDispatch();
  const {
    user, email, password, error, loading,
  } = useTypedSelector((state) => state.signIn);
  const signInRef = useRef(null);

  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    if (name !== 'email' && name !== 'password') return;
    dispatch(signInChange({ [name]: value }));
  };

  const sendUserData = (e: FormEvent) => {
    e.preventDefault();
    dispatch(signInSubmit({
      email,
      password,
    }));
  };

  useEffect(() => {
    if (user) {
      onSignInClose();
      dispatch(authLogIn({ ...user, lastLogin: Date.now() }));
      dispatch(signInReset());
      onSuccess();
    }
  }, [user]);

  return (
    <Modal
      size={{ base: 'full', sm: 'md' }}
      isOpen={isSignInOpen}
      onClose={onSignInClose}
      initialFocusRef={signInRef}
      blockScrollOnMount={false}
    >
      <ModalOverlay />
      <ModalContent>
        <Box as="form">
          <ModalHeader>
            <Text
              px={4}
              textAlign="center"
              fontStyle="italic"
              fontWeight="thin"
            >
              Добро пожаловать снова :)
            </Text>
            <Text
              fontSize="x-large"
              textAlign="center"
              pt={4}
            >
              Вход
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {error?.other && (
            <Alert status="error" mb="3">
              <AlertIcon />
              <Box>
                <AlertTitle>Что-то пошло не так!</AlertTitle>
                <AlertDescription>Повторите попытку входа позже.</AlertDescription>
              </Box>
            </Alert>
            )}
            {error?.incorrectEmailOrPassword && (
            <Alert status="error" mb="3">
              <AlertIcon />
              <Box>
                <AlertTitle>Неверный email или пароль.</AlertTitle>
                <AlertDescription>Пожалуйста, попробуйте снова.</AlertDescription>
              </Box>
            </Alert>
            )}
            <Stack spacing={5}>
              <Input
                placeholder="Email"
                type="email"
                size="lg"
                name="email"
                ref={signInRef}
                onChange={handleSignInChange}
                value={email}
              />
              <PasswordInput
                placeholder="Пароль"
                size="lg"
                name="password"
                onChange={handleSignInChange}
                value={password}
              />
            </Stack>
            <Button
              type="submit"
              mt="7"
              size="lg"
              width="100%"
              fontSize="xl"
              color={useColorModeValue('gray.800', 'black')}
              bg="yellow.400"
              _hover={{
                bg: 'yellow.300',
              }}
              _active={{
                bg: 'yellow.500',
              }}
              isLoading={loading}
              onClick={sendUserData}
            >
              Войти
            </Button>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button
              variant="link"
              color={useColorModeValue('blue.400', 'blue.200')}
              fontWeight="medium"
              onClick={() => {
                onSignInClose();
                altHandler();
              }}
            >
              Создать аккаунт
            </Button>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  );
};
