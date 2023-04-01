import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from '../entites/post.entity';
import { CreatePostInput } from '../inputs/create-post.input';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async createPost(input: CreatePostInput): Promise<PostEntity> {
    return await this.postRepository.save(input);
  }

  async getAllPosts(): Promise<PostEntity[]> {
    return await this.postRepository.find();
  }
}
