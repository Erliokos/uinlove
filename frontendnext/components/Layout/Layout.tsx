import { authorization } from "@/client/authorization";
import { NavbarMinimal } from "@/components/Layout/components/NavbarLink/NavbarLink";
import { Language } from "@/generated/operations";
import { AppShell, ColorScheme } from "@mantine/core";
import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { Auth } from "./components/Auth/Auth";

interface Props {
  setColorScheme: Dispatch<SetStateAction<ColorScheme>>
  children: ReactNode;
}

export function Layout({ children, setColorScheme }: Props) {
  console.log('rnder');
  
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  const [userToken, setUserToken] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language | null>(authorization.getCurrentLanguage());

  const userdata = authorization.getCurrentToken();

  useEffect(() => {
    setUserToken(userdata);
  }, [userdata]);

  if (userToken === null) return <>{hydrated && <Auth setUserToken={setUserToken} />}</>;

  return (
    <>
      {hydrated && (
        <AppShell
          navbar={
            <NavbarMinimal
              setUserToken={setUserToken}
              setColorScheme={setColorScheme}
              language={language}
              setLanguage={setLanguage}
            />
          }
        >
          {children}
        </AppShell>
      )}
    </>
  );
}
