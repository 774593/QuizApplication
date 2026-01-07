// angular import
import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { email, Field, form, minLength, required } from '@angular/forms/signals';
import { Router } from '@angular/router';
// project import
import { SharedModule } from '../../../../theme/shared/shared.module';
import { UserService } from '../../../../services/user.service';  
@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, RouterModule, SharedModule, Field],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  private cd = inject(ChangeDetectorRef);
  userName = '';
  password = '';

  constructor(private router: Router, private userService: UserService) { }
  login() {
    this.userService.login(this.userName, this.password).subscribe({
      next: user => {
        //console.log('logged in', user);
        this.router.navigateByUrl('/analytics', { replaceUrl: true });
      },
      error: err => {
        console.error('login error', err);
      }
    });
  }



  //goToDash() {
  //  this.router.navigate(['/analytics']);
  //}
  
  submitted = signal(false);
  error = signal('');
  showPassword = signal(false);

  loginModal = signal<{ email: string; password: string }>({
    email: '',
    password: ''
  });

  loginForm = form(this.loginModal, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Enter a valid email address' });
    required(schemaPath.password, { message: 'Password is required' });
    minLength(schemaPath.password, 8, { message: 'Password must be at least 8 characters' });
  });

  onSubmit(event: Event) {
    this.submitted.set(true);
    this.error.set('');
    event.preventDefault();
    const credentials = this.loginModal();
    this.router.navigate(['/analytics']);
   // console.log('login user logged in with:', credentials);
    this.cd.detectChanges();
  }

  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }
}
