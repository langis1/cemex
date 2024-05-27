import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/orders.models';

@Injectable({
  providedIn: 'root',
})
export class ApiCallsService {
  private http = inject(HttpClient);

  public getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`http://localhost:3000/orders`);
  }
}
