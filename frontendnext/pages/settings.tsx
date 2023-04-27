import React from 'react';
import {useDisclosure} from '@mantine/hooks';
import SettingsView from '@/components/Settings/SettingsView/SettingsView';
import SettingsEdit from '@/components/Settings/SettingsEdit/SettingsEdit';

export default function settings() {

const [opened, { open, close }] = useDisclosure(false);
  
  return (
    <>
      {!opened && <SettingsView onEdit={open} />}
      {opened && <SettingsEdit onClose={close} />}
    </>
  );
}
