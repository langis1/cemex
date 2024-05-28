import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrdersState } from '../../models/state.models';

export const ordersStateFeatureKey = 'ordersState';
export const selectOrdersState =
  createFeatureSelector<OrdersState>(ordersStateFeatureKey);

// order list
export const selectOrderList = createSelector(
  selectOrdersState,
  state => state?.orderList,
);

export const selectOrderListLoading = createSelector(
  selectOrdersState,
  state => state?.orderListLoading,
);

export const selectOrderListError = createSelector(
  selectOrdersState,
  state => state?.orderListError,
);
