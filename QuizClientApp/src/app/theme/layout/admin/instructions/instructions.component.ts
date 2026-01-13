import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
@Component({
  selector: 'app-instructions',
  imports: [SharedModule],
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.scss',
})
export class InstructionsComponent {
  constructor(private router: Router) { }

  create(): void {
    this.router.navigate(['app/creatinstruction']);
  }
  cancel() {
    this.router.navigate(['app/instructions']);
  }
}
