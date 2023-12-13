import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog} from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
// import {MatTableModule} from '@angular/material/table';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'frontend';


  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'age', 'action'];
  dataSource!: MatTableDataSource<any>;
  // constructor(private _dialog: MatDialog/*, private _empService: EmployeeService*/) {}
  constructor(private _http: HttpClient, private _dialog: MatDialog) {}

  // ngOnInit(): void {
  //   this.getEmployee();
  // }

  ngOnInit(): void {
    this._http.get<any[]>('http://localhost:3000/employees').subscribe(
      (res) => {
        console.log('res', res);
        this.dataSource = new MatTableDataSource(res);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }


  openAddEditForm() {
    this._dialog.open(EmpAddEditComponent);
  }

  // getEmployee() {
  //   this._empService.getEmployee().subscribe({
  //     next: (res) => {
  //       console.log(res);
  //     },
  //     error: console.log,
  //   });
  // }

  deleteEmployee(id: number) {
    this._http.delete(`http://localhost:3000/employees/${id}`).subscribe({
      next: (res) => {
        console.log(res);
        location.reload();
      },
      error: console.log,
    });
  }

  // editEmployee(id: number) {
  //   const dialogRef = this._dialog.open(EmpAddEditComponent, {
  //     data: { id },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(`Dialog result: ${result}`);
  //     location.reload();
  //   });
  // }

  openEditDialog(data: any) {
    this._dialog.open(EmpAddEditComponent, {
      data,
    });
  }
}
