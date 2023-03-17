import { useState } from "react";
import { Navbar, Tooltip, UnstyledButton, Stack } from "@mantine/core";
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import { useStyles } from "./useStyle";
import { authorization } from "../Auth/authorization";
import { getTXT } from "../Language/Language";



interface NavbarLinkProps {
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

const TXT = getTXT();

const mockdata = [
  { icon: IconHome2, label: TXT.Home },
  { icon: IconGauge, label: TXT.Dashboard },
  { icon: IconDeviceDesktopAnalytics, label: TXT.Analytics },
  { icon: IconCalendarStats, label: TXT.Releases },
  { icon: IconUser, label: TXT.Account },
  { icon: IconFingerprint, label: TXT.Security },
  { icon: IconSettings, label: TXT.Settings },
];



export function NavbarMinimal() {
  const [active, setActive] = useState(2);

  const handleLogOut = () => {
    authorization.logout();
  };


  const links = mockdata.map((link, index) => (
    <NavbarLink {...link} key={link.label} active={index === active} onClick={() => setActive(index)} />
  ));

  return (
    <Navbar height={750} width={{ base: 80 }} p="md">
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink icon={IconLogout} label={TXT.LogOut} onClick={handleLogOut} />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
