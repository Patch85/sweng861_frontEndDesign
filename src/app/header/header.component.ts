import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpa } from '@fortawesome/free-solid-svg-icons';
import { HeaderNavComponent } from '../header-nav/header-nav.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, HeaderNavComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  faSpa = faSpa;
  HeaderNavComponent = HeaderNavComponent;
}
