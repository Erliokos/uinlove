import React from 'react'
import { IActions } from '../../../../Modals/MainModals/types'
import { MainButton } from '../../MainButton'
import * as Styled from './Style'

type TActions = {
  actions: IActions[]
  bottom?: boolean
}

export function Action({actions, bottom}: TActions ) {
  return (
    <Styled.ActionsBody bottom={bottom}>
      {actions.map(item => <MainButton {...item}/>)}
    </Styled.ActionsBody>
  )
}
