import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { OrdersState } from './models/state.models';
import { listOrders } from './store/actions/orders.actions';
import { OrdersFilterComponent } from './pages/orders-filter/orders-filter.component';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';
import { Observable } from 'rxjs';
import { Order } from './models/orders.models';
import {
  selectOrderList,
  selectOrderListError,
  selectOrderListLoading,
} from './store/selectors/orders.selectors';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { InfoComponent } from './pages/info/info.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OrdersFilterComponent, OrdersListComponent, AsyncPipe, MatProgressSpinner, MatIcon, InfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private store: Store<OrdersState> = inject(Store<OrdersState>);
  public orders$: Observable<Order[]> = new Observable<Order[]>();
  public ordersLoading$: Observable<boolean> = new Observable<boolean>();
  public ordersError$: Observable<boolean> = new Observable<boolean>();

  public ngOnInit() {
    this.store.dispatch(listOrders());
    this.orders$ = this.store.pipe(select(selectOrderList));
    this.ordersError$ = this.store.pipe(select(selectOrderListError));
    this.ordersLoading$ = this.store.pipe(select(selectOrderListLoading));
  }
}
