import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, CommonModule],
   templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  loading = false;
  serverError: string | null = null;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      saveCredentials: [false]
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.serverError = null;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const { userName, password, saveCredentials } = this.form.value;

    this.userService.login(userName, password).subscribe({
      next: () => {
        this.loading = false;
        // navigate to analytics root after successful login
        //console.error('Login success');
      /*  this.router.navigateByUrl('/dashboard');*/
        this.router.navigateByUrl('/app/dashboard', { replaceUrl: true }).catch(err => {
          console.error('Navigation error', err);
        });
      },
      error: (err) => {
        this.loading = false;
        this.serverError = err?.error?.message ?? err?.message ?? 'Login failed. Please try again.';
        console.error('Login error', err);
      }
    });
  }
}
