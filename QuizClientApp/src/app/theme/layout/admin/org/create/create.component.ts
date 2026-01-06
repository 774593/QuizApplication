import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';

// bootstrap import
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from '../../../../../services/organization.service';
@Component({
  selector: 'app-create',
  imports: [SharedModule, NgbDropdownModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent implements OnInit {
  form!: FormGroup;
  editing = false;
  idParam: string | null = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private svc: OrganizationService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      organizationId: [null],
      regNo: [''],
      orgName: ['', Validators.required],
      city: ['']
    });

    this.idParam = this.route.snapshot.paramMap.get('id');
    if (this.idParam) {
      this.editing = true;
      this.svc.getById(Number(this.idParam)).subscribe(data => this.form.patchValue(data));
    }
  }

  submit() {
    if (this.form.invalid) return;
    const value = this.form.value;
    if (this.editing && this.idParam) {
      this.svc.update(Number(this.idParam), value).subscribe(() => this.router.navigate(['/organizations']));
    } else {
      this.svc.create(value).subscribe(() => this.router.navigate(['/organizations']));
    }
  }
}
