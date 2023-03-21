import { getTXT } from "@/components/Language/Language";
import { AuthUserInput } from "@/generated/operations";
import { Paper, TextInput, PasswordInput, Checkbox, Button, Title, Text, Anchor } from "@mantine/core";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm, UseFormSetError } from "react-hook-form";
import { useStyles } from "./useStyle";

export interface ISignIn {
  onSubmit: (data: AuthUserInput, setError: UseFormSetError<AuthUserInput>, isMemoryUser: boolean) => Promise<void>;
  onChangeSignMode: Dispatch<SetStateAction<boolean>>;
}

export function SignIn({ onSubmit, onChangeSignMode }: ISignIn) {
  const TXT = getTXT();

  const [isMemoryUser, setIsMemoryUser] = useState<boolean>(false);

  const { classes } = useStyles();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<AuthUserInput>({});

  return (
    <form className={classes.form} onSubmit={handleSubmit((data) => onSubmit(data, setError, isMemoryUser))}>
      <Paper className={classes.form} radius={0} p={20}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          UINLOVE
        </Title>

        <TextInput
          {...register("email", {
            required: TXT.RequiredToFill,
            validate: (val) => (/^\S+@\S+$/.test(val) ? true : TXT.InvalidEmail),
          })}
          label={TXT.EmailAddress}
          placeholder="hello@gmail.com"
          size="sm"
          error={errors.email?.message}
          required
        />
        <PasswordInput
          {...register("password", { required: TXT.RequiredToFill })}
          label={TXT.Password}
          placeholder={TXT.YourPassword}
          mt="md"
          size="sm"
          error={errors.password?.message}
          required
        />
        <Checkbox label={TXT.KeepMeLoggedIn} mt="xl" size="sm" onChange={() => setIsMemoryUser(prev => !prev)} />
        <Button fullWidth mt="xl" size="md" type={"submit"}>
          {TXT.Login}
        </Button>

        <Text ta="center" mt="md">
          <div>{TXT.DontHaveAnAccount}</div>
          <Anchor<"a"> href="#" weight={700} onClick={() => onChangeSignMode((prev) => !prev)}>
            {TXT.Register}
          </Anchor>
        </Text>
      </Paper>
    </form>
  );
}
