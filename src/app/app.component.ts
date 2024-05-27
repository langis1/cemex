import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiCallsService } from './services/api-calls.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public apiCallsService = inject(ApiCallsService);

  public ngOnInit() {
    this.apiCallsService.getOrders().pipe().subscribe(x => console.log(x));
  }
}
