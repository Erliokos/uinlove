import { CreatePost } from "@/components/Posts/CreatePost/CreatePost";
import { Posts } from "@/components/Posts/Posts";
import { Container, Group } from "@mantine/core";

export default function Home() {
  return (
    <Container  size={"xl"}>
      <Container size={"xl"} p={"xs"}  m={"xs"}>
        <CreatePost />
      </Container>
      <Group  spacing={20}>
        <Posts />
      </Group>
    </Container>
  );
}
