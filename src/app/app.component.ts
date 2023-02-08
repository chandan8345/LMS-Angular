import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = "Hello World";

  employee: any;
  employees: any;
  designation: any;
  addEmployee!: FormGroup;

  constructor(private apiservice: ApiService, private formBuilder: FormBuilder) {
    this.createEmployeeForm();
  }

  createEmployeeForm() {
    this.addEmployee = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      age: new FormControl('', [Validators.required, Validators.min(18), Validators.max(60)]),
      designation: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.getAllEmployee();
    this.getAllDesignation();
  }

  getAllEmployee() {
    this.apiservice.getAllEmployee().subscribe(
      (res) => {
        this.employees = res;
        this.employee = null;
      });
  }

  get name() {
    return this.addEmployee.get('name');
  }

  get email() {
    return this.addEmployee.get('email');
  }

  get design() {
    return this.addEmployee.get('designation');
  }

  get age() {
    return this.addEmployee.get('age');
  }

  getAllDesignation() {
    this.apiservice.getAllDesignation().subscribe(
      (res) => {
        this.designation = res;
      });
  }

  saveData() {
    if (this.employee?.[0]['name']) {
      this.apiservice.updateEmployee(this.addEmployee.value, this.employee?.[0]['id']).subscribe((res) => {
        this.getAllEmployee();
        this.addEmployee.reset();
        Swal.fire('Message', 'Data Updated Successfully!', 'success');
      });
    }
    else {
      this.apiservice.createNewEmployee(this.addEmployee.value).subscribe((res) => {
        this.addEmployee.reset();
        this.getAllEmployee();
        Swal.fire('Message', 'Data Saved Successfully!', 'success');
      });
    }
  }

  deleteData(id: number) {
    this.apiservice.deleteEmployee(id).subscribe((res) => {
      this.getAllEmployee();
      this.addEmployee.reset();
      Swal.fire('Message', 'Data Deleted Successfully!', 'success');
    });
  }

  setEmployee(id: number) {
    this.apiservice.getEmployeeByID(id).subscribe((res) => {
      this.employee = res;
      this.addEmployee = this.formBuilder.group({
        name: new FormControl(this.employee[0]['name'], Validators.required),
        email: new FormControl(this.employee[0]['email'], [Validators.required, Validators.email]),
        age: new FormControl(String(this.employee[0]['age']), [Validators.required, Validators.min(18), Validators.max(60)]),
        designation: new FormControl(String(this.employee[0]['designation']), Validators.required)
      });
    });
  }

}
