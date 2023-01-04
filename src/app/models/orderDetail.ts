import { Product } from "./product";

export class OrderDetail {
  productId: string;
  count: number;
  price: number;
  product: Product;

  constructor(product: Product) {
    this.productId = product.id;
    this.count = 1;
    this.price = product.price;
    this.product = product;
  }
}
