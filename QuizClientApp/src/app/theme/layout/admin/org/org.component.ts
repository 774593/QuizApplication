import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { Router } from '@angular/router';
import { OrganizationMaster } from '../../../../models/organization.model';
import { OrganizationService } from '../../../../services/organization.service';


import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-org',
  imports: [SharedModule],
  templateUrl: './org.component.html',
  styleUrl: './org.component.scss',
})
export class OrgComponent implements OnInit {
  items: OrganizationMaster[] = [];
  loading = false;
  error = '';

  constructor(private svc: OrganizationService, private router: Router) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';
    this.svc.getAll().subscribe({
      next: data => { this.items = data; this.loading = false; },
      error: err => { this.error = err?.message || 'Failed to load organizations'; this.loading = false; }
    });
  }

  create(): void {
    // route defined as 'addorganization' in your routing — navigate there
    this.router.navigate(['app/addorganization']);
  }

  edit(id?: number): void {
    if (id == null) return;
    this.router.navigate(['app/addorganization'], { queryParams: { id } });
  }

  delete(id?: number): void {
    if (id == null) return;
    if (!confirm('Delete organization?')) return;
    this.svc.delete(id).subscribe({
      next: () => this.load(),
      error: () => alert('Delete failed')
    });
  }
}
