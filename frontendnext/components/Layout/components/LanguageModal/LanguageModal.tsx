import { authorization } from '@/client/authorization';
import { useTranslate } from '@/client/Language/Language';
import { useChangeLanguageLazyQuery } from '@/generated/hooks';
import { Language } from '@/generated/operations';
import { Group, Modal, Radio, Divider } from '@mantine/core';
import React, { Dispatch, SetStateAction } from 'react';

interface Props {
  opened: boolean;
  close: () => void;
  onLanguageChange: Dispatch<SetStateAction<Language>>;
  language: Language
}

export default function LanguageModal({ opened, close, onLanguageChange, language }: Props) {
  const TXT = useTranslate();

  const [changeLanguage] = useChangeLanguageLazyQuery({fetchPolicy: 'no-cache'});

  const handleLanguageChange = async (value: Language) => {
    const user = authorization.getCurrentUser();
    if(user?.id) await changeLanguage({variables: {args: {id: user.id, language: value}}});
    authorization.setCurrentLanguage(value);
    onLanguageChange(value);
  };

  return (
    <Modal opened={opened} onClose={close} title={TXT.Language}  centered size='xl'>
      <Divider/>
      <Radio.Group onChange={handleLanguageChange} value={language}>
        <Group m="lg">
          <Radio value={Language.ENGLISH} label={'English'} />
        </Group>
        <Group m="lg">
          <Radio value={Language.RUSSIAN} label={'Русский'} />
        </Group>
      </Radio.Group>
    </Modal>
  );
}
