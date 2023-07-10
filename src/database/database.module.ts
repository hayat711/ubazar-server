import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'hayatdb12',
    database: 'ubazar',
    autoLoadEntities: true,
    synchronize: true,
  })]
})
export class DatabaseModule {}