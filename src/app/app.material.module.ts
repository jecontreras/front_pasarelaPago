import {
  MatSliderModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatDialogModule,
  MatListModule,
  MatButtonModule,
  MatPaginatorModule,
  MatChipsModule,
  MatIconModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatSelectModule,
  MatTabsModule,
  MatInputModule
} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MatSliderModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatDialogModule,
    MatListModule,
    MatButtonModule,
    MatPaginatorModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule
  ],
  exports: [
    MatSliderModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatDialogModule,
    MatListModule,
    MatButtonModule,
    MatPaginatorModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule
  ],
})
export class MyOwnCustomMaterialModule { }
