
import { Component } from '@angular/core';

// project import
import { SharedModule } from '../../../shared/shared.module';
// project import

@Component({
  selector: 'app-organization',
 imports: [SharedModule],
  templateUrl: './organization.html',
  styleUrl: './organization.scss',
})
export class Organization {}
