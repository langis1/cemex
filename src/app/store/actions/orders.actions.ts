import { createAction, props } from '@ngrx/store';
import { Order } from '../../models/orders.models';

// list orders from server

export const listOrders = createAction('[App Component] List Orders');

export const listOrdersSuccess = createAction('[App Component] List Orders Success',
  props<{ list: Order[] }>());

export const listOrdersError = createAction('[App Component] List Orders Error');
