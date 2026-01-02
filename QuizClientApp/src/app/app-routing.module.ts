

// Angular Import
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project import
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { CreateComponent } from './theme/layout/admin/org/create/create.component';




const routes: Routes = [
  {
    path: '',
    component: AdminComponent, 
    children: [
      {
        path: '',
        redirectTo: '/analytics',
        pathMatch: 'full'
      },
      {
        path: 'organization',
        loadComponent: () => import('./theme/layout/admin/org/org.component').then((c) => c.OrgComponent)
      },
      {
        path: 'subject',
        loadComponent: () => import('./theme/layout/admin/subject/subject.component').then((c) => c.SubjectComponent)
      },
      {
        path: 'createsubject',
        loadComponent: () => import('./theme/layout/admin/subject/create/create.component').then((c) => c.CreateComponent)
      },
      {
        path: 'editsubject',
        loadComponent: () => import('./theme/layout/admin/subject/edit/edit.component').then((c) => c.EditComponent)
      },
      {
        path: 'subjectexpert',
        loadComponent: () => import('./theme/layout/admin/subject-expert/subject-expert.component').then((c) => c.SubjectExpertComponent)
      },
      {
        path: 'createsubjectexpert',
        loadComponent: () => import('./theme/layout/admin/subject-expert/create/create.component').then((c) => c.CreateComponent)
      },
      {
        path: 'editsubjectexpert',
        loadComponent: () => import('./theme/layout/admin/subject-expert/edit/edit.component').then((c) => c.EditComponent)
      },
      {
        path: 'event',
        loadComponent: () => import('./theme/layout/admin/event/event.component').then((c) => c.EventComponent)
      },
      {
        path: 'createevent',
        loadComponent: () => import('./theme/layout/admin/event/create/create.component').then((c) => c.CreateComponent)
      },
      {
        path: 'editevent',
        loadComponent: () => import('./theme/layout/admin/event/edit/edit.component').then((c) => c.EditComponent)
      },

      {
        path: 'instructions',
        loadComponent: () => import('./theme/layout/admin/instructions/instructions.component').then((c) => c.InstructionsComponent)
      },
      {
        path: 'creatinstruction',
        loadComponent: () => import('./theme/layout/admin/instructions/create/create.component').then((c) => c.CreateComponent)
      },
      {
        path: 'editinstruction',
        loadComponent: () => import('./theme/layout/admin/instructions/edit/edit.component').then((c) => c.EditComponent)
      },
      {
        path: 'scheduling',
        loadComponent: () => import('./theme/layout/admin/scheduling/scheduling.component').then((c) => c.SchedulingComponent)
      },
      {
        path: 'creatscheduling',
        loadComponent: () => import('./theme/layout/admin/scheduling/create/create.component').then((c) => c.CreateComponent)
      },
      {
        path: 'editscheduling',
        loadComponent: () => import('./theme/layout/admin/scheduling/edit/edit.component').then((c) => c.EditComponent)
      },


      {
        path: 'addorganization',
        loadComponent: () => import('./theme/layout/admin/org/create/create.component').then((c) => c.CreateComponent)
      },
      {
        path: 'editorganization',
        loadComponent: () => import('./theme/layout/admin/org/edit/edit.component').then((c) => c.EditComponent)
      },
      {
        path: 'analytics',
        loadComponent: () => import('./demo/dashboard/dash-analytics.component').then((c) => c.DashAnalyticsComponent)
      },
      {
        path: 'component',
        loadChildren: () => import('./demo/ui-element/ui-basic.module').then((m) => m.UiBasicModule)
      },
      {
        path: 'chart',
        loadComponent: () => import('./demo/chart-maps/core-apex.component').then((c) => c.CoreApexComponent)
      },
      {
        path: 'forms',
        loadComponent: () => import('./demo/forms/form-elements/form-elements.component').then((c) => c.FormElementsComponent)
      },
      {
        path: 'tables',
        loadComponent: () => import('./demo/tables/tbl-bootstrap/tbl-bootstrap.component').then((c) => c.TblBootstrapComponent)
      },
     
       {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component').then((c) => c.SamplePageComponent)
      }
    ]
  },
  {
    path: 'addorganization',
    component: CreateComponent
},

  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'register',
        loadComponent: () => import('./demo/pages/authentication/sign-up/sign-up.component').then((c) => c.SignUpComponent)
      },
      {
        path: 'login',
        loadComponent: () => import('./demo/pages/authentication/sign-in/sign-in.component').then((c) => c.SignInComponent)
      }
    ]
  }
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
