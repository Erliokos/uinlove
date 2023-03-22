import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, Button } from "@mantine/core";
import { useTranslate } from "@/client/Language/Language";

export function CreatePost() {
  const [opened, { open, close }] = useDisclosure(false);

  const TXT = useTranslate();

  return (
    <>
      <Modal opened={opened} onClose={close} title={TXT.CreatePost} centered>
        {/* Modal content */}
      </Modal>

      <Group position="center">
        <Button onClick={open}>{TXT.CreatePost}</Button>
      </Group>
    </>
  );
}
