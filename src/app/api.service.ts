import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }

  apiUrl = '//chandan.runasp.net/api/Lead';

  getAllLeads(){
    return this._http.get(`${this.apiUrl}`);
  }

  createLead(data:any){
    console.log(data);
    return this._http.post(`${this.apiUrl}`, data);
  }

  updateLead(data:any,LeadId:number){
    return this._http.put(`${this.apiUrl}/${LeadId}`, data);
  }

  getLeadsByID(LeadId:number){
    return this._http.get(`${this.apiUrl}/${LeadId}`);
  }

  deleteEmployee(LeadId:number){
    return this._http.delete(`${this.apiUrl}/${LeadId}`);
  }

  getAllProduct(){
    var productUrl='//chandan.runasp.net/api/Product';
    return this._http.get(`${productUrl}`);
  }

  getAllAgent(){
    var agentUrl='//chandan.runasp.net/api/Agent';
    return this._http.get(`${agentUrl}`);
  }

  // createNewEmployee(data:any){
  //   return this._http.post('https://localhost:44349/api/test/employeeInsert', data);
  // }

  // updateEmployee(data:any,id:number){
  //   return this._http.put(`${this.apiUrl}/${id}`, data);
  // }

  // deleteEmployee(id:number){
  //   return this._http.delete(`${this.apiUrl}/${id}`);
  // }

  // getEmployeeByID(id:number){
  //   return this._http.get(`${this.apiUrl}/${id}`);
  // }

}
