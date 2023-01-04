import { OrderDetail } from "./orderDetail";
import { OrderStatusEnum } from "./orderStatusEnum";

export class Order {
  branchId: string;
  tableNumber: number;
  status: OrderStatusEnum = OrderStatusEnum.Received;
  orderDetails: OrderDetail[];

  constructor(branchId: string, tableNumber: number) {
    this.branchId = branchId;
    this.tableNumber = tableNumber;
    this.orderDetails = [];
  }
}
