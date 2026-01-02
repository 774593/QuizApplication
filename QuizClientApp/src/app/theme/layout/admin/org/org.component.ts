import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { Router } from '@angular/router';
@Component({
  selector: 'app-org',
  imports: [SharedModule],
  templateUrl: './org.component.html',
  styleUrl: './org.component.scss',
})
export class OrgComponent {
  constructor(private router: Router) { }
  goToAbout() {
    this.router.navigate(['/addorganization']);
  }
}
