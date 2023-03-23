import { authorization } from "@/client/authorization";
import { useChangeThemeLazyQuery } from "@/generated/hooks";
import { Switch, Group, useMantineTheme, ColorScheme } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setColorScheme: Dispatch<SetStateAction<ColorScheme>>;
  colorScheme: ColorScheme;
}

export function ThemeSwitch({ setColorScheme, colorScheme }: Props) {
  const theme = useMantineTheme();

  const [changeTheme] = useChangeThemeLazyQuery({fetchPolicy: 'no-cache'});

  const handleChangeColorScheme = async () => {
    const user = authorization.getCurrentUser();
    const curentColorScheme: ColorScheme = colorScheme === "dark" ? "light" : "dark";
    if (user?.id) await changeTheme({ variables: { args: { id: user.id, colorScheme: curentColorScheme } } });
    setColorScheme(curentColorScheme);
  };

  return (
    <Group position="center">
      <Switch
        size="xs"
        checked={colorScheme === "light"}
        color={colorScheme === "dark" ? "red" : "light"}
        onLabel={<IconSun size="1rem" stroke={2.5} color={theme.colors.yellow[4]} />}
        offLabel={<IconMoonStars size="1rem" stroke={2.5} color={theme.colors.blue[6]} />}
        onChange={handleChangeColorScheme}
      />
    </Group>
  );
}
