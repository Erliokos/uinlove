import styled from "styled-components";
import { theme } from "../../../../../theme-styled";
import { DEFAULT_HEADER_HEIGHT } from "../../../../Modals/MainModals/Style";

export type TActionsBody = {
  height?: number
  bottom?: boolean
  bgColor?: string
}



export const ActionsBody = styled.div<TActionsBody>`
  position: absolute;
  ${({bottom}) => bottom ? 'bottom: 0;' : `top: ${DEFAULT_HEADER_HEIGHT};`}
  background-color: ${({bgColor}) => bgColor ?? theme.color.gray.light};
  width: 100%;
  height: ${({height})=>height ?? 49}px;
  display: flex;
  align-items: center;
  padding: 8px;
  > *:not(:last-child) {
    margin-right: 8px;
  }
`
