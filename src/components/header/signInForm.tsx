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
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
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

  const sendUserData = () => {
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
      size="md"
      isOpen={isSignInOpen}
      onClose={onSignInClose}
      initialFocusRef={signInRef}
      blockScrollOnMount={false}
    >
      <ModalOverlay />
      <ModalContent>
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
            mt="7"
            size="lg"
            width="100%"
            fontSize="xl"
            color="black"
            bg="yellow.400"
            _hover={{
              bg: 'yellow.300',
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
            color="blue.200"
            fontWeight="medium"
            onClick={() => {
              onSignInClose();
              altHandler();
            }}
          >
            Создать аккаунт
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
