import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }

  apiUrl = 'http://chandan.runasp.net/api/Lead';

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
    var productUrl='http://chandan.runasp.net/api/Product';
    return this._http.get(`${productUrl}`);
  }

  getAllAgent(){
    var agentUrl='http://chandan.runasp.net/api/Agent';
    return this._http.get(`${agentUrl}`);
  }

}
