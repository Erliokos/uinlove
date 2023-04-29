import { useTranslate } from "@/client/Language/Language";
import { UserSettingsFragment } from "@/generated/operations";
import { Card, Text, Divider, Button, Container } from "@mantine/core";
import React from "react";

interface SettingsView {
  user: UserSettingsFragment
  onEdit: () => void;
}

export default function SettingsView({ onEdit, user }: SettingsView) {
  const TXT = useTranslate();
  return (
    <Container size={"sm"}>
      <Card p={"lg"}>
        <Text size={"sm"} fw={700}>
          {TXT.Settings}
        </Text>
        <Divider my={"sm"} />

        <Text size={"xs"}>{TXT.EmailAddress}</Text>
        <Text size={"sm"}>{user.email}</Text>
        <Divider my={"sm"} />

        <Text size={"xs"}>{TXT.Name}</Text>
        <Text size={"sm"}>{user.name}</Text>
        <Divider my={"sm"} />

        <Button mt={"sm"} size={"xs"} onClick={onEdit}>
          {TXT.Edit}
        </Button>
      </Card>
    </Container>
  );
}
