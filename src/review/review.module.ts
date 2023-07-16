import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Review } from "./entities/review.entity";
import { AuthModule } from "../auth/auth.module";
import PublicFile from "./entities/publicFiles.entity";

@Module({
  controllers: [ReviewController],
  providers: [ReviewService],
  imports: [TypeOrmModule.forFeature([Review, PublicFile]), AuthModule],
})
export class ReviewModule {}
