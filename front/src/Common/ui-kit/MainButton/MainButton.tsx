import React from 'react'
import { ELanguage, EName, Language } from '../../type'
import * as Styled from './Style'

type TMainButton = Styled.TButtonBody & {
  buttonName: EName
  onClick?: () => void
}

export function MainButton(props: TMainButton) {
  //подключить редакс или аналогию либо локал хост, для создания отображаемого языка
  return <Styled.ButtonBody {...props}>{Language[ELanguage.Russian][props.buttonName]}</Styled.ButtonBody>
}
