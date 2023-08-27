import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile
} from "@nestjs/common";
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { CurrentUser } from "../common/decorators";
import { JwtAuthGuard } from "../common/guards/jwt.auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express} from "express";
import { MulterFile } from 'multer';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() createReviewDto: CreateReviewDto,
         @CurrentUser('id') userId: string,
          @UploadedFile() file: MulterFile,
               ) {
    return this.reviewService.createReview(userId, createReviewDto, file);
  }

  @Get()
  findAll(@Param('productId') productId: string) {
    return this.reviewService.getReviews(productId);
  }

}
