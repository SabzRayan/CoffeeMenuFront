import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Pagination, PagingParams } from "../models/pagination";
import { Product } from "../models/product";

export default class ProductStore {
  productList: Product[] = [];
  selectedProduct: Product | undefined = undefined;
  loading = false;
  loadingInitial = true;
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();
  filterByCategoryId: string | undefined = undefined;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.filterByCategoryId,
      () => {
        this.clearAndLoad();
      }
    );
  }

  clearAndLoad() {
    this.pagingParams = new PagingParams();
    this.productList = [];
    this.loadProducts();
  }

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  };

  setFilterByCategoryId = (categoryId: string | undefined) => {
    this.filterByCategoryId = categoryId;
  };

  get axiosParams() {
    const params = new URLSearchParams();
    if (this.filterByCategoryId)
      params.append("categoryId", this.filterByCategoryId);
    return params;
  }

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination;
  };

  loadProducts = async () => {
    this.loadingInitial = true;
    try {
      var result = await agent.Products.list(this.axiosParams);
      this.productList = result.data;
      this.setPagination(result.pagination);
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadProduct = async (id: string) => {
    let product = this.getProduct(id);
    if (product) {
      this.selectedProduct = product;
      return product;
    } else {
      this.loadingInitial = true;
      try {
        product = await agent.Products.details(id);
        this.setProduct(product);
        runInAction(() => {
          this.selectedProduct = product;
          this.loadingInitial = false;
        });
        return product;
      } catch (error) {
        console.log(error);
        runInAction(() => (this.loadingInitial = false));
      }
    }
  };

  private setProduct = (product: Product) => {
    this.selectedProduct = product;
  };

  private getProduct = (id: string) => {
    return this.productList.find((product) => product.id === id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  clearSelectedProduct = () => {
    this.selectedProduct = undefined;
  };
}
