import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AdminRoutesModule} from './admin.routes';
import {AdminComponent} from './admin.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import { PopulateComponent } from './pages/populate/populate.component';
import {DataService} from './services/data.service';
import {DataTableModule} from 'angular-6-datatable';
import {ModalService} from './pages/common/modal.service';
import {CustomModalComponent} from './pages/common/custom-modal/custom-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AdminRoutesModule,
    NgxSpinnerModule,
    DataTableModule
  ],
  declarations: [
    AdminComponent,
    DashboardComponent,
    PopulateComponent,
    CustomModalComponent
  ],
  providers: [
    DataService,
    ModalService
  ]
})
export class AdminModule {
}
