import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SubjectExpertService } from '../../../../../services/subject-expert.service';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-edit',
  imports: [SharedModule, NgbDropdownModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent implements OnInit {
  form!: FormGroup;
  regNoParam: string | null = null;
  submitting = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private svc: SubjectExpertService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      regNo: [{ value: '', disabled: true }, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pwd: [''],
      subExperties: [''],
      // include other fields if needed
    });

    // accept route param or query param (both supported)
    this.regNoParam = this.route.snapshot.paramMap.get('regNo') || this.route.snapshot.queryParamMap.get('regNo');
    if (this.regNoParam) {
      this.svc.getByRegNo(this.regNoParam).subscribe(data => {
        // patchValue; ensure regNo shows even though control disabled
        this.form.patchValue({
          regNo: data.regNo,
          email: data.email,
          pwd: '', // don't preload password
          subExperties: data.subExperties
        });
      }, err => {
        console.error('Failed to load expert', err);
        alert('Failed to load expert');
        this.router.navigate(['/subjectexpert']);
      });
    } else {
      // nothing to edit
      this.router.navigate(['/subjectexpert']);
    }
  }

  submit() {
    if (this.form.invalid || !this.regNoParam) return;
    this.submitting = true;

    // build payload - include regNo (disabled control not included in value)
    const payload = {
      regNo: this.regNoParam,
      email: this.form.get('email')!.value,
      pwd: this.form.get('pwd')!.value,
      subExperties: this.form.get('subExperties')!.value
    };

    this.svc.update(this.regNoParam, payload).subscribe({
      next: () => this.router.navigate(['/subjectexpert']),
      error: (err) => {
        console.error('Update failed', err);
        alert('Update failed');
        this.submitting = false;
      }
    });
  }

  cancel() {
    this.router.navigate(['/subjectexpert']);
  }
}
