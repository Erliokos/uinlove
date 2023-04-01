import { PostEntity } from "@/generated/operations";
import { Card, Text } from "@mantine/core";
import { useStyles } from "./useStyles";

export function CardWithStats({ name, text, author_id }: PostEntity) {
  const { classes } = useStyles();

  return (
    <Card withBorder padding="lg" className={classes.card}>
      <Text mt="sm" fw={700} className={classes.title}>
        {name}
      </Text>
      <Text mt="sm" fz="xs">
        {"Author"}
      </Text>
      <Text fz="sm" fw={700} className={classes.title}>
        {author_id}
      </Text>
      <Text mt="sm" mb="md" fz="xs">
        {text}
      </Text>
    </Card>
  );
}
