import React, { Dispatch, SetStateAction } from 'react';
import { Card, Text, Divider, Button, TextInput, Container } from "@mantine/core";
import { useTranslate } from '@/client/Language/Language';
import { useForm } from 'react-hook-form';
import { UserSettingsFragment } from '@/generated/operations';
import { useUpdateUserSettingsMutation } from '@/generated/hooks';
import { ApolloError, isApolloError } from '@apollo/client/errors';

interface SettingsEdit {
  user: UserSettingsFragment;
  onClose: () => void;
  setUser: Dispatch<SetStateAction<UserSettingsFragment | undefined>>;
}

export default function SettingsEdit({ onClose, user, setUser }: SettingsEdit) {
  const TXT = useTranslate();

  const [updateUserSettings] = useUpdateUserSettingsMutation({onCompleted: (data) => setUser(data.updateUser)});

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError
  } = useForm<UserSettingsFragment>({
    defaultValues: {
      email: user.email,
      name: user.name ?? "",
    },
  });

  const handleSave = async (data: UserSettingsFragment) => {
    try {
      await updateUserSettings({
        variables: { input: { ...data, id: user.id } },
      });
      onClose();
    } catch (error) {
      setError("email", error);
    }

  };

  return (
    <Container size={"sm"}>
      <Card p={"lg"}>
        <form onSubmit={handleSubmit(handleSave)}>
          <Text size={"sm"} fw={700}>
            {TXT.Settings}
          </Text>
          <Divider my={"sm"} />

          <TextInput
            {...register("email", {
              required: TXT.RequiredToFill,
              validate: (val) => (/^\S+@\S+$/.test(val) ? true : TXT.InvalidEmail),
            })}
            label={TXT.EmailAddress}
            placeholder="hello@gmail.com"
            size="xs"
            error={errors.email?.message}
            required
          />
          <Divider my={"sm"} />

          <TextInput
            {...register("name", {
              required: TXT.RequiredToFill,
            })}
            label={TXT.Name}
            placeholder={TXT.Name}
            size="xs"
            error={errors.name?.message}
            required
          />
          <Divider my={"sm"} />

          <Button mr={"xs"} size={"xs"} type={'submit'}>
            {TXT.Confirm}
          </Button>
          <Button size={"xs"} onClick={onClose}>
            {TXT.Cancel}
          </Button>
        </form>
      </Card>
    </Container>
  );
}
