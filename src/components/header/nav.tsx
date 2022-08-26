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
    href: '/textbook',
  },
  {
    label: 'Игры',
    href: '/games',
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
    href: '/statistics',
  },
];

const DesktopSubNav = ({ label, href }: NavItem) => (
  <Link
    href={href}
    role="group"
    display="block"
    p={2}
    rounded="md"
    _hover={{ bg: useColorModeValue('yellow.50', 'gray.900') }}
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
  </Link>
);

export const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.700', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.900', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction="row" spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger="hover" placement="bottom-start">
            <PopoverTrigger>
              <Link
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
                      _hover={{
                        bg: useColorModeValue('yellow.50', 'gray.900'),
                        color: 'yellow.500',
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

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify="space-between"
        align="center"
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
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
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
