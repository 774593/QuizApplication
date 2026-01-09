// Angular Import
import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
// project import
import { SpinnerComponent } from './theme/shared/components/spinner/spinner.component';

@Component({
  selector: 'app-root',
  /*standalone: true,*/
  imports: [RouterOutlet, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent  {
  private router = inject(Router);

  // life cycle event
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
