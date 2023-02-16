import styled from "styled-components";
import { theme } from "../../../theme-styled";

export type TModalsBody = {
  width?: number
  height?: number
  bgColor?: string
}

const DEFAULT_MODAL_SIZE = 500
export const DEFAULT_HEADER_HEIGHT = 49

export const ModalsBody = styled.div<TModalsBody>`
  position: absolute;
  left: ${({width}) => (window.innerWidth/2)-(width ?? DEFAULT_MODAL_SIZE)/2};
  top: ${({height}) => (window.innerHeight/2)-(height ?? DEFAULT_MODAL_SIZE)/2};
  background-color: ${({bgColor})=> bgColor ?? theme.color.gray.base};
  width: ${({width})=> width ?? DEFAULT_MODAL_SIZE}px;
  height: ${({height})=> height ?? DEFAULT_MODAL_SIZE}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border-radius: 3px;
`
export const DefaultHeader = styled.div<{bgColor?: string}>`
  position: absolute;
  background-color: ${({bgColor}) => bgColor ?? theme.color.black.light};
  color: ${theme.color.gray.light};
  font-size: medium;
  height: ${DEFAULT_HEADER_HEIGHT}px;
  width: 100%;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px 3px 0 0;
`
