export interface Order {
  status: string;
  order_number: string;
  product_line: string;
  product: string;
  quantity: string;
  date_requested: string;
}

export enum OrderStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
}

export enum OrderProductLine {
  READY_MIX = 'Ready-Mix',
  CEMENT = 'Cement',
  AGGREGATES = 'Aggregates',
}

export interface OrderFilter {
  status: OrderStatus[];
  order_number: string;
  product_line: OrderProductLine[];
  date_from: string;
  date_to: string;
}
