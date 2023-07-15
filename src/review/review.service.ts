import { Injectable } from "@nestjs/common";
import { CreateReviewDto } from "./dto/create-review.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Review } from "./entities/review.entity";
import { Repository } from "typeorm";
import { FitEnum } from "../common/enums/fit.enum";

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private readonly reviewRepository: Repository<Review>,
  ) {
  }
  public async createReview(userId: string, createReviewDto: CreateReviewDto) {
    const {author, productId,quality,rate,content,title} = createReviewDto;
    try {
      const review = await this.reviewRepository.create({
        fit: FitEnum.FIT,
        quality,
        rate,
        title,
        content,
        author,
        user: { id: userId},
        product: {id: productId}
      });

      const newReview = await this.reviewRepository.save(review);
      console.log('created review is ', newReview);
      return newReview;
    } catch (e) {
      console.log('failed to create review ..', e);
    }
  }

  public async getReviews(productId: string) {
    try {
      return await this.reviewRepository.find({
        where: {
          product: { id: productId}
        },
        order: {
          createdAt: 'DESC'
        }
      });

    } catch (e) {
      console.log('failed .. ', e);
    }
  }


}
