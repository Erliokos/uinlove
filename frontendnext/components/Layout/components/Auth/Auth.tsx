import React, { Dispatch, SetStateAction, useState } from "react";
import { useAuthQuery, useCreateUserMutation } from "@/generated/hooks";
import { ISignIn, SignIn } from "./Authentication/SignIn";
import { ISignUp, SignUp } from "./Authentication/SignUp";
import { authorization } from "../../../../client/authorization";
import { useTranslate } from "../../../../client/Language/Language";
import { ColorScheme, Language } from "@/generated/operations";

interface Props {
  setUserToken: Dispatch<SetStateAction<string | null>>;
}

export function Auth({ setUserToken }: Props) {

  const TXT = useTranslate();

  const [signMode, setSignMode] = useState<boolean>(true);

  const { refetch } = useAuthQuery({ skip: true });
  const [createUser] = useCreateUserMutation();

  const onSubmitSignIn: ISignIn["onSubmit"] = async (data, setError, isMemoryUser) => {
    try {
      const {
        data: { auth: user },
      } = await refetch({ args: data });
      if (user.access_token) {
        const { email, name, colorScheme, language } = user;
        authorization.setCurrentUser({ email, name });
        authorization.setAuthorizationToken(user.access_token);
        if (language) authorization.setCurrentLanguage(language);
        if (colorScheme) authorization.setCurrentTheme(colorScheme);
        if (isMemoryUser) {
          authorization.setRefreshToken(user.refresh_token);
        }
        setUserToken(authorization.getCurrentToken());
      }
    } catch (error) {
      setError("email", { message: TXT.InvalidUserInput });
      setError("password", { message: TXT.InvalidUserInput });
    }
  };

  const onSubmitSignUp: ISignUp["onSubmit"] = async (data, setError, isMemoryUser) => {
    try {
      const { data: createData } = await createUser({ variables: { args: data } });
      const user = createData?.createUser;
      if (user?.access_token) {
        const { email, name } = user;
        authorization.setCurrentUser({ email, name });
        authorization.setAuthorizationToken(user.access_token);
        if (isMemoryUser) {
          authorization.setRefreshToken(user.refresh_token);
        }
        setUserToken(authorization.getCurrentToken());
      }
    } catch (error) {
      setError("name", { message: TXT.InvalidUserInput });
      setError("email", { message: TXT.InvalidUserInput });
      setError("password", { message: TXT.InvalidUserInput });
      setError("cPassword", { message: TXT.InvalidUserInput });
    }
  };

  return (
    <>
      {signMode && <SignIn onSubmit={onSubmitSignIn} onChangeSignMode={setSignMode} />}
      {!signMode && <SignUp onSubmit={onSubmitSignUp} onChangeSignMode={setSignMode} />}
    </>
  );
}
