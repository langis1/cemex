import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { OrderFilter, OrderProductLine, OrderStatus } from '../../models/orders.models';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect, MatSelectTrigger } from '@angular/material/select';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-orders-filter',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCheckbox,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    MatSelectTrigger,
    MatInput,
    MatInputModule,
    MatIcon,
  ],
  templateUrl: './orders-filter.component.html',
  styleUrl: './orders-filter.component.scss'
})
export class OrdersFilterComponent implements OnInit {
  @Output() public filterResults$: EventEmitter<OrderFilter> = new EventEmitter<OrderFilter>();
  public orderStatusValues: OrderStatus[] = Object.values(OrderStatus);
  public orderProductLineValues: OrderProductLine[] = Object.values(OrderProductLine);

  public orderFilterForm = new FormGroup({
    status: new FormControl<OrderStatus[]>([]),
    product_line: new FormControl<OrderProductLine[]>([]),
    date_from: new FormControl<string>(''),
    date_to: new FormControl<string>(''),
    order_number: new FormControl<string>(''),
  })

  public ngOnInit() {
    this.orderFilterForm.valueChanges.subscribe(() => {
      console.log(this.orderFilterForm.value);
      this.filterResults$.emit({
        ...this.orderFilterForm.value as OrderFilter,
      });
    });
  }

  public onCheckboxChange(event: MatCheckboxChange, value: OrderStatus) {
    const statusControl = this.orderFilterForm.controls.status;
    let statusValue: OrderStatus[] = [];
    if (statusControl?.value instanceof Array) {
      statusValue = statusControl.value;
    }
    if (event.checked) {
      statusValue.push(value);
    } else {
      statusValue = statusValue.filter(v => v !== value);
    }
    statusControl?.setValue(statusValue);
  }
}
