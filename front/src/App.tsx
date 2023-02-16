import React, { useState } from 'react'
import { MainModals } from './Common/Modals/MainModals/MainModals'
import { IActions } from './Common/Modals/MainModals/types'
import { EName } from './Common/type'

function App() {
  const [viewModal, setViewModal] = useState<boolean>(true)
  const actions: IActions[] = [
    {
      buttonName: EName.Create,
      onClick: () => {
        console.log('Create')
      }
    },
    {
      buttonName: EName.Cancel,
      onClick: handleClick
    }
  ]

  function handleClick () {
    setViewModal(prev => !prev)
  }

  return (
    <>
      <div onClick={handleClick}>{viewModal ? 'скрыть' : 'показать'}</div>
      {viewModal && <MainModals actions={actions} bottom name={EName.SignIn} />}
    </>
  )
}

export default App
