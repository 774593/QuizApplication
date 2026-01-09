import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { SubExpert } from '../../../../models/sub-expert.model';
import { SubjectExpertService } from '../../../../services/subject-expert.service';


import { Router } from '@angular/router';



import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-subject-expert',
  imports: [SharedModule],
  templateUrl: './subject-expert.component.html',
  styleUrl: './subject-expert.component.scss',
})
export class SubjectExpertComponent implements OnInit {
  experts: SubExpert[] = [];
  loading = false;

  constructor(private svc: SubjectExpertService, private router: Router) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.svc.getAll().subscribe({ next: data => { this.experts = data; this.loading = false; }, error: () => this.loading = false });
  }

  create() { this.router.navigate(['app/createsubjectexpert']); }
  edit(regNo: string) { this.router.navigate(['/experts', regNo, 'edit']); }
  delete(regNo: string) {
    if (!confirm('Delete expert?')) return;
    this.svc.delete(regNo).subscribe({ next: () => this.load(), error: () => alert('Delete failed') });
  }
}

