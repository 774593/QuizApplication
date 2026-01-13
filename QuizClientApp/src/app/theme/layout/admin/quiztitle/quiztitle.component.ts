import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
@Component({
  selector: 'app-quiztitle',
  imports: [SharedModule],
  templateUrl: './quiztitle.component.html',
  styleUrl: './quiztitle.component.scss',
})
export class QuiztitleComponent {
  constructor(private router: Router) { }

  create(): void {
    this.router.navigate(['app/createtitle']);
  }
}
