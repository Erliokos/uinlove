import { authorization } from "@/client/authorization";
import { NavbarMinimal } from "@/components/Layout/components/NavbarLink/NavbarLink";
import { Language } from "@/generated/operations";
import { AppShell, ColorScheme } from "@mantine/core";
import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { Auth } from "./components/Auth/Auth";

interface Props {
  setColorScheme: Dispatch<SetStateAction<ColorScheme>>;
  children: ReactNode;
  colorScheme: ColorScheme;
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
}

export function Layout({ children, setColorScheme, colorScheme, language, setLanguage }: Props) {
  const [userToken, setUserToken] = useState<string | null>(null);

  const userdata = authorization.getCurrentToken();

  useEffect(() => {
    setUserToken(userdata);
  }, [userdata]);

  if (userToken === null) return <Auth setUserToken={setUserToken} setLanguage={setLanguage} setColorScheme={setColorScheme} />;

  return (
    <AppShell
      navbar={
        <NavbarMinimal
          setUserToken={setUserToken}
          setColorScheme={setColorScheme}
          colorScheme={colorScheme}
          setLanguage={setLanguage}
          language={language}
        />
      }
    >
      {children}
    </AppShell>
  );
}
