import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
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
import { useEffect, useRef } from 'react';
import { useAppDispatch, useTypedSelector } from '../../redux';
import { authLogIn } from '../../redux/actions/auth';
import {
  signUpChange, signUpReset, signUpSubmit,
} from '../../redux/actions/signUpActions';
import { PasswordInput } from './passwordInput';

interface SignUpFormProps {
  isSignUpOpen: boolean
  onSignUpClose: () => void
  onSuccess: () => void
  altHandler: () => void
}

export const SignUpForm = ({
  isSignUpOpen, onSignUpClose, onSuccess, altHandler,
}: SignUpFormProps) => {
  const dispatch = useAppDispatch();
  const signUpRef = useRef(null);
  const {
    user, submitted, error, loading, name, email, password1, password2,
  } = useTypedSelector((state) => state.signUp);

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: inputName, value } = e.target as HTMLInputElement;
    if (!['name', 'email', 'password1', 'password2'].includes(inputName)) return;
    dispatch(signUpChange({ [inputName]: value }));
  };

  const sendUserData = () => {
    dispatch(signUpSubmit({
      name,
      email,
      password: password1,
    }));
  };

  const arePasswordsMatch = password1 === password2;

  useEffect(() => {
    if (submitted && user) {
      onSignUpClose();
      dispatch(authLogIn({ ...user, lastLogin: Date.now() }));
      dispatch(signUpReset());
      onSuccess();
    }
  }, [submitted, user]);

  return (
    <Modal
      size="md"
      isOpen={isSignUpOpen}
      onClose={onSignUpClose}
      initialFocusRef={signUpRef}
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
            Начни изучения языка сейчас!
          </Text>
          <Text
            fontSize="x-large"
            textAlign="center"
            pt={4}
          >
            Регистрация
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {error?.other && (
          <Alert status="error" mt="3">
            <AlertIcon />
            <Box>
              <AlertTitle>Что-то пошло не так!</AlertTitle>
              <AlertDescription>Повторите попытку регистрации позже.</AlertDescription>
            </Box>
          </Alert>
          )}
          <Stack spacing={5}>
            <FormControl
              isInvalid={submitted && !user && error?.nameEmpty}
            >
              <Input
                placeholder="Имя"
                type="text"
                size="lg"
                name="name"
                ref={signUpRef}
                onChange={handleSignUpChange}
                value={name}
              />
              {submitted && !user && error?.nameEmpty && (
                <FormErrorMessage>Введите своё имя.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              isInvalid={submitted && !user
                && (error?.emailAlreadyExists || error?.emailInvalid || error?.emailEmpty)}
            >
              <Input
                placeholder="Email"
                type="email"
                size="lg"
                name="email"
                onChange={handleSignUpChange}
                value={email}
              />
              {submitted && !user && error?.emailEmpty && (
                <FormErrorMessage>Введите свой email.</FormErrorMessage>
              )}
              {submitted && !user && !error?.emailEmpty && error?.emailInvalid && (
                <FormErrorMessage>Некорректный email.</FormErrorMessage>
              )}
              {submitted && !user && error?.emailAlreadyExists && (
                <FormErrorMessage>Введёный email уже зарегистрирован.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              isInvalid={submitted && !user && (error?.passwordInvalid || error?.passwordEmpty)}
            >
              <PasswordInput
                placeholder="Пароль"
                size="lg"
                name="password1"
                onChange={handleSignUpChange}
                value={password1}
              />
              {submitted && !user && error?.passwordEmpty && (
                <FormErrorMessage>
                  Пожалуйста, введите пароль.
                </FormErrorMessage>
              )}
              {submitted && !user && !error?.passwordEmpty && error?.passwordInvalid && (
                <FormErrorMessage>
                  Пароль должен быть длиной в не менее 8 символов.
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!arePasswordsMatch}>
              <PasswordInput
                placeholder="Повторите пароль"
                size="lg"
                name="password2"
                onChange={handleSignUpChange}
                value={password2}
              />
              {!arePasswordsMatch && (
                <FormErrorMessage>Пароли должны совпадать.</FormErrorMessage>
              )}
            </FormControl>
          </Stack>
          <Button
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
            isDisabled={!arePasswordsMatch}
            isLoading={loading}
            onClick={sendUserData}
          >
            Создать аккаунт
          </Button>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button
            variant="link"
            color="blue.200"
            fontWeight="medium"
            onClick={() => {
              onSignUpClose();
              altHandler();
            }}
          >
            У меня уже есть аккаунт
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
