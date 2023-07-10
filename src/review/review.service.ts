import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Review } from "./entities/review.entity";
import { Repository } from "typeorm";

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private readonly reviewRepository: Repository<Review>,
  ) {
  }
  public async createReview(userId: string, productId : string, createReviewDto: CreateReviewDto) {
    try {
      const review = await this.reviewRepository.create({
        ...createReviewDto,
        product: { id : createReviewDto.productId},
        author: { id: createReviewDto.userId}
      });
      const newReview = await this.reviewRepository.save(review);
    } catch (e) {
      console.log('failed to create review ..', e.message());
    }
  }

  public async getReviews() {
    try {
      return await this.reviewRepository.find();
    } catch (e) {
      console.log('failed .. ', e.message());
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
