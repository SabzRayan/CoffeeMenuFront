import { OrderDetail } from "./orderDetail";

export class Order {
  branchId: string;
  tableNumber: number;
  orderDetails: OrderDetail[];

  constructor(branchId: string, tableNumber: number) {
    this.branchId = branchId;
    this.tableNumber = tableNumber;
    this.orderDetails = [];
  }
}
