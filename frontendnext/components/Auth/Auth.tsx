import { useAuthLazyQuery } from "@/generated/hooks";
import { UserEntity } from "@/generated/operations";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ISignIn, SignIn } from "./Authentication/SignIn";
import { ISignUp, SignUp } from "./Authentication/SignUp";
import { authorization } from "./authorization";

interface Props {
  setUser: Dispatch<SetStateAction<Partial<UserEntity & { Languge: string }> | null>>;
}

export function Auth({ setUser }: Props) {
  const [signMode, setSignMode] = useState<boolean>(true);

  const [authQuery] = useAuthLazyQuery();

  const onSubmitSignIn: ISignIn["onSubmit"] = async (data, setError) => {
    try {
      const { data: userData } = await authQuery({ variables: { args: data } });
      
      if (userData?.auth.access_token) {
        authorization.setCurrentUser(data);
        authorization.setAuthorizationToken(userData.auth.access_token);
        authorization.setRefreshToken(userData.auth.refresh_token);
      }
      setUser(data);

    } catch (error) {
      console.log('error777');
      setError("email", { message: error as string });
    }


    
  };
  const onSubmitSignUp: ISignUp["onSubmit"] = async (data, setError) => {
    console.log(data);
  };

  return (
    <>
      {signMode && <SignIn onSubmit={onSubmitSignIn} onChangeSignMode={setSignMode} />}
      {!signMode && <SignUp onSubmit={onSubmitSignUp} onChangeSignMode={setSignMode} />}
    </>
  );
}
