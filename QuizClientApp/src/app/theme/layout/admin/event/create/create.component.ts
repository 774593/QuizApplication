import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
@Component({
  selector: 'app-create',
  imports: [SharedModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  constructor(private router: Router) { }
  cancel() {
    this.router.navigate(['app/event']);
  }
}
