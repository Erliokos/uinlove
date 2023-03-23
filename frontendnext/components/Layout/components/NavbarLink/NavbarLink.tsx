import { Dispatch, SetStateAction, useState } from "react";
import { Navbar, Tooltip, UnstyledButton, Stack, ColorScheme } from "@mantine/core";
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconLanguage,
} from "@tabler/icons-react";
import { useStyles } from "./useStyle";
import { authorization } from "../../../../client/authorization";
import { useTranslate } from "../../../../client/Language/Language";
import { Language } from "@/generated/operations";
import { useDisclosure } from "@mantine/hooks";
import LanguageModal from "../LanguageModal/LanguageModal";
import { ThemeSwitch } from "../ThemeSwitch/ThemeSwitch";

interface NavbarLinkProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.FC<any>;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
        <Icon size="1.2rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}





interface Props {
  setUserToken: Dispatch<SetStateAction<string | null>>;
  setColorScheme: Dispatch<SetStateAction<ColorScheme>>;
  setLanguage: Dispatch<SetStateAction<Language>>;
  language: Language;
  colorScheme: ColorScheme;
}

export function NavbarMinimal({ setUserToken, setColorScheme, setLanguage, colorScheme, language }: Props) {
  const [active, setActive] = useState(2);

  const TXT = useTranslate();

  const mockdata = [
    { icon: IconHome2, label: TXT.Home },
    { icon: IconGauge, label: TXT.Dashboard },
    { icon: IconDeviceDesktopAnalytics, label: TXT.Analytics },
    { icon: IconCalendarStats, label: TXT.Releases },
    { icon: IconUser, label: TXT.Account },
    { icon: IconFingerprint, label: TXT.Security },
    { icon: IconSettings, label: TXT.Settings },
  ];

  const [opened, { open, close }] = useDisclosure(false);

  const handleLogOut = () => {
    authorization.logout();
    setUserToken(null);
  };

  const handleOpenLanguageModal = () => {
    if (!opened) open();
    else close();
  };

  const links = mockdata.map((link, index) => (
    <NavbarLink {...link} key={link.label} active={index === active} onClick={() => setActive(index)} />
  ));

  return (
    <>
      <LanguageModal opened={opened} close={close} onLanguageChange={setLanguage} language={language} />
      <Navbar width={{ base: 80 }} p="md">
        <Navbar.Section grow mt={50}>
          <Stack justify="center" spacing={0}>
            {links}
          </Stack>
        </Navbar.Section>
        <Navbar.Section>
          <Stack justify="center" spacing={0}>
            <NavbarLink icon={() => ThemeSwitch({ setColorScheme, colorScheme })} label={TXT.Theme} />
            <NavbarLink icon={IconLanguage} label={TXT.Language} onClick={handleOpenLanguageModal} />
            <NavbarLink icon={IconLogout} label={TXT.LogOut} onClick={handleLogOut} />
          </Stack>
        </Navbar.Section>
      </Navbar>
    </>
  );
}
