import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubjectExpertService } from '../../../../../services/subject-expert.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-create',
  imports: [SharedModule, NgbDropdownModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent implements OnInit {
  form!: FormGroup;
  submitting = false;

  constructor(private fb: FormBuilder, private router: Router, private svc: SubjectExpertService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      regNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', Validators.required],
      subExperties: [''],
      regDate: [null],

      firstName: ['', Validators.required],

      lastName: ['', Validators.required],

      address: ['', Validators.required],

      contactNo: ['', Validators.required],

      profilePic:[null],
 
      createdBy: ['Admin', Validators.required],
      createdOn: [new Date()],
      updatedBy: [''],
      updatedOn: [null],
      isActive: ['Y'],
      isDeleted: ['N']
      // add other fields if your model requires them
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.submitting = true;
    const payload = this.form.value;
    this.svc.create(payload).subscribe({
      next: () => this.router.navigate(['/subjectexpert']),
      error: (err) => {
        console.error('Create expert failed', err);
        // display server validation errors if present
        const server = err?.error;
        if (server?.errors) {
          const messages: string[] = [];
          for (const k of Object.keys(server.errors)) {
            const arr = server.errors[k];
            if (Array.isArray(arr)) messages.push(...arr.map((m: any) => `${k}: ${m}`));
            else messages.push(`${k}: ${arr}`);
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
    this.router.navigate(['app/subjectexpert']);
  }

  back() {
    this.router.navigate(['app/subjectexpert']);
  }
}
