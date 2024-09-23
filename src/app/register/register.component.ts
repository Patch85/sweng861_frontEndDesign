import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { RegisterFormComponent } from '../register-form/register-form.component';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CardComponent, RegisterFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  CardComponent = CardComponent;
  RegisterFormComponent = RegisterFormComponent;
}
