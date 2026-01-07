import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubjectService } from '../../../../../services/subject.service';

@Component({
  selector: 'app-create',
  imports: [SharedModule, NgbDropdownModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent implements OnInit {
  form!: FormGroup;
  submitting = false;

  constructor(private fb: FormBuilder, private router: Router, private svc: SubjectService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      subId: [0],
      subName: ['', Validators.required],
      createdBy: ['Admin', Validators.required],
      createdOn: [new Date()],
      updatedBy: [''],
      updatedOn: [null],
      isActive: ['Y'],
      isDeleted: ['N']
    });
  }

  private toDateOnly(value: Date | string | null): string | null {
    if (!value) return null;
    const d = value instanceof Date ? value : new Date(value);
    if (isNaN(d.getTime())) return null;
    return d.toISOString().slice(0, 10); // "YYYY-MM-DD"
  }

  submit() {
    if (this.form.invalid) return;
    this.submitting = true;
    const v = this.form.value;

    const payload = {
      subId: v.subId,
      subName: v.subName,
      createdBy: v.createdBy ?? 'Admin',
      createdOn: this.toDateOnly(v.createdOn),
      updatedBy: v.updatedBy ?? '',
      updatedOn: this.toDateOnly(v.updatedOn),
      isActive: v.isActive ?? 'Y',
      isDeleted: v.isDeleted ?? 'N'
    };

    this.svc.create(payload).subscribe({
      next: () => this.router.navigate(['/subject']),
      error: (err) => {
        console.error('Create failed', err);
        // If the API returned validation errors, show them to the user
        const server = err?.error;
        if (server && server.errors) {
          // server.errors is usually an object like { "SubName": ["..."], "CreatedBy": ["..."] }
          const messages: string[] = [];
          for (const key of Object.keys(server.errors)) {
            const arr = server.errors[key];
            if (Array.isArray(arr)) {
              messages.push(...arr.map((m: any) => `${key}: ${m}`));
            } else {
              messages.push(`${key}: ${arr}`);
            }
          }
          alert('Create failed:\n' + messages.join('\n'));
        } else {
          alert('Create failed: ' + (server?.title ?? err.message));
        }
        this.submitting = false;
      }
    });
  }

  cancel() {
    this.router.navigate(['/subject']);
  }
}
