import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { Router } from '@angular/router';
import { OrganizationMaster } from '../../../../models/organization.model';
import { OrganizationService } from '../../../../services/organization.service';
@Component({
  selector: 'app-org',
  imports: [SharedModule],
  templateUrl: './org.component.html',
  styleUrl: './org.component.scss',
})
export class OrgComponent implements OnInit {
  items: OrganizationMaster[] = [];
  constructor(private svc: OrganizationService, private router: Router) { }
  ngOnInit(): void { this.load(); }
  load() { this.svc.getAll().subscribe(data => this.items = data); }
  create() { this.router.navigate(['/addorganization']); }
  edit(id?: number) { if (id != null) this.router.navigate(['/editorganization', id, 'edit']); }
  delete(id?: number) { if (!confirm('Delete organization?') || id == null) return; this.svc.delete(id).subscribe(() => this.load()); }
}
