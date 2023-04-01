import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/users/guard/jwt.guard';
import { PostEntity } from '../entites/post.entity';
import { CreatePostInput } from '../inputs/create-post.input';
import { PostsService } from '../services/posts.service';

@Resolver('Post')
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => PostEntity)
  async createPost(@Args('input') input: CreatePostInput): Promise<PostEntity> {
    return this.postsService.createPost(input);
  }

  @UseGuards(AuthorizationGuard)
  @Query(() => [PostEntity])
  async getAllPosts(): Promise<PostEntity[]> {
    return await this.postsService.getAllPosts();
  }
}
