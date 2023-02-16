import React from 'react'
import { IActions } from './types'
import * as Styled from './Style'
import { Action } from '../../ui-kit/MainButton/components/Action/Action'
import { ELanguage, EName, Language } from '../../type'

type TMainModals = Styled.TModalsBody & {
  actions?: IActions[]
  bottom?: boolean
  name: EName
}

export function MainModals({actions, bottom, name}: TMainModals) {

  return (
    <Styled.ModalsBody>
      <Styled.DefaultHeader>{Language[ELanguage.Russian][name]}</Styled.DefaultHeader>
      {actions?.length && <Action actions={actions} bottom={bottom}/>}
    </Styled.ModalsBody>
  )
}
