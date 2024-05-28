import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [
    MatIcon,
  ],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent {
  @Input({ required: true }) public title!: string;
  @Input() public additionalInfo: string = '';
}
