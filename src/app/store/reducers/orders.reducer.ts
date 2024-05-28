import { createReducer, on } from '@ngrx/store';
import { OrdersState } from '../../models/state.models';
import { listOrders, listOrdersError, listOrdersSuccess } from '../actions/orders.actions';


export const initialState: OrdersState = {
  orderList: [],
  orderListLoading: false,
  orderListError: false,
};

export const ordersReducer = createReducer(
  initialState,

  // list orders
  on(listOrders, (state) => ({
    ...state,
    orderListLoading: true,
  })),
  on(listOrdersSuccess, (state, action) => ({
    ...state,
    orderList: action.list,
    orderListLoading: false,
  })),
  on(listOrdersError, (state) => ({
    ...state,
    orderListLoading: false,
    orderListError: true,
  })),
);
