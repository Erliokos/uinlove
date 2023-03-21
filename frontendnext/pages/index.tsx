import { Auth } from "@/components/Auth/Auth";
import { authorization } from "@/client/authorization";
import { NavbarMinimal } from "@/components/NavbarLink/NavbarLink";
import { useEffect, useState } from "react";

export default function Home() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  const [userToken, setUserToken] = useState<string| null>(null);

  console.log(userToken);
  
  const userdata = authorization.getCurrentToken();

  useEffect(() => {    
    setUserToken(userdata);
  }, [userdata]);

  if(userToken === null) return <>{hydrated && <Auth setUserToken={setUserToken} />}</>;

  return <>{hydrated && <NavbarMinimal setUserToken={setUserToken} />}</>;
}
