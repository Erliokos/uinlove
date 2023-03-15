import styled from "styled-components";

export const LoginModals = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AuthContainer = styled.div`
  width: 400px;
  height: 300px;
  background-color: darkgray;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 16px;
  color: #fff;
`;

export const Input = styled.input`
  margin-top: 24px;
  background: #00aec9;
  color: #fff;
  cursor: pointer;
  text-transform: uppercase;
  width: 100%;
  border-radius: 5px;
  height: 35px;
  border-color: transparent;
  box-shadow: 0px;
  outline: none;
  transition: 0.15s;
  text-align: center;
  &:active {
    background-color: #f1ac15;
  }
  `;

  export const Button = styled.button`
  margin-top: 24px;
  background: #00aec9;
  color: #fff;
  border-radius: 5px;
  width: 60px;
  height: 35px;
  outline: none;
  border-color: transparent;
  transition: 0.15s;
  text-align: center;
  &:active {
    background-color: #f1ac15;
  }
  `;
