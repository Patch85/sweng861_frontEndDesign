import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  CardComponent = CardComponent;
}
