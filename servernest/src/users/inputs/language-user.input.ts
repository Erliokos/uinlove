import { Field, ID, InputType } from '@nestjs/graphql';
import { Language } from '../entities/user.entity';

@InputType()
export class LanguageInput {
  @Field(() => ID)
  id: number;

  @Field()
  language: Language;
}
