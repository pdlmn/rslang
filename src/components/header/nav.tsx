import {
  Box,
  Flex,
  Text,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  HStack,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FaHeadphones } from 'react-icons/fa';
import { GiSprint } from 'react-icons/gi';
import { IconType } from 'react-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAction } from '../../hooks/useAction';

type NavItemChild = {
  label: string;
  href: string;
  icon: IconType;
};

type NavItem = {
  label: string;
  children?: Array<NavItemChild>;
  href: string;
};

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Учебник',
    href: 'rslang/#/textbook',
  },
  {
    label: 'Игры',
    href: 'rslang/#/games',
    children: [
      {
        label: 'Аудиовызов',
        href: '/audiogame',
        icon: FaHeadphones,
      },
      {
        label: 'Спринт',
        href: '/sprintgame',
        icon: GiSprint,
      },
    ],
  },
  {
    label: 'Статистика',
    href: 'rslang/#/statistics',
  },
];

const DesktopSubNav = ({ label, href }: NavItem) => {
  const navigate = useNavigate();
  const { startFromMenu, ResetGame } = useAction();
  const location = useLocation();
  return (
    <Box
      role="group"
      display="block"
      p={2}
      rounded="md"
      _hover={{ bg: useColorModeValue('yellow.100', 'gray.100') }}
      onClick={() => {
        if (location.pathname === href) return;
        ResetGame();
        startFromMenu();
        navigate(href);
      }}
    >
      <Stack direction="row" align="center">
        <Box>
          <Text
            transition="all .3s ease"
            fontWeight={500}
            mr={4}
          >
            {label}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.700', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'gray.900');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction="row" spacing={4} userSelect="none">
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger="hover" placement="bottom-start">
            <PopoverTrigger>
              <Link
                transitionDuration="0"
                p={2}
                href={navItem.href ?? '#'}
                fontSize="lg"
                fontWeight={500}
                color={linkColor}
                _hover={{
                  bg: 'gray.200',
                  rounded: '2xl',
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow="xl"
                bg={popoverContentBgColor}
                p={4}
                pr={6}
                rounded="xl"
                maxW="min"
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <HStack
                      key={child.label}
                      rounded="md"
                      _hover={{
                        bg: useColorModeValue('yellow.100', 'gray.100'),
                        color: linkHoverColor,
                      }}
                    >
                      <Icon as={child.icon} ml={4} />
                      <DesktopSubNav label={child.label} href={child.href} />
                    </HStack>
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();
  const { startFromMenu, ResetGame } = useAction();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex justify="space-between" align="center">
        <Flex
          py={2}
          as={Link}
          href={href ?? '#'}
          _hover={{
            textDecoration: 'none',
          }}
        >
          <Text
            fontWeight={600}
            color={useColorModeValue('gray.600', 'gray.200')}
          >
            {label}
          </Text>
        </Flex>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition="all .25s ease-in-out"
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle="solid"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align="start"
        >
          {children
            && children.map((child) => (
              <Box
                key={child.label}
                py={2}
                _hover={{
                  cursor: 'pointer',
                }}
                onClick={() => {
                  if (location.pathname === child.href) return;
                  ResetGame();
                  startFromMenu();
                  navigate(child.href);
                }}
              >
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

export const MobileNav = () => (
  <Stack
    bg={useColorModeValue('white', 'gray.800')}
    p={4}
    display={{ md: 'none' }}
  >
    {NAV_ITEMS.map((navItem) => (
      <MobileNavItem key={navItem.label} {...navItem} />
    ))}
  </Stack>
);
