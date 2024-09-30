import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  loginForm!: FormGroup;
  serverError: string | null = null;

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.authenticateUser(this.loginForm.value).subscribe(
        (response) => {
          console.log('User logged in successfully', response);
          this.loginForm.reset();
          this.serverError = null;
        },
        (error) => {
          console.error('User login failed:', error);
          if (
            (error.status === 401 && error.error.error === 'Invalid email') ||
            error.error.error === 'Invalid password'
          ) {
            this.serverError = error.error.error;
          } else {
            this.serverError =
              'An unexpected error occurred. Please try again later.';
          }
        },
      );
    }
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.createLoginForm();
  }
}
