// category.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ObjectIdColumn, JoinColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  categoryId: string;


  @Column()
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;


  @OneToMany(() => Product, product => product.category, {
    eager: true,
  })
  @JoinColumn({
    name: 'products'
  })
  products: Product[];



}
