import React from 'react';
import { MainModals } from './Common/Modals/MainModals/MainModals';
import { IActions } from './Common/Modals/MainModals/types';
import { EName } from './Common/type';

function App() {
  const actions: IActions[] = [
    {
      buttonName: EName.Create,
      onClick: ()=>{console.log('Create');
      }
    },
    {
      buttonName: EName.Cancel,
      onClick: ()=>{console.log('Cancel');
      }
    },
    {
      buttonName: EName.Cancel,
      onClick: ()=>{console.log('Cancel');
      }
    }
  ]
    
  
  return (
    <MainModals actions={actions} bottom/>
  );
}

export default App;
