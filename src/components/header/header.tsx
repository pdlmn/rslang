import {
  Flex,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useDisclosure,
  Container,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { DesktopNav, MobileNav } from './nav';
import { Logo } from './logo';

export const Header = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Container boxSize="full" maxW="container.xl">
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
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
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
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
          {/* <Button
            as={"a"}
            fontSize={"md"}
            fontWeight={400}
            variant={"link"}
            href={"#"}
          >
            Войти
          </Button> */}
          <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize="md"
            fontWeight={600}
            color="white"
            bg="yellow.400"
            _hover={{
              bg: 'yellow.300',
            }}
          >
            Войти
          </Button>
          <ColorModeSwitcher justifySelf="flex-end" />
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Container>
  );
};
