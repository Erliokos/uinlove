import { Dispatch, SetStateAction, useState } from "react";
import { Navbar, Tooltip, UnstyledButton, Stack, ColorScheme, Modal, Autocomplete, AutocompleteItem } from "@mantine/core";
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
  IconMoon,
} from "@tabler/icons-react";
import { useStyles } from "./useStyle";
import { authorization } from "../../../../client/authorization";
import { useTranslate } from "../../../../client/Language/Language";
import { Language } from "@/generated/operations";
import { useDisclosure } from "@mantine/hooks";

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
  setLanguage: Dispatch<SetStateAction<Language | null>>;
  language: Language | null;
}

export function NavbarMinimal({ setUserToken, setColorScheme, setLanguage, language }: Props) {
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

  const handleChangeLanguage = ({ key }: AutocompleteItem) => {
    authorization.setCurrentLanguage(key);
    setLanguage(() => key);
  };

  const links = mockdata.map((link, index) => (
    <NavbarLink {...link} key={link.label} active={index === active} onClick={() => setActive(index)} />
  ));

  return (
    <>
      <Modal opened={opened} onClose={close} title={TXT.Language} centered size="auto">
        <Autocomplete
          hoverOnSearchChange={false}
          mt={"lg"}
          defaultValue={TXT[language as Language] ?? ""}
          data={[
            { value: TXT[Language.ENGLISH], key: Language.ENGLISH },
            { value: TXT[Language.RUSSIAN], key: Language.RUSSIAN },
          ]}
          onItemSubmit={handleChangeLanguage}
        />
      </Modal>
      <Navbar width={{ base: 80 }} p="md">
        <Navbar.Section grow mt={50}>
          <Stack justify="center" spacing={0}>
            {links}
          </Stack>
        </Navbar.Section>
        <Navbar.Section>
          <Stack justify="center" spacing={0}>
            <NavbarLink icon={IconMoon} label={TXT.Theme} onClick={handleLogOut} />
            <NavbarLink icon={IconLanguage} label={TXT.Language} onClick={handleOpenLanguageModal} />
            <NavbarLink icon={IconLogout} label={TXT.LogOut} onClick={handleLogOut} />
          </Stack>
        </Navbar.Section>
      </Navbar>
    </>
  );
}
