import React, { useState } from 'react';
import {useDisclosure} from '@mantine/hooks';
import SettingsView from '@/components/Settings/SettingsView/SettingsView';
import SettingsEdit from '@/components/Settings/SettingsEdit/SettingsEdit';
import { useUserSettingsQuery } from '@/generated/hooks';
import { authorization } from '@/client/authorization';
import { UserSettingsFragment } from '@/generated/operations';

export default function settings() {

const [opened, { open, close }] = useDisclosure(false);

const [user, setUser] = useState<UserSettingsFragment>();

const userId = authorization.getCurrentUserId();

useUserSettingsQuery({
  variables: { id: +userId },
  onCompleted: (data) => {
    setUser(data.getOneUser);
  }
});

  return (
    <>
      {!opened && user && <SettingsView onEdit={open} user={user} />}
      {opened && user && <SettingsEdit onClose={close} user={user} setUser={setUser} />}
    </>
  );
}
