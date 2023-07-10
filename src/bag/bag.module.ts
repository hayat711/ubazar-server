import { Module } from '@nestjs/common';
import { BagService } from './bag.service';
import { BagController } from './bag.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Bag } from "./entities/bag.entity";
import { UserModule } from "../user/user.module";

@Module({
  controllers: [BagController],
  providers: [BagService],
  imports: [TypeOrmModule.forFeature([Bag]), UserModule],

})
export class BagModule {}
