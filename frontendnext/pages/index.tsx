import { Auth } from "@/components/Auth/Auth";
import { authorization } from "@/components/Auth/authorization";
import { NavbarMinimal } from "@/components/NavbarLink/NavbarLink";
import { UserEntity } from "@/generated/operations";
import { useEffect, useState } from "react";

export default function Home() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  const [user, setUser] = useState<Partial<UserEntity & { Languge: string }> | null>(null);

  console.log(user);
  
  const userdata = authorization.getCurrentUser();

  useEffect(() => {
    setUser(userdata);
  }, [userdata]);

  if(user === null) return <>{hydrated && <Auth setUser={setUser} />}</>;

  return <>{hydrated && <NavbarMinimal />}</>;
}
