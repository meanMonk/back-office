import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {PopulateComponent} from './pages/populate/populate.component';

const ADMIN_ROUTES: Routes = [
  {
    path: 'app',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'populate',
        component: PopulateComponent
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
  }
];

export const AdminRoutesModule: ModuleWithProviders = RouterModule.forChild(ADMIN_ROUTES);
