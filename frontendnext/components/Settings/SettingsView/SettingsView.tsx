import { useTranslate } from "@/client/Language/Language";
import { Card, Text, Divider, Button, Container } from "@mantine/core";
import React from "react";

interface SettingsView {
  onEdit: () => void;
}

export const mokData = {
  id: "1",
  email: "albert.murzakov@gmail.com",
  name: "Альберт Мак Ерлиокос",
  age: 34,
};

export default function SettingsView({ onEdit }: SettingsView) {
  const TXT = useTranslate();
  return (
    <Container size={"sm"}>
      <Card p={"lg"}>
        <Text size={"sm"} fw={700}>
          {TXT.Settings}
        </Text>
        <Divider my={"sm"} />

        <Text size={"xs"}>{TXT.EmailAddress}</Text>
        <Text size={"sm"}>{mokData.email}</Text>
        <Divider my={"sm"} />

        <Text size={"xs"}>{TXT.Name}</Text>
        <Text size={"sm"}>{mokData.name}</Text>
        <Divider my={"sm"} />

        <Button mt={"sm"} size={"xs"} onClick={onEdit}>
          {TXT.Edit}
        </Button>
      </Card>
    </Container>
  );
}
