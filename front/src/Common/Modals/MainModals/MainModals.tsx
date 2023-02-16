import React from 'react'
import { IActions } from './types'
import * as Styled from './Style'
import { Action } from '../../ui-kit/MainButton/components/Action/Action'
import { EName } from '../../type'

type TMainModals = Styled.TModalsBody & {
  actions?: IActions[]
  bottom?: boolean
  name?: EName
}

export function MainModals({actions, bottom}: TMainModals) {

  return (
    <Styled.ModalsBody>
      {actions?.length && <Action actions={actions} bottom={bottom}/>}
    </Styled.ModalsBody>
  )
}
