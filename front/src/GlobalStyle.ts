import  {createGlobalStyle} from "styled-components";
import { theme } from "./theme-styled";

export const Root = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 12px;
    font-family: Arial, Helvetica, sans-serif;
    color: ${theme.color.black.lightest};
  }
  body {
    overflow: hidden;
  }
`



