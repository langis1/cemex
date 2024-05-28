import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiCallsService } from '../../services/api-calls.service';
import { listOrders, listOrdersError, listOrdersSuccess } from '../actions/orders.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';

@Injectable()
export class OrdersEffects {
  // list orders
  listOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(listOrders),
      switchMap(() =>
        this.apiCallsService.listOrders().pipe(
          map((list) => listOrdersSuccess({ list })),
          catchError(() => of(listOrdersError()))
        )
      )
    )
  );

  constructor(
    private apiCallsService: ApiCallsService,
    private actions$: Actions,
  ) {}

}
