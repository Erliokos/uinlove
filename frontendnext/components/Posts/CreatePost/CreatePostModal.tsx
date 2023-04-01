import { Button, Modal, Paper, TextInput, Textarea } from "@mantine/core";
import { useTranslate } from "@/client/Language/Language";
import { useForm } from "react-hook-form";
import { CreatePostInput } from "@/generated/operations";
import { useStyles } from "../useStyles";

interface Props {
  opened: boolean;
  close: () => void;
  onSubmit: (data: Omit<CreatePostInput, 'author'>) => void;
}

export function CreatePostModal({ opened, close, onSubmit }: Props) {
  const TXT = useTranslate();

  const { classes } = useStyles();

  const {
    handleSubmit,
    register,
  } = useForm<Omit<CreatePostInput, 'author'>>({});

  return (
    <>
      <Modal opened={opened} onClose={close} title={TXT.CreatePost} centered>
        <form className={classes.card} onSubmit={handleSubmit(onSubmit)}>
          <Paper className={classes.card} radius={0} p={20}>
            <TextInput
              {...register("name", {
                required: TXT.RequiredToFill,
              })}
              label={TXT.TitleOfThePublication}
              size="sm"
              required
            />
            <Textarea
              {...register("text", {
                required: TXT.RequiredToFill,
              })}
              label={TXT.TextOfThePublication}
              radius="xs"
              size="sm"
              withAsterisk
            />

            <Button fullWidth mt="xl" size="md" type={"submit"}>
              {TXT.Create}
            </Button>
          </Paper>
        </form>
      </Modal>
    </>
  );
}
