import styled from "styled-components";
import { theme } from "../../../theme-styled";

export type TButtonBody = {
  width?: number
  height?: number
  bgColor?: number
  textColor?: string
  hoverBgColor?: string
  hoverTextColor?: string
}

const DEFAULT_BUTTON_WIDTH = 99
const DEFAULT_BUTTON_HEIGHT = 33


export const ButtonBody = styled.button<TButtonBody>`
  background-color: ${({ bgColor }) => bgColor ?? theme.color.black.light};
  color:${({ textColor }) => textColor ?? theme.color.gray.light};
  width: ${({ width }) => width ?? DEFAULT_BUTTON_WIDTH}px;
  height: ${({ height }) => height ?? DEFAULT_BUTTON_HEIGHT}px;
  outline: none;
  border: solid 0.5px ${theme.color.gray.base};
  border-radius: 3px;
  &:hover {
    background-color: ${({ hoverBgColor }) => hoverBgColor ?? theme.color.black.lightest};
    color: ${({ hoverTextColor }) => hoverTextColor ?? theme.color.white};
  }
  &:active {
    background-color: ${({ hoverBgColor }) => hoverBgColor ?? theme.color.pink.base};
    color: ${({ hoverTextColor }) => hoverTextColor ?? theme.color.gray.lightest};
  }

`
