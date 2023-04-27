import React from 'react';
import { Card, Text, Divider, Button, TextInput, Container } from "@mantine/core";
import { useTranslate } from '@/client/Language/Language';
import { useForm } from 'react-hook-form';
import { mokData } from '../SettingsView/SettingsView';

interface SettingsEdit {
  onClose: () => void
}

export default function SettingsEdit({ onClose }: SettingsEdit) {
  const TXT = useTranslate();

    const {
      handleSubmit,
      register,
      formState: { errors },
      setError,
    } = useForm<{email: string, name: string}>({defaultValues: {
      email: mokData.email,
      name: mokData.name
    }});
    
  return (
    <Container size={"sm"}>
      <Card p={"lg"}>
        <form>
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
            error={errors.email?.message}
            required
          />
          <Divider my={"sm"} />

          <Button mr={"xs"} size={"xs"} onClick={onClose}>
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
