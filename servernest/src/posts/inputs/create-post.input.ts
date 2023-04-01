import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
  name: string;

  @Field()
  text: string;

  @Field()
  author_id: number;
}
