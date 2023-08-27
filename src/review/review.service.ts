import { Injectable } from "@nestjs/common";
import { CreateReviewDto } from "./dto/create-review.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Review } from "./entities/review.entity";
import { Repository } from "typeorm";
import { FitEnum } from "../common/enums/fit.enum";
import { S3 } from "aws-sdk";
import { ConfigService } from "@nestjs/config";
import { v4 as uuid } from 'uuid';
import PublicFile from "./entities/publicFiles.entity";

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private readonly reviewRepository: Repository<Review>,
    private readonly configService: ConfigService,
    @InjectRepository(PublicFile) private readonly publicFileRepository: Repository<PublicFile>
  ) {
  }
  public async createReview(userId: string, createReviewDto: CreateReviewDto, file: Buffer) {
    const {author, productId,quality,rate,content,title, fileName} = createReviewDto;

    let uploadedImageUrl: string;
    if (file) {
      const uploadedFile = await this.uploadPublicFile(file,fileName);
      uploadedImageUrl = uploadedFile.url;
    }
    try {
      const review = await this.reviewRepository.create({
        fit: FitEnum.FIT,
        quality,
        rate,
        title,
        content,
        author,
        user: { id: userId},
        product: {id: productId},
        imageUrl: uploadedImageUrl
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


  private async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    const s3 = new S3();
    const uploadResult = await s3.upload({
      Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
      Body: dataBuffer,
      Key: `${uuid()}-${filename}`

    })
      .promise();

    const newFile = this.publicFileRepository.create({
      key: uploadResult.Key,
      url: uploadResult.Location
    });

    await this.publicFileRepository.save(newFile);
    return newFile;
  }

}
