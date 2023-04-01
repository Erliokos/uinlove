import { authorization } from "@/client/authorization";
import { useTranslate } from "@/client/Language/Language";
import { useCreatePostMutation, useGetAllPostsQuery } from "@/generated/hooks";
import { CreatePostInput } from "@/generated/operations";
import { Button, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { CardWithStats } from "./CardWithStats";
import { CreatePostModal } from "./CreatePost/CreatePostModal";

export function Posts() {
  const { data } = useGetAllPostsQuery();

  const TXT = useTranslate();

  const [opened, { open, close }] = useDisclosure(false);

  const [createPost] = useCreatePostMutation();

  const handleSubmit = async (data: Omit<CreatePostInput, "author">) => {
    const user = authorization.getCurrentUser();
    if (!user?.id) return;
    try {
      await createPost({ variables: { args: { author_id: +user.id, name: data.name, text: data.text } } });
      close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CreatePostModal opened={opened} close={close} onSubmit={handleSubmit} />
      <Group m={'lg'} position="center">
        <Button size={"xs"} onClick={open}>
          {TXT.CreatePost}
        </Button>
      </Group>

      {data?.getAllPosts.map((item) => (
        <Group m={'lg'} position="center">
          <CardWithStats
            name={item.name}
            text={item.text}
            author_id={item.author_id}
            createAt={item.createAt}
            id={item.id}
            updateAt={item.createAt}
          />
        </Group>
      ))}
    </>
  );
}
