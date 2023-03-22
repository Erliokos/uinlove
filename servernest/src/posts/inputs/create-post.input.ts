import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  text: string;

  @Field({ nullable: true })
  author: number;
}
