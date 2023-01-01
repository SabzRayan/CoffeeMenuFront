import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Branch } from "../models/branch";

export default class BranchStore {
  selectedBranch: Branch | undefined = undefined;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  loadBranch = async (id: string) => {
    this.loadingInitial = true;
    try {
      let branch = await agent.Branches.details(id);
      this.setBranch(branch);
      runInAction(() => {
        this.selectedBranch = branch;
        this.loadingInitial = false;
      });
      return branch;
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loadingInitial = false));
    }
  };

  private setBranch = (branch: Branch) => {
    this.selectedBranch = branch;
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };
}
