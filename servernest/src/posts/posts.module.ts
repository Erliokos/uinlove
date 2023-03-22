import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entites/post.entity';
import { PostsService } from './services/posts.service';
import { PostsResolver } from './resolver/posts.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  providers: [PostsService, PostsResolver],
})
export class PostsModule {}
