import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Pagination, PagingParams } from "../models/pagination";
import { Product } from "../models/product";

export default class ProductStore {
  productList: Product[] = [];
  bestProductList: Product[] = [];
  selectedProduct: Product | undefined = undefined;
  loading = false;
  loadingInitial = true;
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();
  filterByCategoryId: string | undefined = undefined;
  filterBySearchTitle: string | undefined = undefined;
  filterByBranchId: string | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
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
    if (this.filterBySearchTitle) this.filterBySearchTitle = undefined;
    if (this.filterByCategoryId != categoryId)
      this.filterByCategoryId = categoryId;
    this.clearAndLoad();
  };

  setFilterBySearchTitle = (search: string | undefined) => {
    if (this.filterByCategoryId) this.filterByCategoryId = undefined;
    if (this.filterBySearchTitle != search) this.filterBySearchTitle = search;
    this.clearAndLoad();
  };

  setFilterByBranchId = (branchId: string | undefined) => {
    this.filterByBranchId = branchId;
  };

  get axiosParams() {
    const params = new URLSearchParams();
    params.append("pageNumber", this.pagingParams.pageNumber.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    if (this.filterByCategoryId)
      params.append("categoryId", this.filterByCategoryId);
    if (this.filterBySearchTitle)
      params.append("title", this.filterBySearchTitle);
    return params;
  }

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination;
  };

  loadProducts = async () => {
    this.loadingInitial = true;
    try {
      var result = await agent.Products.list(this.axiosParams);
      result.data.forEach((product) => {
        this.productList.push(product);
      });
      this.setPagination(result.pagination);
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadBestProducts = async (branchId: string) => {
    this.loading = true;
    const params = new URLSearchParams();
    params.append("branchId", branchId);
    try {
      var result = await agent.Products.best(params);
      this.bestProductList = result;
      this.setLoading(false);
    } catch (error) {
      console.log(error);
      this.setLoading(false);
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

  setLoading = (state: boolean) => {
    this.loading = state;
  };

  clearSelectedProduct = () => {
    this.selectedProduct = undefined;
  };
}
