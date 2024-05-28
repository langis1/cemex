import { Order } from './orders.models';

export interface OrdersState {
  orderList: Order[];
  orderListLoading: boolean;
  orderListError: boolean;
}
