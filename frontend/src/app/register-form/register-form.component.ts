import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../services/user.service';
import { passwordMatchValidator } from '../shared/password-match.directive';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  registerForm!: FormGroup;
  serverError: string | null = null;

  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        title: [''],
        telephone: [''],
        aboutMe: [''],
        city: ['', Validators.required],
        state: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validators: passwordMatchValidator },
    );
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.userService.registerUser(this.registerForm.value).subscribe(
        (response) => {
          console.log('User registered successfully', response);
          this.registerForm.reset();
          this.serverError = null;
        },
        (error) => {
          console.error('User registration failed:', error);
          if (
            error.status === 400 &&
            error.error.error === 'Email is already in use'
          ) {
            this.serverError = 'Email is already in use';
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
    private userService: UserService,
  ) {
    this.createRegisterForm();
  }
}
