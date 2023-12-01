import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@ngneat/dialog';

@Component({
  selector: 'app-emp-add-edit',
  standalone: true,
  imports: [MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.css'
})
export class EmpAddEditComponent {

  empForm : FormGroup;

  constructor(private _fb: FormBuilder/*, private _empService: EmployeeService, private _dialog: DialogRef<EmpAddEditComponent>*/) { 
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      age: ''
    });
  }

  onFormSubmit() {
    if(this.empForm.valid) {
      console.log(this.empForm.value);
      // this._empService.addEmployee(this.empForm.value).subscribe({
      //   next: (val: any) => {
      //     alert('Employee added successfully');
      //     this._dialog.close();
      //   },
      //   error: (err: any) => {
      //     console.log(err);
      //   }
      // });
      
    }
  }
}
