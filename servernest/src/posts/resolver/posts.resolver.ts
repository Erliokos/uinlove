import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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
  @Query(() => [PostEntity])
  async getAllPosts(): Promise<PostEntity[]> {
    return await this.postsService.getAllPosts();
  }
}
