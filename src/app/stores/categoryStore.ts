import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Category } from "../models/category";

export default class CategoryStore {
  categoryList: Category[] = [];
  selectedCategory: Category | undefined = undefined;
  loading = false;
  loadingInitial = true;
  filterByBranchId: string | undefined = undefined;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.filterByBranchId,
      () => {
        this.clearAndLoad();
      }
    );
  }

  clearAndLoad() {
    this.categoryList = [];
    this.loadCategories();
  }

  setfilterByBranchId = (branchId: string | undefined) => {
    this.filterByBranchId = branchId;
  };

  get axiosParams() {
    const params = new URLSearchParams();
    if (this.filterByBranchId) params.append("branchId", this.filterByBranchId);
    return params;
  }

  loadCategories = async () => {
    this.loadingInitial = true;
    try {
      var result = await agent.Categories.list(this.axiosParams);
      this.categoryList = result;
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  fetchCategories = async () => {
    return await agent.Categories.list(this.axiosParams);
  }

  loadCategory = async (id: string) => {
    let category = this.getCategory(id);
    if (category) {
      this.selectedCategory = category;
      return category;
    } else {
      this.loadingInitial = true;
      try {
        category = await agent.Categories.details(id);
        this.setCategory(category);
        runInAction(() => {
          this.selectedCategory = category;
          this.loadingInitial = false;
        });
        return category;
      } catch (error) {
        console.log(error);
        runInAction(() => (this.loadingInitial = false));
      }
    }
  };

  private setCategory = (category: Category) => {
    this.selectedCategory = category;
  };

  private getCategory = (id: string) => {
    return this.categoryList.find((category) => category.id === id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  clearSelectedCategory = () => {
    this.selectedCategory = undefined;
  };
}
