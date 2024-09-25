import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-header-nav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header-nav.component.html',
  styleUrl: './header-nav.component.css',
})
export class HeaderNavComponent {
  isAuthenticated = false;

  navLinks = [
    { url: '', label: 'Home' },
    { url: 'about', label: 'About' },
    { url: 'services', label: 'Services' },
    { url: 'contact', label: 'Contact' },
  ];

  navGuestLinks = [
    { url: 'login', label: 'Sign In' },
    { url: 'register', label: 'Register' },
  ];

  navAuthenticatedLinks = [{ url: '/profile', label: 'Profile' }];
}
