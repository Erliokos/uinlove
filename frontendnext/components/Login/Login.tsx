import { useAuthQuery } from "@/generated/hooks";
import { AuthUserInput } from "@/generated/operations";
import React, { useState } from "react";
import * as Styled from "./Styles";

export function Login() {
  const [auth, setAuth] = useState<AuthUserInput>({ email: "", password: "" });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuth((prev) => ({ ...prev, email: e.target.value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuth((prev) => ({ ...prev, password: e.target.value }));
  };

  const { refetch: callLogin } = useAuthQuery({
    skip: true,
    onError: () => {
      console.log("onError");
    },
    onCompleted: (data) => {
      console.log(data);
    },
    
  });

  const handleSubmit = async () => {
    try {
      const data = await callLogin({
        args: auth,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Styled.LoginModals>
      <Styled.AuthContainer>
        <h1>АВТОРИЗАЦИЯ</h1>
        <Styled.Input
          type={"email"}
          placeholder={"LOGIN"}
          onChange={handleLoginChange}
        />
        <Styled.Input
          type={"password"}
          placeholder={"PASSWORD"}
          onChange={handlePasswordChange}
        />
        <Styled.Button onClick={handleSubmit} type={"submit"}>
          войти
        </Styled.Button>
      </Styled.AuthContainer>
    </Styled.LoginModals>
  );
}
