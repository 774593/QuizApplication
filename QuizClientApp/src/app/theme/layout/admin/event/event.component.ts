import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
@Component({
  selector: 'app-event',
  imports: [SharedModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
})
export class EventComponent {
  constructor(private router: Router) { }

  create(): void {
    this.router.navigate(['app/createevent']);
  }
  cancel() {
    this.router.navigate(['app/event']);
  }
}
