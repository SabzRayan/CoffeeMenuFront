import { createContext, useContext } from "react";
import BranchStore from "./branchStore";
import CategoryStore from "./categoryStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import ProductStore from "./productStore";

interface Store {
  commonStore: CommonStore;
  modalStore: ModalStore;
  categoryStore: CategoryStore;
  productStore: ProductStore;
  branchStore: BranchStore;
}

export const store: Store = {
  commonStore: new CommonStore(),
  modalStore: new ModalStore(),
  categoryStore: new CategoryStore(),
  productStore: new ProductStore(),
  branchStore: new BranchStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
