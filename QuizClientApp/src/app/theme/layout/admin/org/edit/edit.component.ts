import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';

// bootstrap import
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from '../../../../../services/organization.service';
import { OrganizationMaster } from '../../../../../models/organization.model';

@Component({
  selector: 'app-edit',
  imports: [SharedModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent implements OnInit {
  items: OrganizationMaster[] = [];
  loading = false;
  error = '';

  constructor(private svc: OrganizationService, private router: Router) { }
    ngOnInit(): void {
        throw new Error('Method not implemented.');
  }
  back(): void {
    // route defined as 'addorganization' in your routing — navigate there
    this.router.navigate(['app/organization']);
  }
//  load(): void {
//    this.loading = true;
//    this.error = '';
//    this.svc.getById(organizationId).subscribe({
//      next: data => { this.items = data; this.loading = false; },
//      error: err => { this.error = err?.message || 'Failed to load organizations'; this.loading = false; }
//    });
//  }
}
