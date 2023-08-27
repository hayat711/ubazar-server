import { Get, Injectable } from "@nestjs/common";
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";
import { CategoryService } from "../category/category.service";
import { productData } from "./myNewData";
import { Category } from "../category/entities/category.entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
  ) {
  }
  async create(createProductDto: CreateProductDto) {
    const product = await this.productRepository.create(createProductDto);
    await this.productRepository.save(product);
    return product;
  }

  public async findAll() {
    try {

    const products = await this.productRepository.find({
      relations: ['category']
    });
    console.log('top 20 products: => ', products);
    return products;
    }
    catch (e) {
      console.error(e);
    }
  }

  async seedProducts(): Promise<void> {
    await Promise.all(
      productData.map(async (product) => {

        const category = await this.categoryRepository.findOneOrFail({
          where: {
            categoryId: product.categoryId
          }
        });

        const newProduct = this.productRepository.create({
          categoryId: category.categoryId,
          name: product.name,
          description: product.description,
          price: product.price,
          link: product.link,
          color: product.color,
          quantity: product.quantity,
          category: category,
          categoryName: category.name,
        });

        await this.productRepository.save(newProduct);
      })
    )
  }

  // async findByCategory(categoryId: string) : Promise<Product[]>{
  //   const products = this.productRepository.find({
  //     where: {
  //       category: {
  //         id: categoryId
  //       }
  //     },
  //     relations: ['category'],
  //   });
  //
  //   return products
  // }

  public async findOne(productId: string) {
    return await this.productRepository.findOne({
      where: {
        id: productId
      }
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  public async getProductByCategory(cat_id : string): Promise<Product[]> {
   const products = await this.productRepository.find({
     where: {
       categoryId: cat_id
     }
   })
    return products;
  }

  public async getProductsByCategoryName(cat_name: string) : Promise<Product[]> {
    const products = await this.productRepository.find({
      where: {
        categoryName: cat_name,
      }
    });
    return products
  }

  // public async populateCategoryName(): Promise<void> {
  //   const products = await this.productRepository
  //     .createQueryBuilder('products')
  //     .leftJoinAndSelect('product.category', 'category')
  //     .select(['product.id', 'category.name'])
  //     .getMany();
  //
  //   for(const product of products) {
  //     product.categoryName = product.category.name;
  //     delete product.category;
  //     await this.productRepository.save(product);
  //   }
  // }


  /*
  public async insertProduct() {
    get all categories from db
    const categories = await this.categoryService.findAll();

    map categorie to an object where key is category id and value is object
    const categoryMap = categories.reduce(
      (map, category) => ({ ...map, [category.id]: category }),
      {},
    );

    Map product data to an array of Product entities
    const products = productData.map(
      ({ id, name, description, price, link, color, quantity, categoryId, createdAt }) => {
        const product = new Product();
        product.id = id;
        product.name = name;
        product.description = description;
        product.price = price;
        product.link = link;
        product.color = color;
        product.quantity = quantity;
        product.category = categoryMap[categoryId];
        product.createdAt = new Date(createdAt);
        return product;
      },
    );

    // Insert products into the database
    await this.productRepository.insert(products);
    console.log('data is inserted');

  }

  async get12ProductsFromDifferentCategories(): Promise<Product[]> {
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    // Group by category and select one product from each category
    queryBuilder.groupBy('product.categoryId')
      .select('product.id')
      .addSelect('product.name')
      .addSelect('product.description')
      .addSelect('product.price')
      .addSelect('product.link')
      .addSelect('product.color')
      .addSelect('product.quantity')
      .addSelect('product.categoryId')
      .addSelect('product.categoryName')
      .addSelect('MAX(product.createdAt)', 'createdAt')
      .limit(12);

    const products = await queryBuilder.getMany();
    console.log('top 12 products => ', products)
    return products;
  }
  */
}
