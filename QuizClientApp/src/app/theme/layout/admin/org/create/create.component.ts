import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';

// bootstrap import
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-create',
  imports: [SharedModule, NgbDropdownModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {

}
