import { useTranslate } from "@/client/Language/Language";
import { CreateUserInput } from "@/generated/operations";
import { Paper, TextInput, PasswordInput, Checkbox, Button, Title, Text, Anchor } from "@mantine/core";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm, UseFormSetError } from "react-hook-form";
import { useStyles } from "./useStyle";

export interface ISignUp {
  onSubmit: (data: CreateUserInput, setError: UseFormSetError<CreateUserInput>, isMemoryUser: boolean) => Promise<void>;
  onChangeSignMode: Dispatch<SetStateAction<boolean>>;
}

export function SignUp({ onSubmit, onChangeSignMode }: ISignUp) {
  const TXT = useTranslate();

  const [isMemoryUser, setIsMemoryUser] = useState<boolean>(false);

  const { classes } = useStyles();

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    setError
  } = useForm<CreateUserInput & { cPassword: string }>({});

  return (
    <form className={classes.form} onSubmit={handleSubmit((data) => onSubmit(data, setError, isMemoryUser))}>
      <Paper className={classes.form} radius={0} p={20}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          UINLOVE
        </Title>
        <TextInput
          {...register("name", { required: TXT.RequiredToFill })}
          label={TXT.Name}
          placeholder={TXT.Name}
          size="sm"
          error={errors.name?.message}
        />
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
        <PasswordInput
          {...register("cPassword", {
            required: TXT.RequiredToFill,
            validate: (value) => {
              const isValid = value === getValues("password");
              if (!isValid) return TXT.YourPasswordsDoNoMatch;
              return isValid;
            },
          })}
          label={TXT.RepeatThePassword}
          placeholder={TXT.RepeatPassword}
          mt="md"
          size="sm"
          error={errors.cPassword?.message}
          required
        />
        <Checkbox label={TXT.KeepMeLoggedIn} mt="xl" size="sm" onChange={() => setIsMemoryUser((prev) => !prev)} />
        <Button fullWidth mt="xl" size="md" type={"submit"}>
          {TXT.SignUp}
        </Button>

        <Text ta="center" mt="md">
          <Anchor<"a"> href="#" weight={700} onClick={() => onChangeSignMode((prev) => !prev)}>
            {TXT.SignIn}
          </Anchor>
        </Text>
      </Paper>
    </form>
  );
}
