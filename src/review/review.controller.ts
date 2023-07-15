import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { CurrentUser } from "../common/decorators";
import { JwtAuthGuard } from "../common/guards/jwt.auth.guard";

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createReviewDto: CreateReviewDto,
         @CurrentUser('id') userId: string,) {
    return this.reviewService.createReview(userId, createReviewDto);
  }

  @Get()
  findAll(@Param('productId') productId: string) {
    return this.reviewService.getReviews(productId);
  }

}
