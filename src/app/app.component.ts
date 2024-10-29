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

  addLead!: FormGroup;
  lead:any;
  leads:any;
  product:any;
  agent:any;

  constructor(private apiservice: ApiService, private formBuilder: FormBuilder) {
    this.createLeadFrom();
  }

  createLeadFrom() {
    this.addLead = this.formBuilder.group({
      FirstName: new FormControl('', Validators.required),
      LastName: new FormControl('', Validators.required),
      Email: new FormControl('', [Validators.required, Validators.email]),
      ProductId: new FormControl('', Validators.required),
      AssignedAgentId: new FormControl('', Validators.required),
      PhoneNumber: new FormControl('', Validators.required),
      Source: new FormControl('', Validators.required),
      Status: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
        this.getAllLeads();
        this.getAllProduct();
        this.getAllAgent();
  }

  getAllLeads() {
    this.apiservice.getAllLeads().subscribe(
      (res) => {
        console.log(res);
        this.leads = res;
        this.lead = null;
      });
  }

  saveData() {
    if (this.lead?.[0]['FirstName']) {
      this.apiservice.updateLead(this.addLead.value, this.lead?.[0]['LeadId']).subscribe((res) => {
        this.getAllLeads();
        this.addLead.reset();
        Swal.fire('Message', 'Data Updated Successfully!', 'success');
      });
    }
    else {
      this.apiservice.createLead(this.addLead.value).subscribe((res) => {
        this.addLead.reset();
        this.getAllLeads();
        Swal.fire('Message', 'Data Saved Successfully!', 'success');
      });
    }
  }

  editAssignment(id: number) {
    this.apiservice.getLeadsByID(id).subscribe((res) => {
      this.lead = res;
      this.addLead = this.formBuilder.group({
        FirstName: new FormControl(this.lead[0]['FirstName'], Validators.required),
        LastName: new FormControl(this.lead[0]['LastName'], [Validators.required, Validators.email]),
        Email: new FormControl(String(this.lead[0]['Email']), [Validators.required, Validators.min(18), Validators.max(60)]),
        ProductId: new FormControl(String(this.lead[0]['ProductId']), Validators.required),
        AssignedAgentId: new FormControl(this.lead[0]['AssignedAgentId'], Validators.required),
        PhoneNumber: new FormControl(this.lead[0]['PhoneNumber'], [Validators.required, Validators.email]),
        Source: new FormControl(String(this.lead[0]['Source']), [Validators.required, Validators.min(18), Validators.max(60)]),
        Status: new FormControl(String(this.lead[0]['Status']), Validators.required)
      });
    });
  }

  deleteAssignment(id: number) {
    this.apiservice.deleteEmployee(id).subscribe((res) => {
      this.getAllLeads();
      this.addLead.reset();
      Swal.fire('Message', 'Data Deleted Successfully!', 'success');
    });
  }

  get FirstName() {
    return this.addLead.get('FirstName');
  }

  get LastName() {
    return this.addLead.get('LastName');
  }

  get Email() {
    return this.addLead.get('Email');
  }

  get PhoneNumber() {
    return this.addLead.get('PhoneNumber');
  }

  get Source() {
    return this.addLead.get('Source');
  }

  get Status() {
    return this.addLead.get('Status');
  }

  get ProductId() {
    return this.addLead.get('ProductId');
  }

  get AssignedAgentId() {
    return this.addLead.get('AssignedAgentId');
  }

  getAllProduct() {
    this.apiservice.getAllProduct().subscribe(
      (res) => {
        this.product = res;
      });
  }

  getAllAgent() {
    this.apiservice.getAllAgent().subscribe(
      (res) => {
        this.agent = res;
      });
  }

  // getAllEmployee() {
  //   this.apiservice.getAllEmployee().subscribe(
  //     (res) => {
  //       this.employees = res;
  //       this.employee = null;
  //     });
  // }

  // get name() {
  //   return this.addEmployee.get('name');
  // }

  // get email() {
  //   return this.addEmployee.get('email');
  // }

  // get design() {
  //   return this.addEmployee.get('designation');
  // }

  // get age() {
  //   return this.addEmployee.get('age');
  // }

  // getAllDesignation() {
  //   this.apiservice.getAllDesignation().subscribe(
  //     (res) => {
  //       this.designation = res;
  //     });
  // }

  // saveData() {
  //   if (this.employee?.[0]['name']) {
  //     this.apiservice.updateEmployee(this.addEmployee.value, this.employee?.[0]['id']).subscribe((res) => {
  //       this.getAllEmployee();
  //       this.addEmployee.reset();
  //       Swal.fire('Message', 'Data Updated Successfully!', 'success');
  //     });
  //   }
  //   else {
  //     this.apiservice.createNewEmployee(this.addEmployee.value).subscribe((res) => {
  //       this.addEmployee.reset();
  //       this.getAllEmployee();
  //       Swal.fire('Message', 'Data Saved Successfully!', 'success');
  //     });
  //   }
  // }

  // deleteData(id: number) {
  //   this.apiservice.deleteEmployee(id).subscribe((res) => {
  //     this.getAllEmployee();
  //     this.addEmployee.reset();
  //     Swal.fire('Message', 'Data Deleted Successfully!', 'success');
  //   });
  // }

  // setEmployee(id: number) {
  //   this.apiservice.getEmployeeByID(id).subscribe((res) => {
  //     this.employee = res;
  //     this.addEmployee = this.formBuilder.group({
  //       name: new FormControl(this.employee[0]['name'], Validators.required),
  //       email: new FormControl(this.employee[0]['email'], [Validators.required, Validators.email]),
  //       age: new FormControl(String(this.employee[0]['age']), [Validators.required, Validators.min(18), Validators.max(60)]),
  //       designation: new FormControl(String(this.employee[0]['designation']), Validators.required)
  //     });
  //   });
  // }

}