import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class ThemeInput {
  @Field(() => ID)
  id: number;

  @Field()
  colorScheme: string;
}
