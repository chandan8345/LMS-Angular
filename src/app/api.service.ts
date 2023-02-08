import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }

  apiUrl = 'https://localhost:44349/api/test';

  getAllEmployee(){
    return this._http.get(this.apiUrl);
  }

  getAllDesignation(){
    return this._http.get('https://localhost:44349/api/test/Designation');
  }

  createNewEmployee(data:any){
    return this._http.post('https://localhost:44349/api/test/employeeInsert', data);
  }

  updateEmployee(data:any,id:number){
    return this._http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteEmployee(id:number){
    return this._http.delete(`${this.apiUrl}/${id}`);
  }

  getEmployeeByID(id:number){
    return this._http.get(`${this.apiUrl}/${id}`);
  }

}
