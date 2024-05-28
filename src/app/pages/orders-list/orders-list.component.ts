import { Component, Input, OnInit } from '@angular/core';
import { combineLatest, Observable, startWith, Subject, switchMap } from 'rxjs';
import { Order, OrderFilter, OrderProductLine, OrderStatus } from '../../models/orders.models';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { OrdersFilterComponent } from '../orders-filter/orders-filter.component';
import { InfoComponent } from '../info/info.component';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [
    AsyncPipe,
    MatProgressSpinner,
    DatePipe,
    OrdersFilterComponent,
    InfoComponent,
  ],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss'
})
export class OrdersListComponent implements OnInit {
  @Input({ required: true }) public orders$: Observable<Order[]> = new Observable<Order[]>();
  public filteredOrders$: Observable<Order[]> = new Observable<Order[]>();
  public orderFilter$ = new Subject<OrderFilter>();

  public ngOnInit() {
    this.filteredOrders$ = combineLatest([
      this.orders$,
      this.orderFilter$.pipe(startWith({} as OrderFilter))
    ]).pipe(
      switchMap(([orders, filter]) => {
        return this.applyFilter(orders, filter);
      })
    );
  }

  private applyFilter(orders: Order[], filter: OrderFilter): Observable<Order[]> {
    return new Observable((observer) => {
      const filtered = orders.filter(order => {
        const statusMatch = !filter.status?.length || filter.status.includes(order.status as OrderStatus);
        const orderNumberMatch = !filter.order_number || order.order_number.startsWith(filter.order_number);
        const productLineMatch = !filter.product_line?.length || filter.product_line.includes(order.product_line as OrderProductLine);
        const dateFromMatch = !filter.date_from || new Date(order.date_requested) >= new Date(filter.date_from);
        const dateToMatch = !filter.date_to || new Date(order.date_requested) <= new Date(filter.date_to);

        return statusMatch && orderNumberMatch && productLineMatch && dateFromMatch && dateToMatch;
      });

      observer.next(filtered);
      observer.complete();
    });
  }
}
