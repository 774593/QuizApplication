import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SubjectService } from '../../../../services/subject.service';
import { SubjectMaster } from '../../../../models/subject.model';
@Component({
  selector: 'app-subject',
  imports: [SharedModule, NgbDropdownModule],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss',
})
export class SubjectComponent implements OnInit {
  items: SubjectMaster[] = [];
  loading = false;
  error = '';

  constructor(private svc: SubjectService, private router: Router) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';
    this.svc.getAll().subscribe({
      next: data => { this.items = data; this.loading = false; },
      error: err => { this.error = err?.message || 'Failed to load subjects'; this.loading = false; }
    });
  }

  create(): void {
    this.router.navigate(['app/createsubject']);
  }

  edit(id?: number): void {
    if (id == null) return;
    this.router.navigate(['app/createsubject'], { queryParams: { id } });
  }

  delete(id?: number): void {
    if (id == null) return;
    if (!confirm('Delete subject?')) return;
    this.svc.delete(id).subscribe({
      next: () => this.load(),
      error: () => alert('Delete failed')
    });
  }
}



