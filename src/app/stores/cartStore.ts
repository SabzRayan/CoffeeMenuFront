import { makeAutoObservable } from "mobx";
import { OrderDetail } from "../models/orderDetail";
import { Product } from "../models/product";
import { ProductPrice } from "../models/productPrice";

export default class CartStore {
  cart: OrderDetail[] = [];
  cartCount: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  loadCart = () => {
    let cartString = window.localStorage.getItem("cart");
    if (cartString) this.cart = JSON.parse(cartString);
    this.getCount();
  };

  addToCart = (product: Product, price: ProductPrice) => {
    let productIndex = this.cart.findIndex(
      (a) => a.productId == product.id && a.price == price
    );
    if (productIndex > -1) {
      this.cart[productIndex].count++;
    } else {
      this.cart.push(new OrderDetail(product, price));
      setTimeout(() => {
        this.loadCart();
      }, 500);
    }
    this.saveCart();
  };

  removeFromCart = (productId: string, price: ProductPrice) => {
    let productIndex = this.cart.findIndex(
      (a) => a.productId == productId && a.price == price
    );
    if (productIndex != null && productIndex > -1)
      this.cart.splice(productIndex, 1);
    this.saveCart();
  };

  changeCount = (productId: string, count: number, price: ProductPrice) => {
    if (count <= 0) {
      this.removeFromCart(productId, price);
    } else {
      let productIndex = this.cart.findIndex(
        (a) => a.productId == productId && a.price == price
      );
      if (productIndex != null && productIndex > -1) {
        let item = this.cart[productIndex];
        item.count = count;
        this.cart.splice(productIndex, 1, item);
      }
    }
    this.saveCart();
  };

  saveCart = () => {
    let cartString = JSON.stringify(this.cart);
    window.localStorage.setItem("cart", cartString);
    this.getCount();
  };

  getCount = () => {
    let count = 0;
    this.cart.forEach((a) => (count += a.count));
    this.cartCount = count;
  };
}
