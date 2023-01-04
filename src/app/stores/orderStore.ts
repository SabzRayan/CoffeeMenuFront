import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { Order } from "../models/order";
import { store } from "./store";

export default class OrderStore {
  order: Order | null = null;
  hubConnection: HubConnection | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  createHubConnection = () => {
    if (store.cartStore.cart) {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl(import.meta.env.VITE_APP_ORDER_URL)
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      this.hubConnection
        .start()
        .catch((error) =>
          console.log("Error establishing the connection: ", error)
        );

      this.hubConnection.on("ChangeOrderStatus", (order: Order) => {
        runInAction(() => {
          this.order = order;
        });
      });
    }
  };

  stopHubConnection = () => {
    this.hubConnection
      ?.stop()
      .catch((error) => console.log("Error stopping connection: ", error));
  };

  placeOrder = async (branchId: string, tableNumber: number) => {
    this.order = new Order(branchId, tableNumber);
    this.order.orderDetails = store.cartStore.cart;
    try {
      await this.hubConnection?.invoke("PlaceOrder", this.order);
    } catch (error) {
      console.log(error);
    }
  };
}
