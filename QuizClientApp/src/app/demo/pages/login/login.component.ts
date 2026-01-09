import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
 
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  showPassword = false;
  private _submitted = false;
  loading = false;
  serverError: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      saveCredentials: [false]
    });
  }
  create(): void {
    this.router.navigate(['/createsubject']);
  }
  submitted(): boolean {
    return this._submitted;
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  trackByIndex(index: number): number {
    return index;
  }

  getFieldErrors(field: string): string[] {
    const control = this.form.get(field);
    if (!control || !control.errors) {
      return [];
    }

    const errors: string[] = [];
    if (control.errors['required']) {
      errors.push('This field is required.');
    }
    if (control.errors['minlength']) {
      const req = control.errors['minlength'].requiredLength;
      errors.push(`Minimum length is ${req} characters.`);
    }
    if (control.errors['email']) {
      errors.push('Please enter a valid email address.');
    }
    return errors;
  }

  login(): void {
    this._submitted = true;
    this.serverError = null;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const { userName, password } = this.form.value;

    this.userService.login(userName, password).subscribe({
      next: () => {
        this.loading = false;
        // navigate to protected area
        this.router.navigate(['/organization']).catch(() => location.assign('/organization'));
      },
      error: (err) => {
        this.loading = false;
        // better error handling can be added; show friendly message
        this.serverError = err?.error?.message ?? err?.message ?? 'Login failed. Please try again.';
        console.error('Login error', err);
      }
    });
  }
}
