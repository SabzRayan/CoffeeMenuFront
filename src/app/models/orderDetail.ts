import { Product } from "./product";
import { ProductPrice } from "./productPrice";

export class OrderDetail {
  productId: string;
  count: number;
  price: ProductPrice;
  product: Product;

  constructor(product: Product, price: ProductPrice) {
    this.productId = product.id;
    this.count = 1;
    this.price = price;
    this.product = product;
  }
}
