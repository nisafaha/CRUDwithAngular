import { Component, Inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// import { EmployeeService } from '../services/employee.service';
// import { DialogRef } from '@ngneat/dialog';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-emp-add-edit',
  standalone: true,
  imports: [MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.css'
})
export class EmpAddEditComponent implements OnInit{

  empForm : FormGroup;

  constructor(private _fb: FormBuilder, private _http: HttpClient/*, private _empService: EmployeeService, private _dialog: DialogRef<EmpAddEditComponent>*/, @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      age: ''
    });
  }

  // onFormSubmit() {
  //   if(this.empForm.valid) {
  //     console.log(this.empForm.value);
  //     // this._empService.addEmployee(this.empForm.value).subscribe({
  //     //   next: (val: any) => {
  //     //     alert('Employee added successfully');
  //     //     // this._dialog.close();

  //     //   },
  //     //   error: (err: any) => {
  //     //     console.log(err);
  //     //   }
  //     // });
      
  //     this._http.post<any[]>('http://localhost:3000/employees').subscribe(
  //       next: (val: any) => {
  //       alert('Employee added successfully');
  //       // this._dialog.close();

  //       },
  //       error: (err: any) => {
  //         console.log(err);
  //       }
  //     );
  //   }
  // }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      console.log(this.empForm.value);
  
      if(this.data) {
        // Assuming this.empForm.value contains the data you want to send
        this._http.put(`http://localhost:3000/employees/${this.data.id}`, this.empForm.value).subscribe({
          next: (val: any) => {
            // alert('Employee updated successfully');
            // this._dialog.close();
            console.log("success!");
            location.reload();
          },
          error: (err: any) => {
            console.log(err);
          }
        });
        
      } else {
        // Assuming this.empForm.value contains the data you want to send
        this._http.post('http://localhost:3000/employees', this.empForm.value).subscribe({
          next: (val: any) => {
            // alert('Employee added successfully');
            // this._dialog.close();
            console.log("success!");
            location.reload();
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      }
      
    }
  }
  

  onCancel() {
    // Reload the current page
    location.reload();
  }
  
}
